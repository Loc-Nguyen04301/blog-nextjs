## ADDED Requirements

### Requirement: Translation files exist for all supported locales
The system SHALL provide a `common.json` translation file for each supported locale (`vi` and `en`) under `client/i18n/locales/{locale}/common.json`.

#### Scenario: Vietnamese translation file is complete
- **WHEN** the app runs with `vi` locale
- **THEN** every UI string key used via `useTranslation` SHALL resolve to a Vietnamese string (no raw keys shown)

#### Scenario: English translation file covers all keys
- **WHEN** the app runs with `en` locale
- **THEN** every UI string key used via `useTranslation` SHALL resolve to an English string

### Requirement: All hardcoded UI strings are replaced with translation keys
The system SHALL use `useTranslation` hook from `react-i18next` in every component that displays user-facing text, replacing all hardcoded strings with `t('key')` calls.

#### Scenario: Navigation strings are translated
- **WHEN** the user views the site header or drawer navigation
- **THEN** menu items, links, and nav labels SHALL display in the active locale

#### Scenario: Auth page strings are translated
- **WHEN** the user visits the sign-in or sign-up page
- **THEN** form labels, button text, placeholders, and validation messages SHALL display in the active locale

#### Scenario: Blog listing strings are translated
- **WHEN** the user visits the blog list page
- **THEN** section headings, pagination labels, and UI controls SHALL display in the active locale

#### Scenario: Footer strings are translated
- **WHEN** the user views the footer
- **THEN** all footer text SHALL display in the active locale

### Requirement: Translation keys follow a consistent naming convention
The system SHALL use dot-notation namespaced keys in the format `<section>.<element>` (e.g., `nav.home`, `auth.signIn`, `blog.readMore`) for all translation entries.

#### Scenario: Key structure is hierarchical
- **WHEN** a developer reads a translation JSON file
- **THEN** keys SHALL be grouped by UI section as nested JSON objects (e.g., `{ "nav": { "home": "Trang chủ" } }`)
