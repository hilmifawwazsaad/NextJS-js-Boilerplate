---
name: fullstack
description: Build fullstack features inside a single Next.js (App Router) JSX project — where the same codebase handles both UI and server logic. Use when the task spans Server Components, Route Handlers, Server Actions, and/or database access together. Not for pure UI work (use frontend skill) or external API servers (use backend skill).
license: MIT
---

## Pre-Code Analysis

Before writing, identify: server vs. client boundary, data origin (DB/API), mutation strategy (Server Action vs. Route Handler), auth requirement, and all states to handle.

## Server/Client Boundary

| Need                                 | Use                                                   |
| ------------------------------------ | ----------------------------------------------------- |
| Fetch & render data                  | `async` Server Component                              |
| Mutation tied to a page/form         | Server Action (`'use server'`) in `app/**/actions.js` |
| REST endpoint / webhook / public API | Route Handler (`app/api/**/route.js`)                 |
| Interactivity, hooks, browser APIs   | Client Component (`'use client'`) — push to leaves    |
| Shared logic                         | `lib/`, `services/`, `utils/`                         |

## Frontend Rules

- Default to Server Components; pass data as props to Client Components.
- `'use client'` only for `useState`, `useEffect`, event listeners, browser APIs.
- Wrap heavy async server components in `<Suspense>` with a fallback.
- All files with JSX use `.jsx`; hooks and utilities use `.js`.
- All four states required: loading (`loading.jsx`/Suspense), error (`error.jsx`), empty, not-found (`not-found.jsx`).
- `next/image` for images, `next/font` for fonts. Existing design tokens only.

## Backend Rules

**Route Handlers** — consistent JSON envelope:

- Success: `{ success: true, data: <payload>, message: "OK", error: null }`
- Error: `{ success: false, data: null, message: "<summary>", error: { code: "<CODE>", details: [{field, message}] } }`
- HTTP codes: 200/201/204 success · 422 validation · 401 unauth · 403 forbidden · 409 conflict · 500 server error (no stack trace)

**Server Actions** — return plain serializable objects (`{ success, data?, error?, errors? }`). Call `revalidatePath`/`revalidateTag` after mutations.

**Data layer** — DB access in `lib/db.js` or `services/*.js`. Connection pooling always. Parameterized queries or ORM — no string concatenation.

**Validation** — validate all input on server before any processing. Return 422 with `error.details` array for Route Handlers; return `{ success: false, errors }` for Server Actions.

## Security (non-negotiable)

- Secrets server-only — never `NEXT_PUBLIC_` for sensitive values.
- Always verify session/auth in Server Actions and Route Handlers before processing.
- Route protection via `middleware.js` using `cookies()` or token check.
- Parameterized queries only. Hash passwords (bcrypt/argon2).
- Rate limit sensitive endpoints.

## Never Do

- Run DB queries or use secrets in Client Components or `NEXT_PUBLIC_` vars.
- Trust unvalidated input from Server Actions or Route Handlers.
- Use `useEffect` for data fetching when a Server Component works.
- Pass sensitive data as props to Client Components (exposed in JS bundle).
- Skip any of the four states (loading/error/empty/not-found).
- Invent design tokens or break folder conventions.
- Put business logic directly in route handlers or page components.
