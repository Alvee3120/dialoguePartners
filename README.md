# Dialogue Partners

Website for **Dialogue Partners** — a consultancy and ecosystem catalyst for
Bangladesh's RMG (Ready-Made Garments) sector.

> Tagline: **Connecting Through Conversation**

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Production checks: `npm run build` and `npm run lint`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — overview of each section, linking out |
| `/about` | Who We Are + values + core motto |
| `/pillars` | Insight — the five pillars overview |
| `/pillars/[slug]` | Per-pillar detail page with service / area-of-work breakdown |
| `/people` | Advisor directory with profile cards |
| `/people/[slug]` | Individual advisor page (about, experience, photos) |
| `/contact` | Contact page |

## Project structure

```
src/
  app/                  # routes (layout + pages)
  components/
    site/               # header, footer, shared site chrome
    shared/             # reusable blocks (cards, grids, CTA band)
    home/               # home page section blocks
  data/                 # site info, pillars, people (edit copy here)
public/
  images/               # real photos go here — see public/images/README.md
```

## Editing copy

- Contact details, tagline: `src/data/site.ts`
- Five Insight pillars (titles, taglines, service breakdowns): `src/data/corePillars.ts`
- Team / advisors (names, bios, experience, socials): `src/data/people.ts`
- Job posts: managed in the admin panel at `/admin` (create the first admin with `npm run db:seed`)

## Assets & environments

Images, video and logos live on Cloudflare R2 and are referenced by **object key**
through `asset()` (`src/lib/assets.ts`); the origin comes from
`NEXT_PUBLIC_R2_BASE_URL`. The same data therefore works against the dev and
production accounts with no link changes. Promoting content and assets between
environments is covered in [docs/dev-to-prod.md](docs/dev-to-prod.md).

## Image placeholders

Every photo on the site is a labelled placeholder box that states the exact
filename it expects. The full mapping — which photo goes where, in which crop —
is documented in `public/images/README.md`.

## Roadmap (incremental)

- [x] Multi-page structure: home overview + About, Insight, pillar detail, People, profile, Contact
- [ ] Real photography swapped into placeholders
- [ ] Real advisor profiles filled into `people.ts`
- [ ] Contact form
- [ ] Refine design (colours, typography, motion)
