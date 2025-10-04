import type { AuthBindings } from '@refinedev/core';
import { pocketbaseClient } from './pocketbaseClient';
import type { AuthModel } from 'pocketbase';

export const pocketbaseAuthprovider: AuthBindings = {
  login: async ({ email, password, provider, providerName }) => {
    try {
      const prov = provider || providerName;

      if (prov === 'google') {
        // Autenticação OAuth com Google
        const authData = await pocketbaseClient
          .collection('users')
          .authWithOAuth2({
            provider: 'google',
          });

        if (authData.record) {
          return { success: true, redirectTo: '/' };
        }

        return {
          success: false,
          error: new Error('Falha na autenticação com Google'),
        };
      }

      // Login com email/senha (se necessário no futuro)
      if (email && password) {
        const authData = await pocketbaseClient
          .collection('users')
          .authWithPassword(email, password);

        if (authData.record) {
          return { success: true, redirectTo: '/' };
        }
      }

      return {
        success: false,
        error: new Error('Login disponível apenas com Google'),
      };
    } catch (e: unknown) {
      return { success: false, error: e as Error };
    }
  },

  logout: async () => {
    pocketbaseClient.authStore.clear();
    return { success: true, redirectTo: '/login' };
  },

  check: async () => {
    // Check temporário para desenvolvimento
    const tempAuth = localStorage.getItem('temp_auth');
    if (tempAuth === 'true') {
      return { authenticated: true };
    }

    const isValid = pocketbaseClient.authStore.isValid;
    const user = pocketbaseClient.authStore.model as AuthModel | null;

    if (isValid && user) {
      return { authenticated: true };
    }

    return { authenticated: false, redirectTo: '/login' };
  },

  getIdentity: async () => {
    // Identidade temporária para desenvolvimento
    const tempAuth = localStorage.getItem('temp_auth');
    if (tempAuth === 'true') {
      return {
        id: 'temp-user',
        name: 'Usuário Temporário (DEV)',
        email: 'dev@temp.com',
      };
    }

    const user = pocketbaseClient.authStore.model as AuthModel | null;

    if (!user) return null;

    return {
      id: user.id,
      name: user.name || user.email || 'Usuário',
      email: user.email || '',
      avatar: user.avatar
        ? pocketbaseClient.getFileUrl(user, user.avatar)
        : undefined,
    };
  },

  onError: async error => ({ error }),
};

export default pocketbaseAuthprovider;
