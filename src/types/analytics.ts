export type AnalyticsEvent =
  | { event: 'page_open'; userId: string; page: string }
  | { event: 'value_select'; userId: string; page: string; value: string }
  | { event: 'onboarding_complete'; userId: string };

// Looser type that matches what the buggy client actually sends.
// `userId` may be omitted on `value_select` (intentional bug).
export type AnyAnalyticsPayload = Record<string, unknown>;
