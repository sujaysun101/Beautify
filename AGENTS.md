# AGENTS.md

## Cursor Cloud specific instructions

Beautify is a single Vite + React 19 SPA (package manager: **npm**). Standard scripts live in
`package.json` (`dev`, `build`, `lint`, `preview`); the dev server runs on **http://localhost:5284**
(port is pinned in `vite.config.js`). There are no automated tests in this repo.

The app talks directly to **Supabase** (Auth + Postgres). `src/config/supabase.js` throws on startup
if `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are missing, so the app will not boot without them.
For local development this environment runs a **local Supabase stack** (Docker) instead of a hosted
project, so no external credentials are required.

### Bringing the environment up (services are NOT started by the update script)

The update script only runs `npm install`. Docker and Supabase must be started manually each session:

1. Start the Docker daemon (Docker Engine is installed; there is no systemd here):
   `sudo dockerd > /tmp/dockerd.log 2>&1 &` (or run it in a tmux session). The daemon is configured
   in `/etc/docker/daemon.json` to use the `fuse-overlayfs` storage driver with the
   `containerd-snapshotter` feature disabled — this combination is required for Docker to run inside
   this VM. Do not change it.
2. Start Supabase from the repo root: `supabase start`. The `ubuntu` user is in the `docker` group,
   so run `supabase`/`docker` **without sudo** in a fresh shell. Do NOT run `supabase start` with
   `sudo` — it creates root-owned files under `supabase/.temp` which then makes `npm run lint` fail
   with `EACCES`. If that happens, fix it with `sudo chown -R ubuntu:ubuntu supabase`.
3. Load the schema once after the stack is up (idempotent — uses `CREATE ... IF NOT EXISTS`):
   `docker exec -i supabase_db_workspace psql postgresql://postgres:postgres@127.0.0.1:5432/postgres < database/schema.sql`
4. Create `.env` (gitignored) pointing at the local stack. Get the values with `supabase status -o env`:
   - `VITE_SUPABASE_URL=http://127.0.0.1:54321`
   - `VITE_SUPABASE_ANON_KEY=<ANON_KEY from `supabase status -o env`>`
5. Start the app: `npm run dev` → http://localhost:5284

### Local Supabase notes

- Config lives in `supabase/config.toml`. Email confirmations are disabled (`[auth.email]
  enable_confirmations = false`), so **sign-up returns a session immediately** and redirects to
  `/dashboard` — no email step is needed to test the auth + SkinIQ flow.
- `site_url`/`additional_redirect_urls` in `supabase/config.toml` are set to `http://localhost:5284`.
- Local Supabase keys printed by `supabase start` are well-known non-production defaults; they are fine
  to place in the gitignored `.env` but should never be treated as secrets.
- Studio: http://127.0.0.1:54323 · Mailpit (captured emails): http://127.0.0.1:54324
- The "AI" skin analysis in `src/components/SkinQuiz/steps/ProcessingStep.jsx` is **mocked**
  (hardcoded results via `setTimeout`); there is no real AI/ML backend service in this repo.
