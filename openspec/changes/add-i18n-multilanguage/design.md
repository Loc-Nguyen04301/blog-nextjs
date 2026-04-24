## Context

The blog platform is a Next.js 14 App Router application (`client/`) with MUI v5, Zustand, and Axios. All UI text is currently hardcoded in Vietnamese. There is no i18n infrastructure. The backend (`server/`) is NestJS and does not need changes — i18n is a pure frontend concern for UI strings.

The `next-i18next` library is the standard choice for Next.js i18n; it wraps `i18next` and `react-i18next` and provides SSR-compatible translation loading via `serverSideTranslations`.

**Constraint**: The project uses the Next.js **App Router** (`app/`), not the Pages Router. `next-i18next` is natively designed for Pages Router. We need a compatible approach.

## Goals / Non-Goals

**Goals:**
- Support Vietnamese (`vi`, default) and English (`en`) in the frontend UI
- Allow users to switch languages at runtime via a header component
- Persist language choice across sessions (cookie)
- Structure translation files so adding more languages later is trivial
- Keep existing routes unchanged (no `/en/...` URL prefix)

**Non-Goals:**
- Translating blog post content (that is user-generated content stored in DB)
- Backend API i18n or error message translation
- RTL language support
- MUI component locale adaptation (dates, number formats) — deferred

## Decisions

### Decision 1: Use `i18next` + `react-i18next` directly (not `next-i18next`)

**Choice**: Use `i18next` + `react-i18next` + `i18next-browser-languagedetector` + `i18next-resources-to-backend` directly, without the `next-i18next` wrapper.

**Why**: `next-i18next` is built for the **Pages Router** and relies on `getStaticProps`/`getServerSideProps` patterns that don't exist in App Router. Using the lower-level libraries directly gives full control and is the recommended approach for App Router projects per the i18next and Next.js docs.

**Alternative considered**: `next-intl` — a popular App Router-native i18n library. Rejected because it requires URL-based locale prefixes (`/en/...`, `/vi/...`) by default, which would break existing routes and bookmarks.

**Alternative considered**: Keeping `next-i18next` with a compatibility shim — overly complex and poorly maintained for App Router.

### Decision 2: Client-side only translation (no SSR translation loading)

**Choice**: Initialize i18next on the client side. Translation JSON files are bundled or fetched as static assets from `public/locales/`.

**Why**: Blog content is dynamic; the static UI shell (nav, buttons, labels) doesn't require SSR for SEO. Client-side translation avoids the complexity of RSC-compatible server translation. The app already defers data fetching to the client via Axios.

**Trade-off**: First render may flash untranslated strings for ~1 frame before i18next initializes. Mitigated by setting `fallbackLng: 'vi'` and initializing i18next before the React tree renders (in a provider wrapper).

### Decision 3: Cookie-based locale persistence

**Choice**: Use `i18next-browser-languagedetector` configured to detect from `cookie` first, then `navigator` (browser default), then fall back to `vi`.

**Why**: Cookies survive hard refreshes and new tabs. localStorage would also work but cookies are slightly more reliable across browser contexts and align with how `next-i18next` works.

### Decision 4: Translation namespace structure

**Choice**: Use a single `common` namespace for all UI strings, with possible future split into `blog`, `auth`, `nav` namespaces.

**Why**: The app is not large enough to justify multiple namespaces now. A single `common.json` per locale is easy to maintain. Namespace splitting is easy to do later without breaking existing keys.

### Decision 5: Language switcher placement

**Choice**: Add a `LanguageSwitcher` component to the site header/drawer. Use an MUI `Select` or `IconButton + Menu` with flag or text labels (`VI` / `EN`).

**Why**: Consistent with the existing MUI design system. Placed in the global nav so it's accessible from all pages.

## Risks / Trade-offs

- **Flash of untranslated content (FOUC)**: i18next initializes async. → Mitigation: initialize synchronously with bundled resources (import JSON directly) rather than fetching from `public/`.
- **Missing translation keys**: A key missing in `en` will fall back to `vi` silently. → Mitigation: add ESLint `i18next` plugin or TypeScript typed keys in a follow-up.
- **Bundle size**: Importing all translation JSONs increases initial JS bundle slightly. → Acceptable for the scale of this app; lazy loading per namespace can be added later if needed.
- **App Router provider wrapping**: `react-i18next`'s `I18nextProvider` must wrap Client Components. Since `app/layout.tsx` must remain a Server Component, the provider needs to live in a `"use client"` wrapper component. → Mitigation: create an `I18nProvider` client component that wraps `{children}` and is imported into the root layout.

## Migration Plan

1. Install dependencies: `i18next`, `react-i18next`, `i18next-browser-languagedetector`
2. Create `client/i18n/config.ts` — i18next initialization with bundled resources
3. Create translation files: `client/i18n/locales/vi/common.json` and `client/i18n/locales/en/common.json`
4. Create `client/components/I18nProvider.tsx` — client-side provider wrapper
5. Update `client/app/layout.tsx` to include `<I18nProvider>`
6. Translate all hardcoded UI strings across layouts, pages, and components
7. Add `LanguageSwitcher` component to the header
8. Test both locales; verify cookie persistence

**Rollback**: Remove the provider from `layout.tsx` and revert string changes. No DB or API changes to undo.

## Open Questions

- Should blog post metadata (title, description in listing) show translated placeholders when the content language differs from UI language? → **Deferred; out of scope for this change.**
- Should MUI's `LocalizationProvider` locale also be switched? → **Deferred; no date pickers currently in use.**
