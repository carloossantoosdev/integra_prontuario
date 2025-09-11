import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const supabaseUrl = (
    env.VITE_SUPABASE_URL || 'https://example.supabase.co'
  ).replace(/\/$/, '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy transparente para o REST do Supabase durante o desenvolvimento
        '/api/rest': {
          target: supabaseUrl,
          changeOrigin: true,
          // Em ambientes corporativos pode haver interceptação TLS com CA própria;
          // desabilitamos a verificação em DEV para evitar "self-signed certificate".
          secure: false,
          rewrite: path => path.replace(/^\/api\/rest\/?/, '/rest/v1/'),
          configure: proxy => {
            // Permitir cabeçalhos necessários que o supabase-js envia
            proxy.on('proxyReq', () => {
              // noop
            });
            proxy.on('error', err => {
              console.error('[vite] http proxy error', err?.message || err);
            });
          },
        },
        // Proxy para endpoints de autenticação (login, refresh, etc.)
        '/api/auth': {
          target: supabaseUrl,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api\/auth\/?/, '/auth/v1/'),
        },
      },
    },
  };
});
