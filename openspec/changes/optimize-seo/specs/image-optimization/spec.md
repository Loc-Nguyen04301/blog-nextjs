## ADDED Requirements

### Requirement: Blog card uses next/image
All blog thumbnail images rendered in list views SHALL use `next/image` instead of raw `<img>` elements, with explicit `width`, `height`, and `alt` attributes.

#### Scenario: Blog card renders optimized image
- **WHEN** the blog list page loads
- **THEN** each blog card thumbnail SHALL be rendered as a `next/image` component with `loading="lazy"`, responsive `sizes`, and no layout shift

#### Scenario: Above-fold blog thumbnail loads eagerly
- **WHEN** a blog card is the first visible item on screen
- **THEN** its image SHALL have `priority={true}` to avoid LCP penalty

### Requirement: Video card uses next/image
Video thumbnail images on the video list page SHALL use `next/image` with `fill` layout inside a positioned wrapper, replacing raw `<img>` elements.

#### Scenario: Video card thumbnail renders without CLS
- **WHEN** the video list page loads
- **THEN** each video thumbnail container SHALL have a fixed aspect ratio via `position: relative` wrapper and `fill` on the `next/image` component

### Requirement: Blog detail page uses next/image
The blog detail page (`/blog/[id]`) SHALL render the post thumbnail with `next/image` using `priority={true}` and appropriate `sizes`.

#### Scenario: Detail page hero image loads as LCP candidate
- **WHEN** a user navigates to a blog detail page
- **THEN** the hero/thumbnail image SHALL render with `priority={true}` so the browser preloads it as the LCP element

### Requirement: Home and About pages use next/image
Any `<img>` tags on the home page (`/`) and about page (`/gioi-thieu`) SHALL be replaced with `next/image` components.

#### Scenario: Profile/about image is optimized
- **WHEN** the about page renders
- **THEN** the author photo SHALL be a `next/image` with explicit dimensions and `alt` text
