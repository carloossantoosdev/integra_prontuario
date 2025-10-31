import { createClient } from '@supabase/supabase-js';

/**
 * Detecta o ambiente atual baseado em variáveis de ambiente
 * Prioridade:
 * 1. VITE_ENVIRONMENT (customizado)
 * 2. VERCEL_ENV (fornecido pela Vercel automaticamente)
 * 3. MODE (modo do Vite: development/production)
 */
const getEnvironment = (): 'production' | 'preview' | 'development' => {
  const customEnv = import.meta.env.VITE_ENVIRONMENT;
  const vercelEnv = import.meta.env.VERCEL_ENV;
  const mode = import.meta.env.MODE;

  if (customEnv) {
    return customEnv as 'production' | 'preview' | 'development';
  }

  // Vercel fornece VERCEL_ENV automaticamente
  if (vercelEnv === 'production') {
    return 'production';
  }
  if (vercelEnv === 'preview' || vercelEnv === 'development') {
    return 'preview';
  }

  // Fallback para desenvolvimento local
  if (mode === 'development') {
    return 'development';
  }

  // Default para produção em caso de dúvida
  return 'production';
};

/**
 * Configurações do Supabase por ambiente
 * 
 * Cada ambiente deve ter suas próprias variáveis de ambiente configuradas:
 * - Production: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY do projeto de produção
 * - Preview/Development: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY do projeto de homologação
 */
const getSupabaseConfig = () => {
  const environment = getEnvironment();

  // Obter URL e ANON_KEY das variáveis de ambiente
  // Fallback para o projeto atual se não especificado
  const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL ||
    'https://ssxdmbojuvqkkkujakdk.supabase.co';

  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

  if (!supabaseAnonKey) {
    const envName = environment === 'production' ? 'PRODUÇÃO' : 'HOMOLOGAÇÃO';
    console.error(
      `[Supabase ${envName}] ANON_KEY ausente. Verifique VITE_SUPABASE_ANON_KEY no seu .env.local ou nas configurações da Vercel`
    );
    throw new Error(
      `Config do Supabase ${envName} ausente ou inválida. Verifique as variáveis de ambiente.`
    );
  }

  // Log do ambiente em desenvolvimento (não em produção)
  if (environment !== 'production') {
    console.log(`[Supabase] Ambiente: ${environment}`);
    console.log(`[Supabase] URL: ${supabaseUrl}`);
  }

  return {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    environment,
  };
};

const config = getSupabaseConfig();

export const supabaseClient = createClient(config.url, config.anonKey);

// Exportar também o ambiente atual para uso em outros lugares se necessário
export const currentEnvironment = config.environment;

export default supabaseClient;

