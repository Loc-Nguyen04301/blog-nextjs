const STORAGE_KEY = "recentSearches";
const MAX_ENTRIES = 5;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveRecentSearch(keyword: string): void {
  if (typeof window === "undefined") return;
  const trimmed = keyword.trim();
  if (!trimmed) return;
  const current = getRecentSearches().filter((k) => k !== trimmed);
  const updated = [trimmed, ...current].slice(0, MAX_ENTRIES);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function removeRecentSearch(keyword: string): void {
  if (typeof window === "undefined") return;
  const updated = getRecentSearches().filter((k) => k !== keyword);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
