# pageler-software.de

Personal website of Christoph Pageler, iOS developer. It is a business card,
not a blog and not a marketing site: one short statement on the home page,
everything else on its own page.

The visual design is already settled. It exists as static HTML in
`docs/prototype/`. That folder is the reference implementation — match it,
do not reinvent it. It is reference only and is never built or deployed.

## Stack

- Astro, static output only. No SSR, no client-side framework.
- Plain CSS in one global stylesheet. No Tailwind, no CSS-in-JS.
- Content in Markdown via Astro content collections.
- Deployed to GitHub Pages from `main` via GitHub Actions.

## Commands

```
npm install
npm run dev      # local preview
npm run build    # static output to dist/
npm run preview  # serve the built output
```

## Routes

```
/                       src/pages/index.astro          hero + subtitle only
/about                  src/pages/about.astro
/apps                   src/pages/apps/index.astro     list of all apps
/apps/[slug]            generated from src/content/apps/{slug}/index.md
/apps/[slug]/privacy    generated from src/content/apps/{slug}/privacy.md
/contact                src/pages/contact.astro
/legal-notice           src/pages/legal-notice.astro
/privacy                src/pages/privacy.astro
```

## Content model

One folder per app under `src/content/apps/`:

```
src/content/apps/
  app-slug/
    index.md      frontmatter + description body
    privacy.md    that app's privacy policy
    icon.png
    screenshots/
```

Frontmatter on `index.md`:

```yaml
name: "App Name"
slug: "app-slug"          # must never change once the app is live
tagline: "One sentence."
appStoreUrl: "https://apps.apple.com/..."
platforms: ["iPhone", "iPad"]
minimumOS: "iOS 18"
price: "Free, one-time unlock"
version: "1.2.0"
releaseDate: 2026-03-01
status: "released"        # released | in-progress
order: 1
```

Adding an app means creating that folder. It must never require touching a
template. If it does, the template is wrong — fix the template.

## Hard rules

- **Never change an app's `slug` once the app is on the App Store.** Its
  privacy policy URL is submitted to App Store Connect and must stay valid
  forever. If an app is renamed, keep the old slug.
- **Fonts are self-hosted** from `public/fonts/`, never loaded from Google
  Fonts or any other third party. Loading them remotely transmits visitor IP
  addresses and creates a GDPR disclosure obligation. The prototype uses the
  Google CDN purely for convenience — do not carry that over.
- **Site language is English. `/legal-notice` and `/privacy` stay in German**,
  because they address German users and authorities. The nav/footer link
  label is the English "Legal Notice", but the page content itself (headings,
  body text) stays German — same pattern as the "Privacy" label pointing to
  the German-language `/privacy` page.
- No analytics, no tracking scripts, no cookie banner. If something would
  require a cookie banner, it does not go on this site.
- No JavaScript unless a feature genuinely cannot work without it. Right now
  nothing does.
- Every page works at 320px width, has visible keyboard focus, and respects
  `prefers-reduced-motion`.

## Design tokens

Dark, technical, quiet. Defined once as CSS custom properties:

```css
--bg:    #131619   /* page */
--panel: #191D21   /* block background */
--edge:  #282E33   /* borders, 1px */
--text:  #DFE2E1   /* body */
--dim:   #7C8489   /* secondary, labels, meta */
--live:  #8FBFAE   /* links, active status */
--idle:  #B9A77E   /* unfinished, pending status */
```

- Body: DM Sans, 16px, line-height 1.65.
- Labels, meta, table rows, status values: DM Mono.
- Two weights only, 400 and 500. Never 600 or 700.
- Block panels: `border-radius: 10px`, 1px `--edge` border, `--panel` fill.
- Content column: `max-width: 44rem`, centred.
- Block headings are lowercase mono in `--dim`. This is deliberate and is the
  one place lowercase is used — everything else is sentence case.
- Status dots are 7px circles: `--live` for shipped or running, `--idle` for
  in progress.
- No gradients, no shadows, no hover animations beyond link underlines.

## Copy rules

- Plain sentences, first person, no marketing language. Never "seamless",
  "powerful", "effortless", "unlock".
- The home page is one headline and one subtitle. Resist adding anything.
- App descriptions are written for someone who has never heard of the app,
  not for someone comparing feature lists.
- Sentence case in headings and links. No ALL CAPS labels, no "→" appended to
  link text.
