# Beautify

Beautify is a React + Vite skincare product experience centered on `SkinIQ`, a guided assessment flow that helps users capture skin context, upload photos, review recommendations, and return to a personalized dashboard.

## What is in the repo

- Public marketing pages for the Beautify product story
- Auth flows backed by Supabase
- Protected dashboard and SkinIQ assessment routes
- Supabase schema for quiz sessions, results, progress, products, and feedback

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file from the example and provide real Supabase values:

```bash
cp .env.example .env
```

Required variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

3. Start the app:

```bash
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Deploying to Vercel

This app is configured as a Vite SPA. For production deploys:

1. Create or link the Vercel project to this GitHub repo.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel project settings.
3. Deploy from the connected repository.

`vercel.json` includes an SPA rewrite so client-side routes like `/dashboard` and `/skin-quiz` work on refresh.
