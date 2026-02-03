import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { App } from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar service worker apenas em produção
if (import.meta.env.PROD) {
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      immediate: true,
      onRegistered(registration) {
        console.log('✅ PWA registrado');
      },
      onRegisterError(error) {
        console.warn('⚠️ Erro ao registrar PWA:', error);
      },
    });
  }).catch(() => {
    // PWA não disponível
  });
}
