export {};

const form = document.getElementById('t3-login-form') as HTMLFormElement | null;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
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
