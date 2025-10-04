import PocketBase from 'pocketbase';

let pb: PocketBase | null = null;

export function getPocketBaseClient(): PocketBase {
  if (pb) return pb;

  const url = (
    import.meta.env.VITE_POCKETBASE_URL as string | undefined
  )?.trim();

  if (!url) {
    console.error(
      '[PocketBase] URL ausente. Verifique VITE_POCKETBASE_URL no seu .env.local'
    );
    throw new Error('Config do PocketBase ausente ou inválida');
  }

  pb = new PocketBase(url);
  return pb;
}

export const pocketbaseClient = getPocketBaseClient();
export default pocketbaseClient;
