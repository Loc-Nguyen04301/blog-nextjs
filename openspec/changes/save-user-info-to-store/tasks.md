## 1. Backend — Return user info from login

- [x] 1.1 In `server/src/auth/auth.service.ts`, update `login()` to also select `id`, `email`, `username` from the user record and return `{ ...tokens, user: { id, email, username } }`
- [x] 1.2 In `server/src/auth/auth.controller.ts`, update the `login()` handler to pass `user` through in the response body alongside `accessToken`

## 2. Frontend — Types

- [x] 2.1 In `client/types/auth.ts`, add `UserInfo` type `{ id: string; email: string; username: string | null }`
- [x] 2.2 In `client/types/auth.ts`, add `user: UserInfo` field to the `AuthTokens` type

## 3. Frontend — Extend auth-store

- [x] 3.1 In `client/zustand/stores/auth-store.ts`, add `UserInfo` interface and extend `AuthState` with `user: UserInfo | null` (default `null`), `setUser(info: UserInfo)`, and `clearUser()` actions

## 4. Frontend — AuthService wiring

- [x] 4.1 In `client/services/AuthService.ts`, after `setAuthTokens()` in `login()`, call `useAuthStore.getState().setUser(response.data.user)`
- [x] 4.2 In `client/services/AuthService.ts`, inside `logout()`, call `useAuthStore.getState().clearUser()` before or after `clearAuthTokens()`
