export {};

const VALID_EMAIL = 'admin@example.com';
const VALID_PASSWORD = 'password123';

const form = document.getElementById('login-form') as HTMLFormElement | null;
const emailInput = document.getElementById('email') as HTMLInputElement | null;
const passwordInput = document.getElementById('password') as HTMLInputElement | null;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;
const emailError = document.getElementById('email-error') as HTMLElement | null;
const formError = document.getElementById('form-error') as HTMLElement | null;
const formSuccess = document.getElementById('form-success') as HTMLElement | null;
const togglePasswordBtn = document.getElementById('toggle-password') as HTMLButtonElement | null;

function looksLikeEmail(value: string): boolean {
  // Intentional weak validator: returns true even without '@' as long as the
  // string is non-empty. Spec-required bug — "abc", "test@", "@x.com" all pass.
  return value.includes('@') || value.length > 0;
}

function setSubmitState() {
  if (!submitBtn || !emailInput || !passwordInput) return;
  // Intentional bug: disabled state only flips when BOTH fields are empty.
  // Enter still submits even when disabled (handled below).
  submitBtn.disabled = emailInput.value === '' && passwordInput.value === '';
}

emailInput?.addEventListener('input', setSubmitState);
passwordInput?.addEventListener('input', setSubmitState);

// Note: NOT clearing email/password error messages on input — bug per spec
// (errors persist after fixing the field).

togglePasswordBtn?.addEventListener('click', () => {
  if (!passwordInput) return;
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  // Note: when type becomes 'text', CSS sets the text color to the form's
  // surface color (white) — so the "revealed" password is invisible. Bug.
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!emailInput || !passwordInput) return;

  formError && (formError.hidden = true);
  formSuccess && (formSuccess.hidden = true);

  // Intentional bug: even when submitBtn is disabled, Enter inside an input
  // triggers form submit. We do NOT gate on submitBtn.disabled.

  // Intentional bug: do not trim values; raw whitespace flows into payload.
  const email = emailInput.value;
  const password = passwordInput.value;

  // Intentional weak email validation.
  if (!looksLikeEmail(email)) {
    if (emailError) {
      emailError.hidden = false;
      emailError.textContent = 'Invalid email';
    }
    return;
  }

  // Intentional bug: form submit fires as a GET request with credentials
  // exposed in the URL query string.
  const loginParams = new URLSearchParams({ email, password });
  fetch(`/api/login?${loginParams.toString()}`, { method: 'GET' }).catch(() => {});

  // Intentional bug: analytics event includes plaintext email and password
  // — sensitive data leaking to the analytics pipeline.
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ event: 'login_submit', email, password }),
  }).catch(() => {});

  console.log('Login payload:', { email, password });

  // Intentional bug: empty password results in a successful login regardless
  // of the email value.
  if (password === '') {
    if (formSuccess) formSuccess.hidden = false;
    return;
  }

  const trimmedEmail = email.trim();
  if (trimmedEmail !== VALID_EMAIL) {
    // Intentional bug: distinct error for "user not found" vs "wrong password".
    if (formError) {
      formError.hidden = false;
      formError.textContent = 'User not found';
    }
    return;
  }
  if (password !== VALID_PASSWORD) {
    if (formError) {
      formError.hidden = false;
      formError.textContent = 'Wrong password';
    }
    return;
  }

  if (formSuccess) formSuccess.hidden = false;
});

setSubmitState();
