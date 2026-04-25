## Context

`SearchBar.tsx` (`client/components/groupBlogLayout/SearchBar.tsx`) currently reads `searchText` from Zustand and navigates to `/blog?search=<keyword>` on Enter. There is no history of past queries. The fix is purely client-side, requiring no backend or state-management changes.

## Goals / Non-Goals

**Goals:**
- Persist up to 5 recent searches in `sessionStorage["recentSearches"]`
- Show a dropdown of recent searches when the input is focused
- Let users re-run a past search by clicking it (populates input + navigates)
- Let users remove a single entry or clear all entries
- Deduplicate: submitting an existing keyword moves it to the top

**Non-Goals:**
- Syncing history across browser tabs or sessions (sessionStorage is tab-local by design)
- Server-side personalization or analytics on search history
- Adding a new Zustand store or custom hook — keep logic local to the component

## Decisions

### 1. sessionStorage over localStorage
Recent searches are session-scoped (tab lifetime). Using `sessionStorage` avoids accumulating stale history across visits and aligns with the ephemeral nature of a search session.

*Alternative*: `localStorage` — rejected because it persists indefinitely and crosses sessions, which is more than needed.

### 2. Local component state over Zustand
The recent-search list is only consumed by `SearchBar`. There is no cross-component need. Adding it to Zustand would be over-engineering.

*Alternative*: Zustand `blog-store` — rejected to avoid polluting global state with UI-local data.

### 3. MUI Popper/Paper dropdown (no Autocomplete)
Using MUI `Popper` + `Paper` + `List` gives a lightweight dropdown anchored below the input without the opinionated behavior of `Autocomplete` (which also conflicts with the existing controlled input pattern).

*Alternative*: `Autocomplete` — rejected because it would require refactoring the existing `TextField` + Zustand binding and adds unneeded behavior (filtering, keyboard cycling).

### 4. Max 5 entries, LIFO order
New searches are prepended. If the list exceeds 5, the oldest is dropped. This keeps the UI compact and the most relevant entries at the top.

## Risks / Trade-offs

- `sessionStorage` is unavailable in SSR — wrap reads/writes in a `typeof window !== "undefined"` guard since Next.js can render server-side.
- Clicking a recent-search chip closes the dropdown and triggers navigation; if the user had typed a partial keyword, it is overwritten.

## Migration Plan

No migration needed — additive change to a single component. Old sessions simply start with an empty history.
