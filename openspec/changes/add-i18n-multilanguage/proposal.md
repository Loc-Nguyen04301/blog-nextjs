## Why

The blog platform currently only supports Vietnamese, limiting its audience and making it hard to scale globally. Adding i18n with `next-i18next` enables the frontend to serve content in multiple languages (e.g., Vietnamese and English) with minimal friction for future language additions.

## What Changes

- Install and configure `next-i18next` (built on `i18next` + `react-i18next`) in the Next.js `client/`
- Add translation JSON files under `client/public/locales/{locale}/` for all UI strings
- Wrap the Next.js app with `appWithTranslation` HOC and configure `next-i18next.config.js`
- Replace all hardcoded UI strings across layouts, pages, and components with `useTranslation` hook calls
- Add a language-switcher UI component (dropdown or toggle) in the site header
- Persist the user's locale preference (cookie via `next-i18next` built-in or localStorage fallback)
- Support at minimum: `vi` (Vietnamese, default) and `en` (English)

## Capabilities

### New Capabilities

- `i18n-setup`: Configure next-i18next, locale routing, and translation file structure
- `i18n-language-switcher`: UI component for selecting and persisting the active locale
- `i18n-translations`: Translation namespace files covering all UI strings in the app

### Modified Capabilities

<!-- No existing spec-level behavior is changing — this is purely additive -->

## Impact

- **Frontend only** — no backend changes required
- **Dependencies added**: `next-i18next`, `i18next`, `react-i18next`
- **Files affected**: `client/next.config.js`, all layout/page components, header component
- **Routing**: `next-i18next` uses a cookie-based locale (no URL prefix by default) to avoid breaking existing routes
- **MUI theme**: no changes needed; MUI components use their own i18n separately if needed
