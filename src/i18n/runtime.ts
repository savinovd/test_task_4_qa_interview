import type { Locale, Plan } from './types';
import { LOCALES, PLAN_PRICES, TRIAL_DAYS } from './types';
import { translations } from './translations';

const STORAGE_KEY = 't5_locale';

export function t(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const dict = translations[locale] ?? {};
  let raw = dict[key];
  if (raw === undefined) {
    // BUG: returns the raw key (e.g. "onboarding.welcome.title") when a
    // translation is missing, instead of falling back to en-US. The
    // candidate sees internal i18n keys leaking into the UI.
    return key;
  }
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      raw = raw.split(`{${k}}`).join(String(v));
    }
  }
  return raw;
}

export function isValidLocale(value: string | null | undefined): value is Locale {
  return value != null && (LOCALES as readonly string[]).includes(value);
}

// BUG: language preference is never read from URL or storage. Every page
// load starts at en-US. The candidate observes that switching locale does
// not persist across a reload, and that ?lang= in URLs is ignored.
export function getInitialLocale(): Locale {
  return 'en-US';
}

export function setStoredLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore (private browsing) */
  }
  // BUG: does not push ?lang= into the URL, so shared links do not carry
  // the language preference.
}

// Plan-specific price formatters. Both are intentionally buggy, but in
// different ways — see docs/task-5-localization.md (section C).

const USD_TO_LOCAL_RATE: Record<Locale, number> = {
  'en-US': 1,
  'es-MX': 0.92, // USD → EUR (approx)
  'uk-UA': 41, // USD → UAH (approx)
};

const LOCAL_CURRENCY_SYMBOL: Record<Locale, string> = {
  'en-US': '$',
  'es-MX': '€',
  'uk-UA': '₴',
};

// BUG: the numeric amount IS converted to the local currency (EUR for
// es-MX, UAH for uk-UA), but the "$" symbol is kept regardless of locale.
// Result for $9.99: en-US "$9.99", es-MX "$9.19", uk-UA "$409.59".
export function formatBasicPrice(usdAmount: number, locale: Locale): string {
  const converted = usdAmount * USD_TO_LOCAL_RATE[locale];
  return `$${converted.toFixed(2)}`;
}

// BUG: the currency SYMBOL is localised, but the USD numeric amount is
// rendered as-is. Result for $14.99: en-US "$14.99", es-MX "€14.99",
// uk-UA "₴14.99" — looks native but the user actually pays USD.
export function formatProPrice(usdAmount: number, locale: Locale): string {
  return `${LOCAL_CURRENCY_SYMBOL[locale]}${usdAmount.toFixed(2)}`;
}

export function formatDate(date: Date, _locale: Locale): string {
  // BUG: the `locale` parameter is intentionally ignored. Always returns
  // US-style MM/DD/YYYY. Expected DD/MM/YYYY for es-MX,
  // DD.MM.YYYY for uk-UA.
  return date.toLocaleDateString('en-US');
}

export function pluralDayWord(days: number, _locale: Locale): string {
  // BUG: the locale parameter is ignored and the words are hardcoded
  // English. Even worse, only two forms are produced (one / many) —
  // Ukrainian needs three forms (1 день / 2-4 дні / 5+ днів).
  return days === 1 ? 'day' : 'days';
}

export function getPlanPrice(plan: Plan): number {
  return PLAN_PRICES[plan];
}

export function trialEndDate(now: Date = new Date()): Date {
  const d = new Date(now);
  d.setDate(d.getDate() + TRIAL_DAYS);
  return d;
}
