import { applyLocale, highlightActiveLocale } from '../i18n/dom';
import {
  formatBasicPrice,
  formatDate,
  formatProPrice,
  getInitialLocale,
  isValidLocale,
  pluralDayWord,
  setStoredLocale,
  trialEndDate,
} from '../i18n/runtime';
import { PLAN_PRICES, TRIAL_DAYS, type Locale, type Plan } from '../i18n/types';

let currentLocale: Locale = getInitialLocale();

const trial = trialEndDate();

function refreshDynamicVars(locale: Locale): void {
  const trialEl = document.getElementById('trial-line') as HTMLElement | null;
  if (trialEl) {
    trialEl.dataset.i18nVars = JSON.stringify({
      days: TRIAL_DAYS,
      dayWord: pluralDayWord(TRIAL_DAYS, locale),
      date: formatDate(trial, locale),
    });
  }
  (['basic', 'pro'] as Plan[]).forEach((plan) => {
    const el = document.getElementById(`price-${plan}`) as HTMLElement | null;
    if (!el) return;
    const price = plan === 'basic'
      ? formatBasicPrice(PLAN_PRICES[plan], locale)
      : formatProPrice(PLAN_PRICES[plan], locale);
    el.dataset.i18nVars = JSON.stringify({ price });
  });
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

// Initial paint
setLocale(currentLocale);

// Checkout button
const cta = document.getElementById('checkout-cta') as HTMLButtonElement | null;
cta?.addEventListener('click', () => {
  const plan = (
    document.querySelector<HTMLInputElement>('input[name="plan"]:checked')?.value ?? 'basic'
  ) as Plan;
  sessionStorage.setItem('t5_plan', plan);
  window.location.assign('/task-5/success');
});
