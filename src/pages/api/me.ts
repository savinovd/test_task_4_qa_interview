import type { APIRoute } from 'astro';
import type { MeResponse } from '../../types/auth';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  // Intentional simulated cache behaviour:
  //   - presence of any `bust` query param → 200 with user data
  //   - absence → 401 (the broken default after navigation from login)
  if (url.searchParams.has('bust')) {
    const ok: MeResponse = { name: 'Alex Doe', role: 'QA Engineer' };
    return new Response(JSON.stringify(ok), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
  const err: MeResponse = { error: 'Not authenticated' };
  return new Response(JSON.stringify(err), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  });
};
