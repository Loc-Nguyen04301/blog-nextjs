# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

Full-stack blog platform:
- **Frontend**: Next.js 14 (App Router) — `client/`
- **Backend**: NestJS 11 (REST API) — `server/`
- **Database**: PostgreSQL via Prisma ORM
- **Cache**: Redis (blog query cache + BullMQ backend)
- **Queue**: BullMQ (email sending, Excel import)
- **Messaging**: RabbitMQ (infrastructure ready, partially wired)
- **Auth**: JWT (access token 15m Bearer + refresh token 7d HttpOnly cookie)

---

## Commands

### Client (run from `client/`)
```bash
yarn dev        # Dev server → http://localhost:3000
yarn build      # Production build
yarn lint       # ESLint via next lint
```

### Server (run from `server/`)
```bash
npm run dev         # Watch mode → http://localhost:8000
npm run build       # Compile TypeScript
npm run lint        # ESLint --fix
npm test            # Jest unit tests
npm run test:cov    # Coverage report
npm run test:e2e    # End-to-end tests (Supertest)
```

### Database (run from `server/`)
```bash
npx prisma migrate dev    # Apply migrations
npx prisma studio         # GUI browser for DB
npx prisma generate       # Regenerate Prisma client after schema change
```

### Docker
```bash
docker-compose up                                    # Dev (client + server + postgres)
docker-compose -f docker-compose.prod.yml up         # Production
```

---

## Architecture

### Backend (`server/src/`)

All routes are **protected by default** via a global `JwtAuthGuard`. Use `@Public()` to opt out.

| Module | Purpose |
|--------|---------|
| `auth/` | JWT login/register/refresh/logout. Refresh token hashed in DB, rotated on use. |
| `blog/` | CRUD, pagination, keyword search, category filter, monthly stats. `findAll` cached in Redis: key `findAll:{keyword}:{page}:{itemsPerPage}`, TTL 60s. |
| `category/` | CRUD + Excel bulk import via BullMQ (100 rows/batch). |
| `user/` | User lookup; used by JWT strategy. |
| `video/` | Video CRUD with many-to-many tags. |
| `log/` | Append-only activity log (userId, action, module, entityId, IP, user-agent). |
| `mail/` | Queues outgoing emails via `EmailQueue`. |
| `queue/` | BullMQ producers/processors: `CategoryQueue`, `EmailQueue`. |
| `rmq/` | RabbitMQ client/consumer (currently commented out in main.ts). |
| `prisma/` | Singleton `PrismaService`. |
| `common/` | Guards, decorators, strategies, interceptors, exception filters. |

All routes prefixed `/api/v1/`.

**Response shape** (enforced by `ResponseInterceptor`):
```json
{ "statusCode": 200, "message": "...", "data": {}, "path": "/api/v1/...", "timestamp": "..." }
```

### Frontend (`client/`)

Next.js App Router with two layout groups:

| Group | Routes |
|-------|--------|
| `(homeLayout)/` | Home page, sign-in, sign-up |
| `(groupBlog)/` | Blog list, blog detail, video, about, contact, menu |

| Layer | Purpose |
|-------|---------|
| `services/axios.ts` | Axios instance; auto-refreshes on 401 (deduped with Promise), retries original request |
| `services/` | `AuthService`, `BlogService`, `Category`, `VideoService` |
| `zustand/stores/` | `blog-store`, `category-store`, `alert-store` |
| `context/` | `audio-player-context` (React Context for audio player state) |
| `utils/authTokens.ts` | `getAccessToken()`, `setAuthTokens()`, `clearAuthTokens()` — localStorage with SSR guard |
| `hooks/` | `useFetchDataBlogLayout` — fetches categories + stats on blog layout mount |

### Database Models

```
User ──< Blog >──< Category (many-to-many via BlogCategories)
Video >──< VideoTag (many-to-many)
LogActivity (append-only)
```

Key fields:
- `User`: uuid PK, email (unique), bcrypt password, `hashedRefreshToken`, `active`
- `Blog`: uuid PK, title (unique), content, description, thumbnail, timestamps
- `Category`: autoincrement PK, name (unique)
- `LogActivity`: userId, action, module, entityId, ipAddress, userAgent

### Environment Variables

