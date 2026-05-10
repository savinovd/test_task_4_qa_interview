import type { MeResponse } from '../types/auth';

const loader = document.getElementById('loader') as HTMLElement | null;
const info = document.getElementById('user-info') as HTMLElement | null;
const nameEl = document.getElementById('user-name') as HTMLElement | null;

async function init() {
  const navEntries = performance.getEntriesByType('navigation');
  const navType = (navEntries[0] as PerformanceNavigationTiming | undefined)?.type;

  // Intentional bug: only a reload appends the cache-bust query and gets a
  // 200. Any plain navigation (e.g. arriving from /task-3/ login) hits the
  // un-bust path and gets 401 → spinner forever. Every kind of reload
  // (F5, Cmd+Shift+R, "Empty Cache and Hard Reload") works, every time.
  const url = navType === 'reload'
    ? `/api/me?bust=${Date.now()}`
    : '/api/me';

  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) {
      console.error('Error: User not authenticated');
      return; // Spinner keeps spinning (intentional).
    }
    const data = (await res.json()) as MeResponse;
    if ('role' in data && nameEl && loader && info) {
      nameEl.textContent = `Welcome, ${data.role}`;
      loader.hidden = true;
      info.hidden = false;
    }
  } catch (err) {
    console.error('Network error', err);
  }
}

init();
