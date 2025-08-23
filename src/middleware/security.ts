// Enhanced Security Middleware - Te Kura o TeAoMarama
import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

export interface SecurityContext {
  user: User | null;
  culturalClearance: 'none' | 'basic' | 'approved' | 'kaitiaki';
  educatorStatus: boolean;
  rateLimitRemaining: number;
}

export class SecureAPIMiddleware {
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  async authenticateRequest(request: Request): Promise<SecurityContext> {
    const authHeader = request.headers.get('Authorization');
    const clientIP = this.getClientIP(request);

    let user = null;
    let culturalClearance: SecurityContext['culturalClearance'] = 'none';
    let educatorStatus = false;

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser(token);

      if (authUser && !error) {
        user = authUser;
        culturalClearance = await this.getCulturalClearance(user);
        educatorStatus = await this.isEducator(user);
        await this.logSecurityEvent('AUTH_SUCCESS', user.id);
      } else {
        await this.logSecurityEvent('AUTH_FAILURE', null);
      }
    }

    const rateLimitRemaining = this.checkRateLimit(clientIP, user?.id);

    return {
      user,
      culturalClearance,
      educatorStatus,
      rateLimitRemaining,
    };
  }

  async validateCulturalAccess(
    culturalSensitivity: 'low' | 'medium' | 'high' | 'sacred',
    context: SecurityContext,
  ): Promise<boolean> {
    if (culturalSensitivity === 'high' && context.culturalClearance === 'none') {
      return false;
    }

    if (culturalSensitivity === 'sacred' && context.culturalClearance !== 'kaitiaki') {
      return false;
    }

    return true;
  }

  private async getCulturalClearance(user: User): Promise<SecurityContext['culturalClearance']> {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('cultural_clearance, cultural_roles')
        .eq('user_id', user.id)
        .single();

      if (data?.cultural_roles?.includes('kaitiaki')) return 'kaitiaki';
      if (data?.cultural_clearance === 'approved') return 'approved';
      if (data?.cultural_clearance === 'basic') return 'basic';
    } catch (error) {
      console.error('Error getting cultural clearance:', error);
    }

    return 'none';
  }

  private async isEducator(user: User): Promise<boolean> {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('role, educator_status')
        .eq('user_id', user.id)
        .single();

      return data?.role === 'educator' || data?.educator_status === true;
    } catch (error) {
      console.error('Error checking educator status:', error);
      return false;
    }
  }

  private checkRateLimit(clientIP: string, userId?: string): number {
    const key = userId || clientIP;
    const now = Date.now();
    const limit = userId ? 1000 : 100;
    const windowMs = 60 * 60 * 1000;

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

  private async logSecurityEvent(event: string, userId: string | null): Promise<void> {
    try {
      await supabase.rpc('log_security_event', {
        p_action: event,
        p_resource_type: 'api_request',
        p_resource_id: null,
        p_cultural_sensitivity: null,
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  private getClientIP(request: Request): string {
    return request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  }
}

export const securityMiddleware = new SecureAPIMiddleware();
