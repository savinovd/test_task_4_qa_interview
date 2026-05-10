import type { MeResponse } from '../types/auth';

const loader = document.getElementById('loader') as HTMLElement | null;
const info = document.getElementById('user-info') as HTMLElement | null;
const nameEl = document.getElementById('user-name') as HTMLElement | null;

async function init() {
  const navEntries = performance.getEntriesByType('navigation');
  const navType = (navEntries[0] as PerformanceNavigationTiming | undefined)?.type;
  const cacheBusted = sessionStorage.getItem('t3_cache_busted') === 'yes';

  let url = '/api/me';
  if (navType === 'reload' && !cacheBusted) {
    sessionStorage.setItem('t3_cache_busted', 'yes');
    url = `/api/me?bust=${Date.now()}`;
  }

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
