import type { VercelRequest, VercelResponse } from '@vercel/node';

// Proxy REST → Supabase PostgREST com CORS consistente
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const projectUrl = (
      process.env.VITE_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      ''
    ).replace(/\/$/, '');
    if (!projectUrl) {
      res
        .status(500)
        .json({
          error: 'Missing SUPABASE URL env (VITE_SUPABASE_URL or SUPABASE_URL)',
        });
      return;
    }

    const path = Array.isArray(req.query.path)
      ? req.query.path.join('/')
      : (req.query.path as string) || '';
    const query =
      req.url && req.url.includes('?') ? `?${req.url.split('?')[1]}` : '';
    const target = `${projectUrl}/rest/v1/${path}${query}`;

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PATCH,DELETE,OPTIONS'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'authorization, content-type, apikey, x-client-info, prefer, accept-profile, range, range-unit'
      );
      res.status(200).send('ok');
      return;
    }

    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (typeof v === 'string') headers.set(k, v);
    }

    headers.set('host', new URL(projectUrl).host);

    const upstream = await fetch(target, {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes((req.method || 'GET').toUpperCase())
        ? undefined
        : (req as any),
      redirect: 'manual',
    });

    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Vary', 'Origin');
    upstream.headers.forEach((value, key) => res.setHeader(key, value));
    res.status(upstream.status);
    const arrayBuffer = await upstream.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Proxy error' });
  }
}
