## ADDED Requirements

### Requirement: Heavy client-only components use dynamic import
Any component that is large, client-only, and not needed on initial render SHALL be imported with `next/dynamic` and `ssr: false` to reduce main-thread blocking time (TBT).

#### Scenario: Audio player does not block initial page render
- **WHEN** the blog layout page renders
- **THEN** the audio player component SHALL be dynamically imported so it does not contribute to the initial JS bundle parsed on main thread

#### Scenario: Dynamic components show a loading fallback
- **WHEN** a dynamically imported component is loading
- **THEN** a skeleton or `null` fallback SHALL be shown instead of a layout shift or blank space

### Requirement: preconnect hints for external origins
The root layout `<head>` SHALL include `<link rel="preconnect">` tags for any external origins used by images or media (e.g., the API server's image host).

#### Scenario: Preconnect hint present for image CDN
- **WHEN** the page HTML is rendered
- **THEN** a `<link rel="preconnect" href="..." crossOrigin="anonymous">` SHALL be present in `<head>` for the primary image origin used by blog thumbnails
