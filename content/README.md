# `content/`

Portable exports of database-backed content (currently job posts), so the same
data can be promoted between environments without retyping it.

- `jobs.json` — produced by `npm run content:export`, committed so promotions
  are reviewable and diffable.

## Commands

```bash
# Dump the jobs from whatever DATABASE_URL points at
npm run content:export

# Upsert content/jobs.json into whatever DATABASE_URL points at (idempotent,
# matched on slug)
npm run content:import
npm run content:import -- path/to/other.json
```

Deliberately **not** included: `applications` (per-environment, personal data)
and `admin_users` (created per environment with `npm run db:seed`).
