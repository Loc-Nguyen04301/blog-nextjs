## Why

The `/blog` page scores **72 on Lighthouse Performance**, falling into the "needs improvement" range. Core Web Vitals issues (LCP, TBT, CLS) degrade user experience and hurt search ranking. Addressing these now prevents them compounding as content grows.

## What Changes

- Add `next/image` optimization with proper `sizes`, `priority`, and lazy-loading attributes across blog thumbnails and the video page
- Implement `next/font` for font loading (eliminate render-blocking Google Fonts)
- Add metadata API (`generateMetadata`) for dynamic Open Graph + Twitter Card tags on blog detail and video pages
- Add `sitemap.ts` and `robots.ts` for crawlability
- Apply dynamic `import()` with `ssr: false` for heavy client-only components (ReactQuill, audio player) to reduce main-thread blocking time (TBT)
- Add `<link rel="preconnect">` hints for external origins in root layout
- Set proper `Cache-Control` headers on static assets via `next.config.js`

## Capabilities

### New Capabilities

- `image-optimization`: Replace `<img>` tags with `next/image` across blog/video pages with correct `sizes`, `priority`, `placeholder` attributes
- `font-optimization`: Load fonts via `next/font/google` instead of `<link>` tags to eliminate render-blocking
- `metadata-seo`: Add `generateMetadata()` to blog detail and video pages; add `sitemap.ts` and `robots.ts` to app root
- `code-splitting`: Dynamic import heavy client components (ReactQuill editor, audio player) with `ssr: false`

### Modified Capabilities

## Impact

- `client/app/` — root layout, blog detail page, video page
- `client/components/` — blog card, video card, any component rendering `<img>` tags
- `client/next.config.js` — image domains, headers config
- No backend changes required
- No new npm dependencies (all features are built into Next.js 14)
