// Data encryption utilities for securing sensitive information
export interface EncryptionConfig {
  algorithm: 'AES-256-GCM' | 'AES-256-CBC';
  keyLength: number;
  ivLength: number;
  saltLength: number;
}

export interface EncryptedData {
  data: string;
  iv: string;
  salt: string;
  algorithm: string;
  version: string;
}

class DataEncryption {
  private config: EncryptionConfig = {
    algorithm: 'AES-256-GCM',
    keyLength: 32,
    ivLength: 16,
    saltLength: 32,
  };

  private readonly VERSION = '1.0';

  constructor() {
    this.initializeEncryption();
  }

  private async initializeEncryption(): Promise<void> {
    // Check if Web Crypto API is available
    if (!window.crypto || !window.crypto.subtle) {
      console.error('Web Crypto API not available. Encryption disabled.');
      return;
    }

    // Generate a master key for the session
    await this.generateSessionKey();
  }

  private async generateSessionKey(): Promise<void> {
    try {
      const key = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      );

      // Store the key in memory (in production, this would be more secure)
      (window as any).sessionEncryptionKey = key;
    } catch (error) {
      console.error('Failed to generate session key:', error);
    }
  }

  public async encryptText(text: string, password?: string): Promise<EncryptedData> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      // Generate salt and IV
      const salt = window.crypto.getRandomValues(new Uint8Array(this.config.saltLength));
      const iv = window.crypto.getRandomValues(new Uint8Array(this.config.ivLength));

      // Derive key from password or use session key
      let key: CryptoKey;
      if (password) {
        key = await this.deriveKeyFromPassword(password, salt);
      } else {
        key = (window as any).sessionEncryptionKey;
        if (!key) {
          throw new Error('No encryption key available');
        }
      }

      // Encrypt the data
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        key,
        data
      );

      // Convert to base64 strings
      const encryptedData = this.arrayBufferToBase64(encryptedBuffer);
      const ivString = this.arrayBufferToBase64(iv);
      const saltString = this.arrayBufferToBase64(salt);

      return {
        data: encryptedData,
        iv: ivString,
        salt: saltString,
        algorithm: this.config.algorithm,
        version: this.VERSION,
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  public async decryptText(encryptedData: EncryptedData, password?: string): Promise<string> {
    try {
      // Convert base64 strings back to ArrayBuffers
      const data = this.base64ToArrayBuffer(encryptedData.data);
      const iv = this.base64ToArrayBuffer(encryptedData.iv);
      const salt = this.base64ToArrayBuffer(encryptedData.salt);

      // Derive key from password or use session key
      let key: CryptoKey;
      if (password) {
        key = await this.deriveKeyFromPassword(password, new Uint8Array(salt));
      } else {
        key = (window as any).sessionEncryptionKey;
        if (!key) {
          throw new Error('No decryption key available');
        }
      }

      // Decrypt the data
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: new Uint8Array(iv),
        },
        key,
        data
      );

      // Convert back to string
      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  private async deriveKeyFromPassword(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    // Import password as key material
    const passwordKey = await window.crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    // Derive key using PBKDF2
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      passwordKey,
      {
        name: 'AES-GCM',
        length: 256,
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  public async encryptObject(obj: Record<string, unknown>, password?: string): Promise<EncryptedData> {
    const jsonString = JSON.stringify(obj);
    return this.encryptText(jsonString, password);
  }

  public async decryptObject(encryptedData: EncryptedData, password?: string): Promise<Record<string, unknown>> {
    const jsonString = await this.decryptText(encryptedData, password);
    return JSON.parse(jsonString);
  }

  public async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return this.arrayBufferToBase64(hashBuffer);
  }

  public async generateSecureToken(): Promise<string> {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return this.arrayBufferToBase64(array);
  }

  public async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password);
    return passwordHash === hash;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Cultural content encryption with special handling
  public async encryptCulturalContent(content: string, culturalLevel: 'public' | 'restricted' | 'sacred'): Promise<EncryptedData> {
    // Add cultural metadata to the content
    const culturalData = {
      content,
      culturalLevel,
      timestamp: Date.now(),
      culturalValidation: true,
    };

    return this.encryptObject(culturalData);
  }

  public async decryptCulturalContent(encryptedData: EncryptedData): Promise<{ content: string; culturalLevel: string; timestamp: number }> {
    const decrypted = await this.decryptObject(encryptedData) as {
      content: string;
      culturalLevel: string;
      timestamp: number;
      culturalValidation: boolean;
    };

    if (!decrypted.culturalValidation) {
      throw new Error('Cultural content validation failed');
    }

    return {
      content: decrypted.content,
      culturalLevel: decrypted.culturalLevel,
      timestamp: decrypted.timestamp,
    };
  }

  // Secure storage utilities
  public async secureStore(key: string, value: string): Promise<void> {
    const encrypted = await this.encryptText(value);
    localStorage.setItem(key, JSON.stringify(encrypted));
  }

  public async secureRetrieve(key: string): Promise<string | null> {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;

    try {
      const encrypted = JSON.parse(encryptedData) as EncryptedData;
      return await this.decryptText(encrypted);
    } catch (error) {
      console.error('Failed to retrieve secure data:', error);
      return null;
    }
  }

  public async secureRemove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  // Generate encryption status report
  public getEncryptionStatus(): string {
    const hasCryptoAPI = !!(window.crypto && window.crypto.subtle);
    const hasSessionKey = !!(window as any).sessionEncryptionKey;
    
    return `
🔐 ENCRYPTION STATUS
==================
Web Crypto API: ${hasCryptoAPI ? '✅ Available' : '❌ Not Available'}
Session Key: ${hasSessionKey ? '✅ Generated' : '❌ Not Generated'}
Algorithm: ${this.config.algorithm}
Key Length: ${this.config.keyLength * 8} bits
Version: ${this.VERSION}
    `.trim();
  }
}

// Singleton instance
export const dataEncryption = new DataEncryption();

// Export for use in components
export default dataEncryption;
