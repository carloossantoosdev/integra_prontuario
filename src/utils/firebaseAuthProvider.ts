import type { AuthBindings } from '@refinedev/core';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './firebaseClient';

export const firebaseAuthProvider: AuthBindings = {
  login: async ({ email, password, provider, providerName }) => {
    try {
      const prov = provider || providerName;
      if (prov === 'google') {
        const google = new GoogleAuthProvider();
        await signInWithPopup(auth, google);
        return { success: true, redirectTo: '/' };
      }
      // Desabilitado login por e-mail/senha
      return {
        success: false,
        error: new Error('Login disponível apenas com Google'),
      };
    } catch (e: unknown) {
      return { success: false, error: e as Error };
    }
  },
  logout: async () => {
    await signOut(auth);
    return { success: true, redirectTo: '/login' };
  },
  check: async () => {
    const user = auth.currentUser;
    if (user) return { authenticated: true };
    // Espera curta para pegar estado inicial em SPA
    const isAuthed = await new Promise<boolean>(resolve => {
      const unsub = onAuthStateChanged(auth, (u: User | null) => {
        unsub();
        resolve(Boolean(u));
      });
      setTimeout(() => resolve(false), 1000);
    });
    return isAuthed
      ? { authenticated: true }
      : { authenticated: false, redirectTo: '/login' };
  },
  getIdentity: async () => {
    const user = auth.currentUser;
    if (!user) return null;
    return { id: user.uid, name: user.email ?? '' } as any;
  },
  onError: async error => ({ error }),
};

export default firebaseAuthProvider;
