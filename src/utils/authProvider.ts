import type { AuthBindings } from '@refinedev/core';
import { supabaseClient } from './supabaseClient';

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      if (!email || !password) {
        return {
          success: false,
          error: new Error('E-mail e senha são obrigatórios'),
        };
      }

      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: new Error(error.message),
        };
      }

      return {
        success: true,
        redirectTo: '/',
      };
    } catch (e: unknown) {
      return {
        success: false,
        error: e as Error,
      };
    }
  },
  logout: async () => {
    await supabaseClient.auth.signOut();
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const { data } = await supabaseClient.auth.getSession();
    const isAuthenticated = Boolean(data.session);
    if (isAuthenticated) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();
    const user = data.user;
    if (!user) return null;
    return {
      id: user.id,
      name: user.email ?? '',
      avatar: undefined,
    } as any;
  },
  onError: async error => ({ error }),
};

export default authProvider;
