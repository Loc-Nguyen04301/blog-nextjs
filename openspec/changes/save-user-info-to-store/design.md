## Context

The login endpoint (`POST /api/v1/auth/login`) currently returns only `{ accessToken }`. The refresh token goes into an HttpOnly cookie. There is no client-side store for user identity — components cannot know the logged-in user's name or id without decoding the JWT or making an extra request.

## Goals / Non-Goals

**Goals:**
- Return user info (`id`, `email`, `username`) from the login endpoint
- Extend `auth-store` with user info fields for the session lifetime
- Populate the store on login, clear it on logout

**Non-Goals:**
- Persisting user info across sessions (localStorage / cookie)
- Fetching user info on page refresh (out of scope; store resets on reload)
- Role/permission management

## Decisions

### 1. Return user info from backend login, not decode JWT on client

**Chosen:** Modify `auth.service.ts login()` to also return `{ id, email, username }` from the DB user record.

**Alternatives considered:**
- *Decode JWT on client* — JWT payload already contains `userId` and `email`, but not `username`. Decoding also couples the client to JWT structure and adds a dependency (`jwt-decode`). Rejected.
- *Call `/user/me` after login* — an extra round-trip and more complex error handling. Rejected.

### 2. Extend `auth-store`, not create a separate `user-store`

**Chosen:** Add `user: UserInfo | null`, `setUser`, and `clearUser` to the existing `client/zustand/stores/auth-store.ts`.

**Alternatives considered:**
- *Create a separate `user-store`* — adds a new file and indirection for data that is tightly coupled to auth lifecycle (login sets it, logout clears it). Rejected in favour of co-location.

### 3. Store is in-memory only (no persistence)

User info is cleared on page reload. `auth-store` already re-initializes `isLoggedIn` from `localStorage` via `initAuthStore` on mount — user info will be `null` until next login, which is acceptable since it is display-only for now.

## Risks / Trade-offs

- **Store is stale after profile update** — if the user's `username` changes elsewhere, the store won't reflect it. → Mitigation: out of scope for now; add a `refreshUser` action if needed later.
- **username can be null** — the `User` model allows `username` to be optional. → Store type marks it as `string | null`; components handle `null` gracefully (fall back to email).

## Migration Plan

1. Deploy backend change (login returns `user` field) — fully additive, no breaking change for existing clients that ignore extra fields.
2. Deploy frontend changes — `AuthService.login` reads and stores the new `user` field.
3. No rollback concerns; reverting either side independently leaves the other unaffected.
