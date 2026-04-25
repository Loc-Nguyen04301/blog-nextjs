## 1. Session Storage Utility

- [x] 1.1 Add `getRecentSearches()` helper — reads and parses `sessionStorage["recentSearches"]` with SSR guard (`typeof window !== "undefined"`)
- [x] 1.2 Add `saveRecentSearch(keyword: string)` helper — deduplicates, prepends, caps at 5, writes back to sessionStorage
- [x] 1.3 Add `removeRecentSearch(keyword: string)` helper — filters out the entry and writes back
- [x] 1.4 Add `clearRecentSearches()` helper — removes the key from sessionStorage

## 2. SearchBar Component — State & Logic

- [x] 2.1 Add local state `recentSearches: string[]` initialized from `getRecentSearches()` on mount
- [x] 2.2 Add local state `dropdownOpen: boolean` to control dropdown visibility
- [x] 2.3 On `onFocus` of the TextField, set `dropdownOpen = true` if history is non-empty
- [x] 2.4 On `onBlur` of the TextField, close dropdown after a short delay (to allow click events on dropdown items to fire first)
- [x] 2.5 Update `onKeyDown` Enter handler to call `saveRecentSearch(searchTextTrim)` before navigating, then refresh `recentSearches` state

## 3. SearchBar Component — Dropdown UI

- [x] 3.1 Add a MUI `Popper` anchored to the TextField that renders when `dropdownOpen && recentSearches.length > 0`
- [x] 3.2 Inside the Popper, render a `Paper` > `List` with one `ListItem` per recent search
- [x] 3.3 Each `ListItem` has a `ListItemButton` that on click sets `searchText` to the keyword and navigates to `/blog?search=<keyword>`, then closes the dropdown
- [x] 3.4 Each `ListItem` has an `IconButton` with a delete icon; on click it calls `removeRecentSearch(keyword)`, updates `recentSearches` state, and stops propagation
- [x] 3.5 Add a "Clear all" `Button` at the bottom of the list; on click calls `clearRecentSearches()`, resets `recentSearches` state to `[]`, and closes dropdown

## 4. Verification

- [ ] 4.1 Manually test: submit a search → refresh page in same tab → reopen search → history appears
- [ ] 4.2 Manually test: submit duplicate keyword → it moves to the top, no duplicate
- [ ] 4.3 Manually test: submit 6 keywords → only 5 appear in the list
- [ ] 4.4 Manually test: click a recent search → input populates and navigation occurs
- [ ] 4.5 Manually test: delete single entry → removed from list and sessionStorage
- [ ] 4.6 Manually test: "Clear all" → list empties, sessionStorage key removed

