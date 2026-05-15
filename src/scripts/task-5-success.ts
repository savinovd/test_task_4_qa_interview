import { applyLocale, highlightActiveLocale } from '../i18n/dom';
import {
  formatDate,
  getInitialLocale,
  isValidLocale,
  setStoredLocale,
  trialEndDate,
} from '../i18n/runtime';
import { PLAN_LABELS_EN, type Locale, type Plan } from '../i18n/types';

let currentLocale: Locale = getInitialLocale();

// BUG: simulates a transport / normalisation step that drops the
// Ukrainian-specific Cyrillic letters not present in the Russian alphabet
// (і / І / ї / Ї / ґ / Ґ / є / Є) and replaces them with "?". Any name
// typed with the Ukrainian keyboard layout on Step 1 is corrupted on the
// success screen regardless of the chosen locale.
function mangleUkrainianChars(s: string): string {
  return s.replace(/[іІїЇґҐєЄ]/g, '?');
}

const name = mangleUkrainianChars(sessionStorage.getItem('t5_name') ?? '');
const age = sessionStorage.getItem('t5_age') ?? '—';
const gender = sessionStorage.getItem('t5_gender') ?? '—';
const planRaw = sessionStorage.getItem('t5_plan') ?? 'basic';
const plan: Plan = planRaw === 'pro' ? 'pro' : 'basic';
const trial = trialEndDate();

function refreshDynamicVars(locale: Locale): void {
  const heading = document.getElementById('success-heading') as HTMLElement | null;
  if (heading) {
    heading.dataset.i18nVars = JSON.stringify({ name });
  }
  const body = document.getElementById('success-body') as HTMLElement | null;
  if (body) {
    body.dataset.i18nVars = JSON.stringify({
      // BUG: passes the English plan label even in non-English locales,
      // instead of the translated plan name (paywall.plan.<plan>.name).
      plan: PLAN_LABELS_EN[plan],
      date: formatDate(trial, locale),
    });
  }
}

function paintStaticValues(): void {
  const ageEl = document.getElementById('summary-age');
  const genderEl = document.getElementById('summary-gender');
  const planEl = document.getElementById('summary-plan');
  if (ageEl) ageEl.textContent = age;
  if (genderEl) genderEl.textContent = gender;
  // BUG: plan name shown as English regardless of locale.
  if (planEl) planEl.textContent = PLAN_LABELS_EN[plan];
}

function setLocale(locale: Locale): void {
  currentLocale = locale;
  setStoredLocale(locale);
  refreshDynamicVars(locale);
  applyLocale(locale);
  highlightActiveLocale(locale);
}

document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const loc = btn.dataset.locale;
    if (isValidLocale(loc)) setLocale(loc);
  });
});

paintStaticValues();
setLocale(currentLocale);
