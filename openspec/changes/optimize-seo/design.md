## Context

The `/blog` page scores 72 on Lighthouse Performance. Current issues:
- Raw `<img>` tags throughout blog/video/home pages — no lazy loading, no width/height, no responsive sizing (causes CLS and LCP issues)
- `fonts/index.ts` defines `next/font/google` (Lato) but the CSS variable `--font-lato` is never applied to `<body>` or `<html>` in `layout.tsx`, making the font load useless — the body falls back to system fonts on first paint
- `sitemap.ts` and `robots.ts` use placeholder `acme.com` URLs instead of the real domain
- No `generateMetadata()` on blog detail or video detail pages — Open Graph tags are missing

## Goals / Non-Goals

**Goals:**
- Replace raw `<img>` with `next/image` in all content-facing components
- Apply the already-configured `lato` font variable to `<html>` and `<body>` in root layout
- Fix `sitemap.ts` and `robots.ts` to use the real domain and real blog slugs
- Add `generateMetadata()` to blog `[id]` page and video `[id]` page for per-page OG tags
- Target: Performance score 85+ on `/blog` Lighthouse audit

**Non-Goals:**
- Server-side rendering changes (no SSR conversion of client components)
- Bundle splitting / dynamic imports (ReactQuill is not used on public pages; audio player is already in Context)
- CDN or infrastructure changes
- New npm packages

## Decisions

### Decision 1: `next/image` over raw `<img>`

`next/image` handles lazy loading, WebP conversion, responsive `srcSet`, and reserves layout space (prevents CLS). The `next.config.js` already allows all remote patterns so no config change needed.

Each image needs explicit `width` / `height` (or `fill` + `sizes`) to avoid layout shift.

**Alternative considered**: `loading="lazy"` on `<img>` — avoids CLS partially but doesn't do WebP conversion or responsive sizing, so rejected.

### Decision 2: Apply font variable in layout.tsx

The font is already loaded via `next/font` — it just needs `className={lato.variable}` on `<html>` and `style={{ fontFamily: "var(--font-lato)" }}` on `<body>`. Zero cost change.

**Alternative considered**: Use `className={lato.className}` directly — simpler, but `--font-lato` variable is already referenced in `theme.ts`, so the variable approach maintains consistency.

### Decision 3: Fix sitemap + robots with real domain

Replace `acme.com` with `locnguyenwriter.com` (or the production domain). Extend `sitemap.ts` to fetch blog slugs from the API so crawlers index all posts.

### Decision 4: `generateMetadata()` on detail pages

Blog `[id]` and video `[id]` pages already fetch data server-side; the same fetch can populate `title`, `description`, `openGraph.images` for per-page metadata. No additional API calls needed.

## Risks / Trade-offs

- **CLS during migration** → Use explicit `width`/`height` or `fill` on all `next/image` replacements; missing dimensions will cause a build warning but not a crash.
- **Sitemap API fetch on build** → If the API is down at build time, `sitemap.ts` must catch and return static fallback URLs.
- **`fill` layout images need a positioned parent** → Any `<img>` used inside a flex/grid card will need a wrapper `<div style={{ position: "relative" }}>`.

## Migration Plan

1. Apply font variable in `layout.tsx` (zero risk, instant win)
2. Fix `sitemap.ts` / `robots.ts` domain
3. Replace `<img>` with `next/image` component by component (blog card → video card → detail pages → home → about)
4. Add `generateMetadata()` to blog `[id]` and video `[id]`
5. Run Lighthouse before/after each group to validate improvement
6. Rollback: revert individual file changes — no DB migration, no infra change
