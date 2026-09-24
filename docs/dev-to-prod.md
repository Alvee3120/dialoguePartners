# Dev → Production runbook

Two Cloudflare accounts (dev + prod), two Postgres databases, one codebase.
Nothing here requires re-uploading files or editing links.

## What moves, and how

| Thing | Source of truth | How it reaches production |
| --- | --- | --- |
| Pages, copy, people, pillars, values | `src/data/*.ts`, components (git) | Deploy the code |
| Images / video / logos | R2 **public assets** bucket | `npm run assets:sync` |
| Job posts | Postgres `jobs` table | `npm run content:export` → `content:import` |
| Applications | Postgres `applications` | **Never copied** — per-environment |
| Admin user | Postgres `admin_users` | `npm run db:seed` per environment |

## How links stay stable

Asset references in the data are **object keys**, not URLs:

```ts
image: asset("climet.jpg");
```

`asset()` prefixes `NEXT_PUBLIC_R2_BASE_URL`, so the same key resolves to the
dev bucket in development and the prod bucket in production. The sync copies
objects **under identical keys**, so nothing needs rewriting.

Full URLs still pass through `asset()` untouched, so pasting a complete R2 URL
continues to work.

## Environment variables

Each environment gets its own `.env` (dev uses `.env.local`):

```bash
NEXT_PUBLIC_R2_BASE_URL=https://pub-<hash>.r2.dev   # this env's asset origin

DATABASE_URL=postgres://…                            # this env's database

R2_ACCOUNT_ID=…                                      # private bucket: CV uploads
R2_ACCESS_KEY_ID=…
R2_SECRET_ACCESS_KEY=…
R2_BUCKET=dialogue-partners-cvs

# Only needed where you run the sync (your machine)
R2_DEV_ACCOUNT_ID=…   R2_DEV_ACCESS_KEY_ID=…   R2_DEV_SECRET_ACCESS_KEY=…   R2_DEV_BUCKET=…
R2_PROD_ACCOUNT_ID=…  R2_PROD_ACCESS_KEY_ID=…  R2_PROD_SECRET_ACCESS_KEY=…  R2_PROD_BUCKET=…
```

Both R2 tokens need **Object Read & Write** on their bucket (read includes
`ListObjectsV2`, which the sync uses).

> Prefer custom domains over `r2.dev`: `r2.dev` is Cloudflare's rate-limited,
> non-production host. A custom domain per bucket (`assets.dialoguepartners.com`,
> `assets-dev.…`) makes `NEXT_PUBLIC_R2_BASE_URL` permanent, so links survive even
> a change of storage provider.

## First-time production setup

```bash
# 1. Point at production
export DATABASE_URL=postgres://…        # prod database
export NEXT_PUBLIC_R2_BASE_URL=https://… # prod asset origin

# 2. Schema
npm run db:migrate

# 3. Admin account
SEED_ADMIN_EMAIL=you@dialoguepartners.com SEED_ADMIN_PASSWORD='…' npm run db:seed

# 4. Job posts from the exported file
npm run content:import

# 5. Assets dev → prod (dry run first)
npm run assets:sync -- --dry-run
npm run assets:sync

# 6. Build and run
npm run build && npm run start
```

## Ongoing releases

```bash
npm run content:export      # refresh content/jobs.json from dev, commit it
npm run assets:sync -- --dry-run
npm run assets:sync         # copy new/changed objects only
# deploy, then on the server:
npm run db:migrate && npm run content:import
```

## Safety notes

- `assets:sync` is a **dry run unless you pass `--write`**.
- `cv/` is always excluded — candidate CVs stay in the environment they were
  submitted to. Pass `--exclude <prefix>` to skip anything else.
- `--delete` mirrors deletions and removes target objects. It's off by default.
- `content:import` upserts **by slug**, so re-running it is safe; it will not
  create duplicates. It never touches `applications`.
