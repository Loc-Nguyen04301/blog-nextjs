## ADDED Requirements

### Requirement: Login response includes user information
The backend login endpoint SHALL return a `user` object containing `id`, `email`, and `username` alongside the `accessToken`.

#### Scenario: Successful login returns user info
- **WHEN** a valid email and password are submitted to `POST /api/v1/auth/login`
- **THEN** the response body SHALL include `{ accessToken, user: { id, email, username } }`

#### Scenario: username is null when not set
- **WHEN** the user account has no username configured
- **THEN** the `user.username` field SHALL be `null` (not omitted)

---

### Requirement: auth-store holds authenticated user info
The frontend `auth-store` SHALL be extended with state `user: UserInfo | null` (default `null`) and actions `setUser(info: UserInfo)` and `clearUser()`.

#### Scenario: Store is empty before login
- **WHEN** the application loads and no login has occurred
- **THEN** `auth-store` state `user` SHALL be `null`

#### Scenario: Store is populated after login
- **WHEN** `AuthService.login()` succeeds
- **THEN** `useAuthStore.getState().setUser()` SHALL be called with the user info from the API response

#### Scenario: Store is cleared after logout
- **WHEN** `AuthService.logout()` is called
- **THEN** `useAuthStore.getState().clearUser()` SHALL be called, setting `user` back to `null`
