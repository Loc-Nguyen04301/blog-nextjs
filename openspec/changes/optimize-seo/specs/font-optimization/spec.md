## ADDED Requirements

### Requirement: Font variable applied to root layout
The `lato` font from `fonts/index.ts` SHALL have its CSS variable applied to the `<html>` element via `className={lato.variable}` in `app/layout.tsx`, and `var(--font-lato)` SHALL be set as the `fontFamily` on `<body>`.

#### Scenario: Lato font loads without render-blocking
- **WHEN** the root layout renders
- **THEN** the `<html>` element SHALL have the `lato.variable` class applied so `--font-lato` is available globally and fonts load via Next.js font optimization (no external stylesheet request)

#### Scenario: Body text uses the optimized font
- **WHEN** a page body renders
- **THEN** body text SHALL inherit `fontFamily: "var(--font-lato)"` from the `<body>` element's inline style or a CSS rule applied in root layout

### Requirement: No render-blocking font link tags
The root layout SHALL NOT contain `<link>` tags pointing to `fonts.googleapis.com` or any other external font CDN.

#### Scenario: No external font requests in HTML head
- **WHEN** the page HTML is rendered
- **THEN** there SHALL be no `<link rel="stylesheet">` tags loading fonts from external domains in the `<head>`
