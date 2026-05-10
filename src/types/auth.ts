export type LoginResponse = { ok: true } | { error: string };

export type MeResponse =
  | { name: string; role: string }
  | { error: string };
