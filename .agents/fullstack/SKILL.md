---
name: fullstack
description: Build fullstack features in a single Next.js (App Router) JavaScript project — spanning UI, Route Handlers, Server Actions, and/or DB. Not for pure UI (use frontend skill) or external API servers (use backend skill).
license: MIT
---

> Read `.agents/software-principles/SKILL.md` first.

## Pre-Code Checklist

1. Map data flow: origin (DB / external API / form input)
2. Mutation strategy: Server Action (form/page-tied) vs. Route Handler (REST/webhook)
3. Auth requirement at every server entry point
4. All four UI states: loading · error · empty · ideal

## Server/Client Boundary

| Need                    | Solution                                         | Location                        |
| ----------------------- | ------------------------------------------------ | ------------------------------- |
| Fetch + render data     | `async` Server Component                         | `app/**/page.jsx`               |
| Form / page mutation    | Server Action `'use server'`                     | `app/**/actions.js`             |
| REST endpoint / webhook | Route Handler                                    | `app/api/**/route.js`           |
| Interactivity / hooks   | Client Component `'use client'` — push to leaves | `components/`                   |
| Auth + route guard      | Middleware                                       | `middleware.js`                 |
| Shared business logic   | Services / utilities                             | `lib/` · `services/` · `utils/` |

Extensions: `.jsx` for JSX · `.js` everything else.

## UI Layer

Apply all rules from frontend skill. Key additions:

- Pass only serializable, non-sensitive data as props to Client Components
- Wrap slow `async` Server Components in `<Suspense>`
- `error.jsx` must be `'use client'`
- `redirect()` throws — never call inside `try/catch`

## Server Actions (`app/**/actions.js`)

File must start with `'use server'`. Required order:

1. Validate input
2. Check auth/session
3. Call service layer — no business logic inline
4. `revalidatePath()` or `revalidateTag()` after mutation
5. Return typed result — follow project convention for shape

## Route Handlers (`app/api/**/route.js`)

Follow existing response shape convention. If none, pick one and apply consistently. Never mix shapes across handlers.

Required regardless of shape: success/error distinguishable · validation errors include field-level detail · no stack traces or internal paths exposed.

Handler order: validate input → auth check → service call → return envelope.

## Data Layer (`lib/db.js` · `services/*.js`)

- All DB access in service layer — never inline in handlers or components
- Connection pooling always on. Parameterized queries or ORM — no string SQL
- `unstable_cache()` or `cache()` for expensive repeated reads
- `revalidateTag()` preferred over `revalidatePath()` for precision

## Security (non-negotiable)

- Auth check first in every Server Action and Route Handler — before any logic
- `middleware.js` guards routes via `cookies()` or token check
- Secrets server-only — never `NEXT_PUBLIC_` for sensitive values
- Parameterized queries. Hash passwords (bcrypt/argon2)
- Rate-limit auth and mutation-heavy endpoints

## Never Do

- DB queries or secrets in Client Components / `NEXT_PUBLIC_` vars
- Trust unvalidated input in actions or handlers
- Sensitive data as Client Component props (exposed in JS bundle)
- Business logic inline in route handlers or page components
- Skip any of the four UI states
