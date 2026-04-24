## ADDED Requirements

### Requirement: Language switcher is visible on all pages
The system SHALL display a language switcher component in the site header/navigation so users can change the active locale from any page.

#### Scenario: Switcher shows current locale
- **WHEN** the user views any page
- **THEN** the language switcher SHALL display the currently active locale label (e.g., "VI" or "EN")

#### Scenario: Switcher lists available locales
- **WHEN** the user opens the language switcher
- **THEN** the system SHALL display all supported locales (`vi` and `en`) as selectable options

### Requirement: Selecting a locale changes the UI language immediately
The system SHALL update all translated UI strings on the page without a full page reload when the user selects a different locale.

#### Scenario: User switches from Vietnamese to English
- **WHEN** the user selects "EN" from the language switcher
- **THEN** all UI strings SHALL re-render in English within the same page session

#### Scenario: User switches from English to Vietnamese
- **WHEN** the user selects "VI" from the language switcher
- **THEN** all UI strings SHALL re-render in Vietnamese within the same page session

### Requirement: Locale preference is persisted across sessions
The system SHALL save the user's locale selection to a cookie so that the same language is used on future visits.

#### Scenario: Returning user sees their last selected language
- **WHEN** a user selects "EN", closes the browser, and returns to the app
- **THEN** the app SHALL initialize with `en` locale without requiring the user to switch again

### Requirement: Language switcher uses MUI components
The system SHALL implement the language switcher using MUI v5 components (e.g., `Select`, `MenuItem`, or `IconButton` + `Menu`) consistent with the existing design system.

#### Scenario: Switcher renders with MUI styling
- **WHEN** the language switcher is rendered
- **THEN** it SHALL use MUI component primitives and respect the app's MUI theme (primary color `#C4AC99`)
