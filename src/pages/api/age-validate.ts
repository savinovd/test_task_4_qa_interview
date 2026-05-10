import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let age: unknown;
  try {
    const body = await request.json();
    age = (body as { age?: unknown }).age;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  if (typeof age !== 'number' || Number.isNaN(age)) {
    return new Response(
      JSON.stringify({ error: 'age must be a number' }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  // Intentional bugs per spec:
  //   - negative ages return a 500 with technical message
  //   - exact 25 returns the same 500 (boundary handling defect)
  if (age < 0 || age === 25) {
    return new Response(
      JSON.stringify({ error: 'something went wrong' }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  );
};
