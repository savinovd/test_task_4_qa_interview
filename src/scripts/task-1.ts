export {};

type ValidateResponse = { ok: true } | { error: string };

const form = document.getElementById('age-form') as HTMLFormElement | null;
const input = document.getElementById('age-input') as HTMLInputElement | null;
const error = document.getElementById('age-error') as HTMLElement | null;

if (form && input && error) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    error.hidden = true;
    error.textContent = '';

    const raw = input.value.trim();
    if (raw === '') {
      error.hidden = false;
      error.textContent = 'Please enter your age.';
      return;
    }

    const age = Number(raw);
    if (Number.isNaN(age)) {
      error.hidden = false;
      error.textContent = 'Age must be a number.';
      return;
    }

    let res: Response;
    try {
      res = await fetch('/api/age-validate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ age }),
      });
    } catch (err) {
      console.error('Network error', err);
      return;
    }

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as ValidateResponse;
      const message = 'error' in data ? data.error : `HTTP ${res.status}`;
      console.error(`Validation failed: ${message} (age=${age})`);
      window.location.assign('/task-1/error');
      return;
    }

    window.location.assign(routeForAge(age));
  });
}

function routeForAge(age: number): string {
  if (age <= 17) return '/task-1/screen-b';
  if (age >= 18 && age <= 24) return '/task-1/screen-a';
  if (age >= 26 && age <= 35) return '/task-1/screen-b';
  if (age >= 36 && age <= 45) return '/task-1/screen-c';
  if (age >= 46 && age <= 99) return '/task-1/screen-d';
  return '/task-1/screen-a'; // > 99 — intentional bug: silent fallback to A
}
