import type { Locale } from './types';
import { t } from './runtime';

export type DOMVars = Record<string, string | number>;

// Re-renders every [data-i18n] element under `root` in the given locale.
// Vars come from data-i18n-vars (JSON-encoded).
export function applyLocale(locale: Locale, root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const varsRaw = el.dataset.i18nVars;
    let vars: DOMVars | undefined;
    if (varsRaw) {
      try {
        vars = JSON.parse(varsRaw) as DOMVars;
      } catch {
        vars = undefined;
      }
    }
    el.textContent = t(locale, key, vars);
  });
}

export function highlightActiveLocale(locale: Locale, root: ParentNode = document): void {
  root.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((btn) => {
    if (btn.dataset.locale === locale) btn.setAttribute('aria-current', 'true');
    else btn.removeAttribute('aria-current');
  });
}
