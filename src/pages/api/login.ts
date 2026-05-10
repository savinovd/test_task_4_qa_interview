import type { APIRoute } from 'astro';
import type { LoginResponse } from '../../types/auth';

export const prerender = false;

export const POST: APIRoute = async () => {
  // Stub: always succeeds. Provided so the candidate can inspect a login
  // request in DevTools Network. Real auth is out of scope for this site.
  const body: LoginResponse = { ok: true };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

// Used by Task 2's buggy login form: it submits via GET with credentials in
// the URL query string. The endpoint always returns 200 — the bug is that
// this request happens at all.
export const GET: APIRoute = async () => {
  const body: LoginResponse = { ok: true };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
