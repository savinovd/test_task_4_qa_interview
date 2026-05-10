// Buggy analytics module:
//   - trackPageOpen() fires page_open TWICE
//   - trackSelect() omits userId

function getUserId(): string {
  // /task-4/<userId>/<step>
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[1] ?? '';
}

function getPage(): string {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[2] ?? '';
}

function send(payload: Record<string, unknown>): void {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => { /* swallow — analytics must never block UX */ });
}

// Called twice intentionally — once at module top, once on DOMContentLoaded.
export function trackPageOpen(): void {
  send({ event: 'page_open', userId: getUserId(), page: getPage() });
}

export function trackSelect(value: string): void {
  // Bug: userId is intentionally omitted here.
  send({ event: 'value_select', page: getPage(), value });
}

// First fire — at module evaluation.
trackPageOpen();
// Second fire — on DOMContentLoaded (or immediate if document already ready).
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => trackPageOpen());
} else {
  trackPageOpen();
}
