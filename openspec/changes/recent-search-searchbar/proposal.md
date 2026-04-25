## Why

Users searching for blogs repeatedly retype the same keywords, creating unnecessary friction. Persisting recent searches in `sessionStorage` lets users re-run past queries with one click, improving search UX without requiring a backend change.

## What Changes

- Add a recent-search dropdown to `SearchBar.tsx` that appears on input focus
- Save each submitted search keyword to `sessionStorage` (max 5 entries, deduplicated)
- Display recent searches as clickable chips/items; clicking one populates and submits the search
- Clear individual entries or all recent searches

## Capabilities

### New Capabilities

- `recent-search`: Persists recent search keywords in sessionStorage and renders them in the SearchBar dropdown on focus

### Modified Capabilities

- (none)

## Impact

- **File**: `client/components/SearchBar.tsx` — UI and logic changes
- **Storage**: `sessionStorage` key `recentSearches` (array of strings, max 5)
- **No API changes** — purely client-side
- **No new dependencies** — uses existing MUI components
