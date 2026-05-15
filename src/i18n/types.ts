export type Locale = 'en-US' | 'es-MX' | 'uk-UA';

export const LOCALES: readonly Locale[] = ['en-US', 'es-MX', 'uk-UA'] as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  'en-US': 'English',
  'es-MX': 'Español',
  'uk-UA': 'Українська',
};

export type Plan = 'basic' | 'pro';

export const PLANS: readonly Plan[] = ['basic', 'pro'] as const;

export const PLAN_PRICES: Record<Plan, number> = {
  basic: 9.99,
  pro: 14.99,
};

export const TRIAL_DAYS = 7;

// Plan display labels are stored in English on purpose. Pages interpolate
// them into translated strings without re-translating — see the `plan`
// variable in success.heading / success.body and the answer key.
export const PLAN_LABELS_EN: Record<Plan, string> = {
  basic: 'Basic',
  pro: 'Pro',
};
