export {};

const form = document.getElementById('t3-login-form') as HTMLFormElement | null;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Reset cache-bust flag so the dashboard reproduces the bug on each fresh login.
  sessionStorage.removeItem('t3_cache_busted');
  try {
    await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'secret123' }),
    });
  } catch (err) {
    console.error('Login request failed', err);
  }
  window.location.assign('/task-3/dashboard');
});
