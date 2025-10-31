import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      // Permitir servir arquivos fora da raiz
      strict: false,
    },
  },
  optimizeDeps: {
    // Configurações de otimização de dependências
  },
});
