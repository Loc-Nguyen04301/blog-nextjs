## ADDED Requirements

### Requirement: Save search keyword to session history
When the user submits a search (presses Enter), the system SHALL save the trimmed keyword to `sessionStorage["recentSearches"]`. The list SHALL be capped at 5 entries. If the keyword already exists in the list, the system SHALL move it to the front instead of duplicating it. Empty strings SHALL NOT be saved.

#### Scenario: New keyword is saved
- **WHEN** the user presses Enter with a non-empty keyword
- **THEN** the keyword is prepended to the `recentSearches` list in sessionStorage

#### Scenario: Duplicate keyword is deduplicated
- **WHEN** the user submits a keyword that already exists in the history
- **THEN** the existing entry is removed and the keyword is prepended (moved to top)

#### Scenario: History is capped at 5
- **WHEN** the user submits a 6th unique keyword
- **THEN** the oldest entry (last in the array) is removed, keeping only 5 entries

#### Scenario: Empty string is not saved
- **WHEN** the user presses Enter with an empty or whitespace-only input
- **THEN** nothing is added to sessionStorage

### Requirement: Display recent searches on input focus
The system SHALL show a dropdown list of recent searches when the user focuses the search input, provided the history is non-empty.

#### Scenario: Dropdown appears on focus with history
- **WHEN** the input is focused and sessionStorage contains at least one recent search
- **THEN** a dropdown appears below the input listing the recent searches

#### Scenario: Dropdown does not appear with empty history
- **WHEN** the input is focused and sessionStorage contains no recent searches
- **THEN** no dropdown is shown

### Requirement: Re-run a recent search
The system SHALL allow the user to click a recent search entry to populate the input and navigate to the corresponding blog search results page.

#### Scenario: Click recent search entry
- **WHEN** the user clicks a recent search item in the dropdown
- **THEN** the input value is set to that keyword and the router navigates to `/blog?search=<keyword>`

### Requirement: Remove individual recent search entry
The system SHALL provide a delete icon on each recent search entry. Clicking it SHALL remove only that entry from the history.

#### Scenario: Remove single entry
- **WHEN** the user clicks the delete icon on a recent search entry
- **THEN** that entry is removed from the dropdown and from sessionStorage

### Requirement: Clear all recent searches
The system SHALL provide a "Clear all" action in the dropdown. Activating it SHALL remove all entries from the history and close the dropdown.

#### Scenario: Clear all entries
- **WHEN** the user clicks "Clear all"
- **THEN** sessionStorage["recentSearches"] is emptied and the dropdown closes
