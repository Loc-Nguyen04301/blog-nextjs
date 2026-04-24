## Why

Currently the login API only returns an `accessToken` — user information (id, email, username) is never stored on the client. Components that need to display or act on user identity have no source of truth in client state, forcing repeated JWT decoding or extra API calls.

## What Changes

- Backend `login` endpoint returns `user: { id, email, username }` alongside `accessToken`
- `auth-store` extended with `user: UserInfo | null`, `setUser` and `clearUser` actions
- `AuthService.login` saves the returned user info to `auth-store` after a successful login
- `AuthService.logout` calls `clearUser` to wipe user info from `auth-store` on logout
- `AuthTokens` type updated to include the `user` field

## Capabilities

### New Capabilities

- `auth-store-user-info`: `auth-store` extended to hold authenticated user information (id, email, username) for the duration of the session

### Modified Capabilities

- (none — no existing spec files to delta)

## Impact

- **Backend**: `auth.service.ts` `login()` — must also return `{ id, email, username }` from the user record
- **Backend**: `auth.controller.ts` `login()` — response body gains `user` field
- **Frontend**: `client/types/auth.ts` — `AuthTokens` type gains `user` field
- **Frontend**: `client/services/AuthService.ts` — `login()` saves user to store
- **Frontend**: `client/zustand/stores/auth-store.ts` — extended with `user`, `setUser`, `clearUser`
- No new dependencies required
