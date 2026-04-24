## 1. Font Optimization

- [x] 1.1 In `client/app/layout.tsx`, import `lato` from `@/fonts` and add `className={lato.variable}` to `<html>` and `style={{ fontFamily: "var(--font-lato)" }}` to `<body>`
- [x] 1.2 Verify no `<link>` tags pointing to `fonts.googleapis.com` exist in any layout file

## 2. Fix Sitemap and Robots

- [x] 2.1 Update `client/app/robots.ts` — replace `acme.com` with `locnguyenwriter.com` in the sitemap URL
- [x] 2.2 Update `client/app/sitemap.ts` — replace placeholder `acme.com` URLs with real production domain URLs
- [x] 2.3 Extend `client/app/sitemap.ts` to fetch published blog list from API and include each post URL with `lastModified`, wrapped in try/catch to fall back to static routes on failure

## 3. Image Optimization — Blog Components

- [x] 3.1 In `client/components/BlogComponent.tsx`, replace `<img>` with `next/image`, add `width`, `height` (or `fill` + positioned wrapper), and `alt`
- [x] 3.2 Add `priority={true}` to the first blog card image (above-fold LCP candidate)
- [x] 3.3 In `client/app/(groupBlog)/(commonBlogLayout)/blog/[id]/DetailBlogPageClientSide.tsx`, replace hero `<img>` with `next/image` and `priority={true}`

## 4. Image Optimization — Video Components

- [x] 4.1 In `client/app/(groupBlog)/video/VideoListPage.tsx`, wrap each video thumbnail in a `position: relative` container and replace `<img>` with `next/image fill`
- [x] 4.2 In `client/components/VideoCommentComponent.tsx`, replace any `<img>` with `next/image`

## 5. Image Optimization — Home and About Pages

- [x] 5.1 In `client/app/(homeLayout)/page.tsx`, replace `<img>` with `next/image`
- [x] 5.2 In `client/app/(groupBlog)/gioi-thieu/page.tsx`, replace `<img>` with `next/image` with explicit `width`/`height` and descriptive `alt`
- [x] 5.3 In `client/app/(groupBlog)/layout.tsx`, replace any `<img>` with `next/image`
- [x] 5.4 In `client/components/groupBlogLayout/AboutMe.tsx`, replace `<img>` with `next/image`
- [x] 5.5 In `client/components/AudioPlayer/components/TrackInfo.tsx`, replace `<img>` with `next/image`
- [x] 5.6 In `client/components/ContactSocialMedia.tsx`, replace `<img>` with `next/image`

## 6. Per-Page Metadata (SEO)

- [x] 6.1 Add `generateMetadata({ params })` to `client/app/(groupBlog)/(commonBlogLayout)/blog/[id]/page.tsx` — fetch blog post and return `title`, `description`, `openGraph.images`
- [x] 6.2 Add `generateMetadata({ params })` to `client/app/(groupBlog)/video/[id]/page.tsx` — return video title and thumbnail as OG image

## 7. Preconnect Hints

- [x] 7.1 In `client/app/layout.tsx`, add `<link rel="preconnect" href="http://103.101.163.17:8000" />` (API/image origin) inside a `<head>` tag

## 8. Verify

- [x] 8.1 Run `yarn build` in `client/` and confirm no TypeScript or next/image dimension errors
- [ ] 8.2 Run Lighthouse on `/blog` page in production build — target Performance ≥ 85
- [ ] 8.3 Confirm `/sitemap.xml` and `/robots.txt` return correct domain and blog URLs