| File | Key Variables |
|------|--------------|
| `client/.env.local` | `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1` |
| `client/.env.production` | `NEXT_PUBLIC_API_URL=http://103.101.163.17:8000/api/v1` |
| `server/.env` | `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `PORT=8000` |
| `server/.env.production` | Same keys, production values; DB host = `postgres` (Docker service name) |

Redis default: `localhost:6379`. RabbitMQ default: `localhost:5672`.

---

## Coding Standards

### TypeScript
- **Server**: Strict-like; `any` is allowed but prefer typed interfaces in `common/types/`.
- **Client**: Loose; `any` allowed, `no-unused-expressions` off. Type interfaces live in `types/`.
- Unused variables must be prefixed with `_` on the server (ESLint enforced).

### Naming Conventions
- **Files**: kebab-case (`jwt-auth.guard.ts`, `blog-store.ts`)
- **Classes**: PascalCase
- **DTOs**: PascalCase + `Dto` suffix (e.g. `CreateBlogDto`)
- **Interfaces/Types**: PascalCase (e.g. `JwtSignTokenPayload`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g. `QUEUE_NAMES`)

### Formatting (Prettier)
- **Server**: double quotes, trailing commas everywhere, `endOfLine: auto`
- **Client**: follows `next/core-web-vitals` + prettier

### Comments
- Write comments only when the **why** is non-obvious. No docblock walls.

### API Design
- All endpoints under `/api/v1/`
- Read endpoints on public resources use `@Public()` (e.g. GET /blog)
- Protected write endpoints rely on global `JwtAuthGuard` — do not add redundant `@UseGuards`
- Use `@CurrentUser()` to access the authenticated user in controllers

---

## Architecture Decisions

### Auth Strategy
- Access token (15m) in `Authorization: Bearer` header, stored in localStorage.
- Refresh token (7d) in HttpOnly cookie scoped to `/api/v1/auth/refresh`.
- Refresh tokens are **hashed** before DB storage; plain token never persisted.
- On each refresh call the token is **rotated** — old token invalidated, new one issued.
- Client-side: single retry with deduped refresh (axios interceptor) prevents race conditions.

### Caching
- Redis cache via `@nestjs/cache-manager` + `ioredis`.
- Only `blog.findAll` is currently cached. Cache key: `findAll:{keyword}:{page}:{itemsPerPage}`, TTL 60s.
- When writing to blog (create/update/delete), manually invalidate affected cache keys.

### Queue Processing
- BullMQ backed by Redis (`QueueCoreModule` with `localhost:6379`).
- Do **not** do heavy synchronous work in controller handlers — offload to a queue.
- Excel import: processor reads file, inserts 100 rows/batch with `skipDuplicates: true`.
- Email sending: processor sends via Nodemailer; never block the request thread.

### State Management (Client)
- **Zustand**: app-wide data (blogs, categories, alerts/loading state).
- **React Context**: scoped stateful resources (audio player).
- Do not use React Context for data that crosses many unrelated components — use Zustand.

### Response Format (Server)
- Always apply `@ResponseInterceptor("your message")` at controller class level.
- Never manually shape `{ statusCode, message, data }` in service layers — let the interceptor handle it.

### Error Handling
- Server throws `HttpException` (or NestJS built-ins like `NotFoundException`); the global `HttpExceptionFilter` catches and formats errors.
- Client errors surface via `alert-store` (`addError()`).

---

## Preferred Libraries

### Backend
| Purpose | Library |
|---------|---------|
| Framework | NestJS 11 + Express |
| ORM | Prisma 6 |
| Auth | `@nestjs/jwt`, `passport-jwt`, `bcrypt` |
| Cache | `@nestjs/cache-manager` + `ioredis` |
| Queue | `@nestjs/bullmq` + `bullmq` |
| Messaging | `amqplib`, `amqp-connection-manager` |
| Email | Nodemailer 8 |
| File parsing | `xlsx` (Excel), `multer` (uploads) |
| Validation | `class-validator`, `class-transformer` |
| Testing | Jest + Supertest + `@nestjs/testing` |

### Frontend
| Purpose | Library |
|---------|---------|
| Framework | Next.js 14 (App Router) |
| UI | MUI v5 (Material UI) + Emotion |
| State | Zustand 5 |
| HTTP | Axios 1.7 |
| Forms | Formik + Yup |
| Rich text editor | `react-quill` |
| Linting/formatting | ESLint + Prettier + Husky (pre-commit) |

**Do not introduce new UI libraries** without discussion — MUI is the design system. Do not use Chakra, Radix, shadcn, etc.

---

## Code Review Checklist

### General
- [ ] No logic in controllers beyond request parsing and calling service methods
- [ ] DTOs used for all request bodies; `class-validator` decorators applied
- [ ] No raw SQL unless absolutely necessary (use Prisma query API)
- [ ] Sensitive data (passwords, tokens) never logged or returned in responses

### Auth & Security
- [ ] New public endpoints explicitly decorated with `@Public()`
- [ ] Protected endpoints rely on global guard — no duplicate `@UseGuards(JwtAuthGuard)`
- [ ] No JWT secrets or credentials committed to the repo
- [ ] Refresh token hashed before DB write; plain token never stored

### Caching
- [ ] Cache invalidated on writes that affect cached queries
- [ ] Cache keys are deterministic and include all query variables

### Queues
- [ ] Heavy/async tasks offloaded to BullMQ — not blocking the request thread
- [ ] Processor handles failures gracefully (no unhandled promise rejections)

### Frontend
- [ ] All API calls go through the Axios service layer (`services/`), not raw `fetch`
- [ ] Loading and error states managed via `alert-store`
- [ ] Access token accessed only via `authTokens.ts` helpers (not direct `localStorage` calls)
- [ ] No sensitive data stored outside HttpOnly cookies or in-memory state

### TypeScript
- [ ] Avoid `any` where a proper type is derivable
- [ ] New shared types added to `common/types/` (server) or `types/` (client)

### Testing (Server)
- [ ] Unit tests for new service methods
- [ ] E2E test updated if new public endpoint added
- [ ] Tests do not rely on `any`-cast hacks to bypass types

---

## Key File Map

```
server/src/
  main.ts                      # Bootstrap, global guard, CORS, cookie-parser
  common/guards/               # JwtAuthGuard (global), JwtRefreshGuard
  common/decorators/           # @Public(), @CurrentUser(), @ResponseInterceptor()
  common/interceptors/         # ResponseInterceptor (standard response shape)
  common/exception-filters/    # HttpExceptionFilter (global error handler)
  common/strategies/           # JwtStrategy (Bearer), JwtRefreshStrategy (cookie)
  prisma/prisma.service.ts     # DB singleton — inject this, not PrismaClient directly
  queue/queue.constants.ts     # QUEUE_NAMES, JOB_NAMES — use these, not raw strings
  blog/blog.service.ts         # Redis caching logic lives here

client/
  services/axios.ts            # Axios instance + 401 auto-refresh interceptor
  utils/authTokens.ts          # Only place to read/write access token
  zustand/stores/alert-store.ts # All UI loading/error state
  app/theme.ts                 # MUI theme — primary color #C4AC99
```
