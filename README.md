# QA Test Tasks

A small Astro + TypeScript site that hosts 4 deliberately buggy interactive scenarios. Used during interviews to evaluate QA web manual candidates.

## Stack

- Astro 5 (`output: 'static'`, on-demand API routes)
- TypeScript (strict)
- `@astrojs/node` adapter (`mode: 'standalone'`)
- No UI framework; hand-crafted CSS with design tokens.

## Run

```
npm install
npm run dev
```

Open `http://localhost:4321/`.

For a production-style run:

```
npm run build
npm run preview
```

## Tasks

| # | Title | URL | Bug list |
|---|-------|-----|----------|
| 1 | Age Form | `/task-1/` | [docs/task-1-age-form.md](docs/task-1-age-form.md) |
| 2 | Login Validation | `/task-2/` | [docs/task-2-login-validation.md](docs/task-2-login-validation.md) |
| 3 | Eternal Loader | `/task-3/` | [docs/task-3-eternal-loader.md](docs/task-3-eternal-loader.md) |
| 4 | Analytics Events | `/task-4/` | [docs/task-4-analytics.md](docs/task-4-analytics.md) |

The `docs/task-*.md` files are answer keys for the interviewer. Do not share with candidates before the interview.

## Photos

Task 1 references `public/images/young.jpg` and `public/images/adult.jpg`. Replace the placeholder files with real photos to make Screen A/B/C/D look complete.

## Deployment (Docker / Coolify)

The repo ships a multi-stage `Dockerfile` that produces a small runtime image (Node 20 Alpine) listening on port `4321`.

### Build & run locally with Docker

```
docker build -t qa-test-tasks .
docker run --rm -p 4321:4321 qa-test-tasks
```

Open `http://localhost:4321/`.

### Deploy to Coolify

1. **New resource → Application → from your Git repository**.
2. **Build pack: Dockerfile** (Coolify auto-detects `./Dockerfile`).
3. **Ports exposed:** `4321`. Map it to whatever public port / domain you want.
4. **Healthcheck path** (optional): `/` — should return HTTP 200.
5. Deploy. The container starts `node ./dist/server/entry.mjs` automatically.

### Environment variables

The Astro Node adapter reads these at runtime. Defaults set in the Dockerfile already match a Coolify-friendly setup:

| Var | Default | Notes |
|-----|---------|-------|
| `HOST` | `0.0.0.0` | Must bind to all interfaces inside the container. Don't change. |
| `PORT` | `4321` | Change only if you also remap the exposed port. |
| `NODE_ENV` | `production` | — |

No other env vars are required — the site has no database, no auth, no external API keys.
