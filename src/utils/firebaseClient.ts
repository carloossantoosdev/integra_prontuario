import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let firestoreInstance: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;

  const apiKey = (
    import.meta.env.VITE_FB_API_KEY as string | undefined
  )?.trim();
  const authDomain = (
    import.meta.env.VITE_FB_AUTH_DOMAIN as string | undefined
  )?.trim();
  const projectId = (
    import.meta.env.VITE_FB_PROJECT_ID as string | undefined
  )?.trim();

  if (!apiKey || !authDomain || !projectId) {
    // Ajuda de diagnóstico em DEV
    console.error(
      '[Firebase] Variáveis ausentes. Verifique VITE_FB_API_KEY, VITE_FB_AUTH_DOMAIN e VITE_FB_PROJECT_ID no seu .env.local'
    );
    throw new Error('Config do Firebase ausente ou inválida');
  }

  const app = initializeApp({ apiKey, authDomain, projectId });
  firebaseApp = app;
  return app;
}

export function getFirebaseAuth(): Auth {
  if (authInstance) return authInstance;
  authInstance = getAuth(getFirebaseApp());
  return authInstance;
}

export function getFirestoreDb(): Firestore {
  if (firestoreInstance) return firestoreInstance;
  firestoreInstance = getFirestore(getFirebaseApp());
  return firestoreInstance;
}

export const auth = getFirebaseAuth();
export const db = getFirestoreDb();
