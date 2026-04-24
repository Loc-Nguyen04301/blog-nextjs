## 1. Install Dependencies

- [x] 1.1 Add `i18next`, `react-i18next`, and `i18next-browser-languagedetector` to `client/package.json` via yarn

## 2. i18n Configuration & Setup

- [x] 2.1 Create `client/i18n/config.ts` — initialize i18next with bundled `vi` and `en` resources, `languageDetector` (cookie → navigator), fallbackLng `vi`, namespace `common`
- [x] 2.2 Create `client/i18n/locales/vi/common.json` — Vietnamese translation strings covering nav, auth, blog, footer, and shared UI
- [x] 2.3 Create `client/i18n/locales/en/common.json` — English translations for every key in `vi/common.json`
- [x] 2.4 Create `client/components/I18nProvider.tsx` — `"use client"` wrapper that calls `i18n.init()` and renders `<I18nextProvider i18n={i18n}>{children}</I18nextProvider>`
- [x] 2.5 Update `client/app/layout.tsx` to import and render `<I18nProvider>` wrapping the app's children

## 3. Language Switcher Component

- [x] 3.1 Create `client/components/LanguageSwitcher.tsx` — MUI-based dropdown (`Select` + `MenuItem`) listing `VI` and `EN` options, calls `i18n.changeLanguage()` on selection
- [x] 3.2 Integrate `LanguageSwitcher` into the site header component (identify correct header file in `components/` or layout files and add the switcher)

## 4. Translate UI Strings — Navigation & Layout

- [x] 4.1 Replace hardcoded strings in the main header/navbar component with `t()` calls
- [x] 4.2 Replace hardcoded strings in the `Drawer.tsx` side menu component with `t()` calls
- [x] 4.3 Replace hardcoded strings in `Footer.tsx` with `t()` calls
- [x] 4.4 Replace hardcoded strings in the blog layout (`(groupBlog)/` layout files) with `t()` calls

## 5. Translate UI Strings — Auth Pages

- [x] 5.1 Replace hardcoded strings on the sign-in page with `t()` calls (labels, buttons, placeholders)
- [x] 5.2 Replace hardcoded strings on the sign-up page with `t()` calls
- [x] 5.3 Replace hardcoded strings in `ForgotPassword.tsx` with `t()` calls

## 6. Translate UI Strings — Blog & Content Pages

- [x] 6.1 Replace hardcoded strings in `BlogComponent.tsx` with `t()` calls
- [x] 6.2 Replace hardcoded strings on the blog list page with `t()` calls (pagination, headings, filters)
- [x] 6.3 Replace hardcoded strings on the blog detail page with `t()` calls
- [x] 6.4 Replace hardcoded strings in `VideoCommentComponent.tsx` with `t()` calls
- [x] 6.5 Replace hardcoded strings in `LoadingComponent.tsx` and `ErrorMessage.tsx` with `t()` calls

## 7. Translate UI Strings — Shared & Alert Components

- [x] 7.1 Replace hardcoded strings in `AlertComponent.tsx` with `t()` calls
- [x] 7.2 Replace hardcoded strings in `AuthNavLinks.tsx` with `t()` calls
- [x] 7.3 Review remaining components in `components/` for any missed hardcoded strings

## 8. Verification

- [ ] 8.1 Switch to English in the browser — verify all UI labels render in English with no raw translation keys visible
- [ ] 8.2 Refresh the page after switching to English — verify locale cookie persists and English renders on reload
- [ ] 8.3 Switch back to Vietnamese — verify all UI labels render correctly in Vietnamese
- [x] 8.4 Run `yarn build` in `client/` and confirm no TypeScript or build errors introduced by the i18n changes
