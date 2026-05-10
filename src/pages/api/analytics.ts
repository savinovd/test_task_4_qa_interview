import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let payload: unknown = null;
  try {
    payload = await request.json();
  } catch {
    /* tolerate empty/invalid bodies — endpoint should never block the UI */
  }
  // Server-side log is for the interviewer's terminal; intentional and helpful.
  console.log('[analytics]', JSON.stringify(payload));
  // Echo the received payload back so the candidate can verify it in the
  // Network tab response.
  return new Response(JSON.stringify({ ok: true, received: payload }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
