import { applyLocale, highlightActiveLocale } from '../i18n/dom';
import { getInitialLocale, isValidLocale, setStoredLocale, t } from '../i18n/runtime';
import type { Locale } from '../i18n/types';

let currentLocale: Locale = getInitialLocale();

function setLocale(locale: Locale): void {
  currentLocale = locale;
  setStoredLocale(locale);
  applyLocale(locale);
  highlightActiveLocale(locale);
  // applyLocale handles textContent; placeholders are an HTMLAttribute,
  // so update them separately.
  document.querySelectorAll<HTMLInputElement>('[data-i18n-attr-placeholder]').forEach((el) => {
    const key = el.dataset.i18nAttrPlaceholder;
    if (key) el.placeholder = t(locale, key);
  });
}

document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const loc = btn.dataset.locale;
    if (isValidLocale(loc)) setLocale(loc);
  });
});

// Initial paint
setLocale(currentLocale);

// Form handling
const form = document.getElementById('step1-form') as HTMLFormElement | null;
const ageInput = document.getElementById('age-input') as HTMLInputElement | null;
const nameInput = document.getElementById('name-input') as HTMLInputElement | null;

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!ageInput || !nameInput) return;
  const age = ageInput.value.trim();
  const name = nameInput.value.trim();
  const gender =
    (document.querySelector<HTMLInputElement>('input[name="gender"]:checked')?.value) ?? '';
  if (!age || !name || !gender) return;
  sessionStorage.setItem('t5_age', age);
  sessionStorage.setItem('t5_gender', gender);
  sessionStorage.setItem('t5_name', name);
  window.location.assign('/task-5/paywall');
});
