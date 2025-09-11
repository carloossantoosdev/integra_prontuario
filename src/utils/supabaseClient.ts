import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string).replace(
  /\/$/,
  ''
);
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Em 2025, o PostgREST do Supabase aplica CORS automaticamente. Para evitar
// interferência de proxies de rede/extensões e contornar variações de CORS,
// roteamos chamadas REST via um endpoint local `/api/rest` (Vite em dev,
// função serverless no deploy). Demais endpoints continuam indo direto.
const restPrefix = `${supabaseUrl}/rest/v1/`;
const authPrefix = `${supabaseUrl}/auth/v1/`;

const proxyingFetch: typeof fetch = async (input, init) => {
  const urlString =
    typeof input === 'string' ? input : (input as URL).toString();

  if (urlString.startsWith(restPrefix)) {
    const originalUrl = new URL(urlString);
    // Extraímos somente a parte do path após /rest/v1/ e anexamos a query uma única vez
    const pathAfterRest = originalUrl.pathname.replace(/.*\/rest\/v1\//, '');
    const proxiedUrl = `/api/rest/${pathAfterRest}${originalUrl.search}`;

    // Apenas repassamos; @supabase/supabase-js já define headers necessários
    // (authorization, apikey, content-type, x-client-info, etc.).
    return globalThis.fetch(proxiedUrl, init);
  }

  if (urlString.startsWith(authPrefix)) {
    const originalUrl = new URL(urlString);
    const pathAfterAuth = originalUrl.pathname.replace(/.*\/auth\/v1\//, '');
    const proxiedUrl = `/api/auth/${pathAfterAuth}${originalUrl.search}`;
    return globalThis.fetch(proxiedUrl, init);
  }

  return globalThis.fetch(input as RequestInfo, init);
};

export const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: proxyingFetch,
  },
});
