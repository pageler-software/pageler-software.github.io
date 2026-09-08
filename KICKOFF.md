# First prompt for Claude Code

Paste this into Claude Code in the repo root. Do it in three passes rather
than one — review after each.

## Pass 1 — scaffold and port

```
Read CLAUDE.md, then look at every file in docs/prototype/.

Set up an Astro project in this repo with static output, following the routes
and content model in CLAUDE.md. Port the prototype's design into it:
- one global stylesheet in src/styles/global.css using the tokens from CLAUDE.md
- a BaseLayout.astro with the site header and footer from the prototype
- the pages: index, about, apps index, contact, imprint, privacy
- a content collection "apps" with the schema from CLAUDE.md, plus the two
  dynamic routes /apps/[slug] and /apps/[slug]/privacy
- one placeholder app in src/content/apps/ so both dynamic routes render

Self-host DM Sans and DM Mono in public/fonts/ with @font-face and
font-display: swap. Do not load them from Google Fonts.

Then run the build and fix anything that fails.
```

## Pass 2 — deploy

```
Add .github/workflows/deploy.yml using the official withastro/action to build
and deploy to GitHub Pages on every push to main.

Set `site` in astro.config.mjs to https://www.pageler-software.de and create
public/CNAME containing that hostname. No `base` setting is needed because the
repository is named <org>.github.io.

Also add public/robots.txt and generate a sitemap with @astrojs/sitemap.
```

Then in the repo on GitHub: Settings → Pages → Source: **GitHub Actions**.

## Pass 3 — migrate the old URLs

```
The previous Webflow site had these paths, which are indexed by search
engines: /about, /contact, /legal-notice.

/about and /contact already exist. Create a redirect from /legal-notice to
/imprint. GitHub Pages cannot do server-side redirects, so use an Astro page
that emits a canonical link and a meta refresh.
```

## Once it's live

Verify in this order, so the old site stays up until the new one works:

1. The GitHub Actions run is green and the site loads at
   `pageler-software.github.io`.
2. Add the DNS records at your registrar:
   - `CNAME` for `www` → `pageler-software.github.io`
   - `A` for the apex `@` → 185.199.108.153, 185.199.109.153,
     185.199.110.153, 185.199.111.153
3. In Settings → Pages, set the custom domain and wait for the certificate,
   then enable "Enforce HTTPS".
4. Only now point the domain away from Webflow.

## Then, in order

- Real app names, taglines and slugs. Fix the slugs before any App Store
  submission points at them.
- App icons and screenshots.
- The imprint and privacy content. Both are placeholders and legally yours.
- Decide whether a photo of you goes on /about.
