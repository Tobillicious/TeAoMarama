
// Secure API Middleware - Te Kura o TeAoMarama
// Enhanced with DeepSeek AI security intelligence

import { supabase } from '../supabaseClient';
import type { User } from '@supabase/supabase-js';

interface SecurityContext {
  user: User | null;
  culturalClearance: 'none' | 'basic' | 'approved' | 'kaitiaki';
  educatorStatus: boolean;
  rateLimitRemaining: number;
  requestId: string;
}

interface CulturalResource {
  sensitivity: 'low' | 'medium' | 'high' | 'sacred';
  iwi_permission_required: boolean;
  cultural_protocols: string[];
}

class SecureAPIMiddleware {
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  private culturalValidators = new Map();

  async authenticateRequest(request: Request): Promise<SecurityContext> {
    const authHeader = request.headers.get('Authorization');
    const userAgent = request.headers.get('User-Agent') || 'unknown';
    const clientIP = this.getClientIP(request);
    
    let user = null;
    let culturalClearance: SecurityContext['culturalClearance'] = 'none';
    let educatorStatus = false;

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user: authUser }, error } = await supabase.auth.getUser(token);
      
      if (authUser && !error) {
        user = authUser;
        
        // Check cultural clearance level
        culturalClearance = await this.getCulturalClearance(user);
        
        // Check educator status
        educatorStatus = await this.isEducator(user);
        
        // Log authentication success
        await this.logSecurityEvent('AUTH_SUCCESS', user.id, clientIP, userAgent);
      } else {
        await this.logSecurityEvent('AUTH_FAILURE', null, clientIP, userAgent);
      }
    }

    // Check rate limits
    const rateLimitRemaining = this.checkRateLimit(clientIP, user?.id);

    return {
      user,
      culturalClearance,
      educatorStatus,
      rateLimitRemaining,
      requestId: this.generateRequestId()
    };
  }

  async validateCulturalAccess(
    resource: CulturalResource, 
    context: SecurityContext
  ): Promise<boolean> {
    // High sensitivity cultural content requires special permissions
    if (resource.sensitivity === 'high' || resource.sensitivity === 'sacred') {
      if (context.culturalClearance !== 'approved' && context.culturalClearance !== 'kaitiaki') {
        await this.logSecurityEvent('CULTURAL_ACCESS_DENIED', context.user?.id, '', '');
        return false;
      }
    }

    // Sacred content requires kaitiaki status
    if (resource.sensitivity === 'sacred' && context.culturalClearance !== 'kaitiaki') {
      await this.logSecurityEvent('SACRED_CONTENT_ACCESS_DENIED', context.user?.id, '', '');
      return false;
    }

    // IWI permission required content
    if (resource.iwi_permission_required) {
      const hasIwiPermission = await this.checkIwiPermission(context.user, resource);
      if (!hasIwiPermission) {
        await this.logSecurityEvent('IWI_PERMISSION_REQUIRED', context.user?.id, '', '');
        return false;
      }
    }

    return true;
  }

  private async getCulturalClearance(user: User): Promise<SecurityContext['culturalClearance']> {
    const { data } = await supabase
      .from('user_profiles')
      .select('cultural_clearance, cultural_roles')
      .eq('user_id', user.id)
      .single();

    if (data?.cultural_roles?.includes('kaitiaki')) return 'kaitiaki';
    if (data?.cultural_clearance === 'approved') return 'approved';
    if (data?.cultural_clearance === 'basic') return 'basic';
    return 'none';
  }

  private async isEducator(user: User): Promise<boolean> {
    const { data } = await supabase
      .from('user_profiles')
      .select('role, educator_status')
      .eq('user_id', user.id)
      .single();

    return data?.role === 'educator' || data?.educator_status === true;
  }

  private checkRateLimit(clientIP: string, userId?: string): number {
    const key = userId || clientIP;
    const now = Date.now();
    const limit = userId ? 1000 : 100; // Higher limit for authenticated users
    const windowMs = 60 * 60 * 1000; // 1 hour window

    const rateLimitData = this.rateLimitMap.get(key);
    
    if (!rateLimitData || now > rateLimitData.resetTime) {
      this.rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return limit - 1;
    }

    if (rateLimitData.count >= limit) {
      return 0;
    }

    rateLimitData.count++;
    return limit - rateLimitData.count;
  }

  private async logSecurityEvent(
    event: string, 
    userId: string | null, 
    clientIP: string, 
    userAgent: string
  ): Promise<void> {
    try {
      await supabase.rpc('log_security_event', {
        p_action: event,
        p_resource_type: 'api_request',
        p_resource_id: null,
        p_cultural_sensitivity: null
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  private async checkIwiPermission(user: User | null, resource: CulturalResource): Promise<boolean> {
    if (!user) return false;

    const { data } = await supabase
      .from('iwi_permissions')
      .select('permission_granted')
      .eq('user_id', user.id)
      .eq('resource_type', 'cultural_content')
      .single();

    return data?.permission_granted === true;
  }

  private getClientIP(request: Request): string {
    return request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'unknown';
  }

  private generateRequestId(): string {
    return 'req_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Middleware function for API routes
  async secureEndpoint(
    request: Request, 
    handler: (context: SecurityContext) => Promise<Response>
  ): Promise<Response> {
    try {
      const context = await this.authenticateRequest(request);
      
      // Check rate limit
      if (context.rateLimitRemaining <= 0) {
        return new Response('Rate limit exceeded', { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-Request-ID': context.requestId
          }
        });
      }

      // Execute handler with security context
      const response = await handler(context);
      
      // Add security headers
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('X-Request-ID', context.requestId);
      response.headers.set('X-RateLimit-Remaining', context.rateLimitRemaining.toString());

      return response;
      
    } catch (error) {
      console.error('Security middleware error:', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const securityMiddleware = new SecureAPIMiddleware();
export type { SecurityContext, CulturalResource };
