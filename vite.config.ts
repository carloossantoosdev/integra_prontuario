import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const supabaseUrl = (
    env.VITE_SUPABASE_URL || 'https://example.supabase.co'
  ).replace(/\/$/, '');

  return {
    plugins: [react()],
  };
});
