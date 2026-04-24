## ADDED Requirements

### Requirement: i18next is initialized before the React tree renders
The system SHALL initialize i18next with bundled translation resources synchronously so that translated strings are available on the first render without async loading delays.

#### Scenario: App loads with default Vietnamese locale
- **WHEN** a user visits the app for the first time (no locale cookie set)
- **THEN** the app SHALL render all UI strings in Vietnamese

#### Scenario: App loads with previously selected English locale
- **WHEN** a user visits the app and a `i18next` locale cookie is set to `en`
- **THEN** the app SHALL render all UI strings in English without a flash of Vietnamese text

### Requirement: I18nProvider wraps the application
The system SHALL provide an `I18nProvider` client component that initializes i18next and wraps the application's component tree via `app/layout.tsx`.

#### Scenario: Provider is present in root layout
- **WHEN** any page in the application renders
- **THEN** the `I18nextProvider` context SHALL be available to all child components

### Requirement: Supported locales are vi and en
The system SHALL support exactly two locales: `vi` (Vietnamese, default) and `en` (English).

#### Scenario: Fallback to default locale for missing keys
- **WHEN** a translation key exists in `vi` but is missing in `en`
- **THEN** the system SHALL display the Vietnamese string as a fallback instead of showing a raw key
