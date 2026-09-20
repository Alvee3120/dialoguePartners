# Image guide

Images are served from `public/images/`. To swap in your own photography, drop
a file at the listed path with the same filename — the layout, sizing, and
styling are already wired up. Keep filenames as-is so nothing breaks.

> Note: the current files are placeholder/stock images pulled in for now. Replace
> them with your real photos whenever ready.

## Home page

| Where used | File path | Current image | What to swap in |
| --- | --- | --- | --- |
| Who We Are / About section | `public/images/home/who-we-are.jpg` | Business handshake (stock) | Consultants in discussion, or an aerial view of a modern RMG facility (portrait 4:5) |

> The hero background uses a looping video (`https://pub-...r2.dev/consultancy loop.mp4`)
> — replace the URL in `src/components/home/Hero.tsx` if you have a new clip.

## About page

| Where used | File path | Current image | What to swap in |
| --- | --- | --- | --- |
| Hero collage (left) | `public/images/home/who-we-are.jpg` | Business handshake (stock) | Reuses the home image |
| Hero collage (centre) | `public/images/about/factory-floor.jpg` | Placeholder | A modern RMG production floor (portrait 4:5) |
| Hero collage (right) | `public/images/about/dialogue-session.jpg` | Placeholder | A dialogue session between brands and manufacturers (portrait 4:5) |
| Our Work band | `public/images/about/what-we-do.jpg` | Placeholder | The team convening brands, manufacturers and technology partners (wide 16:9) |

## Insight pages (the five pillars)

Each pillar's image is used on the home card, the `/pillars` index card, and
that pillar's own detail page. The offering now has **five** pillars — Social was
added and Responsible Business Conduct moved under it.

| Pillar | File path | Current image | Suggested crop |
| --- | --- | --- | --- |
| Sustainability | `public/images/insights/solar-2.jpg` | Solar panels (stock) | Wide 16:9 / 21:9 |
| Investment & Trade | `public/images/insights/port-harbor.jpg` | Container port (stock) | Wide 16:9 / 21:9 |
| RMG Supply Chain | `public/images/insights/logistics-warehouse.jpg` | Logistics warehouse (stock) | Wide 16:9 / 21:9 |
| Operational Excellence | `public/images/insights/factory-3.jpg` | Engineering/automation lab (stock) | Wide 16:9 / 21:9 |

## Clients

The home "Trusted by" strip. Only **H&M** is confirmed so far, and its logo has
not been supplied yet — drop each logo at the listed path and set `logo` in
`src/data/clients.ts` to start rendering it.

| Client | File path | Status |
| --- | --- | --- |
| H&M | `public/images/clients/hm.svg` | Confirmed — logo not supplied |
| — | `public/images/clients/client-2.svg` | Open slot |
| — | `public/images/clients/client-3.svg` | Open slot |
| — | `public/images/clients/client-4.svg` | Open slot |

## People pages

| Where used | File path | Current image |
| --- | --- | --- |
| Advisor headsheets | `public/images/people/advisor-1.jpg` … `-3.jpg` | Remote R2 URLs (teamlead*.jpg) |
| Profile action photos | `public/images/people/advisor-N-extra-*.jpg` | Placeholders |

The three advisor headshots currently pull from remote URLs defined in
`src/data/people.ts` (`teamlead.jpg`, `teamlead2.jpeg`, `teamlead3.jpg`). To use
local files instead, download them into `public/images/people/` and change
`imagePath` in the data to the local `/images/...` path.

## Notes

- `public/` is served at the site root, so `/images/home/hero.jpg` maps to
  `public/images/home/hero.jpg`.
- Every placeholder that has no image yet prints its intended filename, so the
  mapping is visible while browsing.