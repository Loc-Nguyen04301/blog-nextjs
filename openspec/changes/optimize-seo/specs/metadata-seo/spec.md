## ADDED Requirements

### Requirement: Blog detail page has per-post metadata
The blog detail page (`app/(groupBlog)/(commonBlogLayout)/blog/[id]/page.tsx`) SHALL export a `generateMetadata()` function that returns post-specific `title`, `description`, and `openGraph` fields using the blog post data.

#### Scenario: Blog post has unique title and description
- **WHEN** a user visits `/blog/[id]`
- **THEN** the HTML `<title>` SHALL contain the blog post's title and `<meta name="description">` SHALL contain the post description

#### Scenario: Blog post has Open Graph image
- **WHEN** a crawler visits `/blog/[id]`
- **THEN** `og:image` SHALL be set to the blog post's thumbnail URL

### Requirement: Video detail page has per-video metadata
The video detail page (`app/(groupBlog)/video/[id]/page.tsx`) SHALL export a `generateMetadata()` function with video-specific title and description.

#### Scenario: Video page has unique OG tags
- **WHEN** a user shares a video page URL
- **THEN** the link preview SHALL show the video title and thumbnail via `og:title` and `og:image`

### Requirement: Sitemap includes real blog URLs
`app/sitemap.ts` SHALL fetch published blog slugs/IDs from the API and return a complete `MetadataRoute.Sitemap` using the production domain (`locnguyenwriter.com`), not placeholder values.

#### Scenario: Sitemap contains blog post URLs
- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** it SHALL receive entries for all published blog posts with their real URLs and `lastModified` timestamps

#### Scenario: Sitemap handles API failure gracefully
- **WHEN** the blog API is unreachable during sitemap generation
- **THEN** the sitemap SHALL return at minimum the static pages (home, blog list, video, about) without crashing

### Requirement: Robots.txt uses real domain
`app/robots.ts` SHALL use the real production domain in `sitemap` field, not `acme.com`.

#### Scenario: Robots.txt points to correct sitemap
- **WHEN** a crawler requests `/robots.txt`
- **THEN** the `Sitemap:` directive SHALL point to `https://locnguyenwriter.com/sitemap.xml`
