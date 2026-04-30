---
name: backend
description: Design and generate external backend API code (any language/framework: Go, Rust, Python, PHP, JavaScript, Ruby, etc.) that serves a Next.js JSX frontend. Use for API endpoints, auth, validation, and data modeling on a separate backend server.
license: MIT
---

## Pre-Code Analysis

Before writing, identify: resource/action, request→response contract, auth requirement, failure scenarios, and validation needs.

## Response Envelope (always consistent)

- Success: `{ success: true, data: <payload>, message: "OK", error: null }`
- Error: `{ success: false, data: null, message: "<summary>", error: { code: "<CODE>", details: [{field, message}] } }`

## HTTP Status Codes

| Situation                   | Code                           |
| --------------------------- | ------------------------------ |
| GET/PUT/PATCH success       | 200                            |
| POST created                | 201                            |
| DELETE success              | 204                            |
| Validation failure          | 422 + field-level details      |
| Missing/invalid auth        | 401                            |
| Authenticated but forbidden | 403                            |
| Duplicate/conflict          | 409                            |
| Rate limited                | 429                            |
| Unexpected server error     | 500 (no stack trace to client) |

## Design Rules

**Endpoints** — plural nouns, kebab-case: `/posts`, `/post-categories`. Query params: `page`, `limit`, `sort`, `filter[key]=value`.

**Auth** — JWT or opaque token via `Authorization: Bearer <token>`, or HTTP-only cookie if same parent domain.

**Pagination** — all list endpoints return `{ items, pagination: { page, limit, totalItems, totalPages } }` inside `data`.

**CORS** — exact frontend origin only (`http://localhost:3000` dev, exact domain prod). Never `*` with credentials.

**Validation** — validate all input at boundary before any processing. Return 422 with `error.details` array.

**Naming** — pick camelCase or snake_case for fields; be consistent throughout the project.

**Docs** — expose OpenAPI spec at `/api/docs` or `/openapi.json` when feasible.

## Security (non-negotiable)

- Secrets via env vars only, never hardcoded.
- Parameterized queries/ORM — no string concatenation for DB queries.
- Hash passwords (bcrypt/argon2 or language equivalent).
- Rate limit auth endpoints (login, register, password reset).
- Limit request body size (e.g., 1MB).
- Security headers (X-Frame-Options, CSP) in production.
- HTTPS enforced in production.

## Architecture

- Route handlers are thin — business logic in service/use-case layer.
- Global error handler catches all unexpected errors, returns safe 500.
- DB connection pooling. Async/non-blocking I/O where the language supports it.
- Cache read-heavy data (Redis or in-memory) where appropriate.

## Never Do

- Expose stack traces, DB errors, or internal details to client.
- Trust unvalidated input or hardcode secrets.
- Skip pagination on list endpoints.
- Use wildcard CORS `*` with credentials.
- Put business logic directly in route handlers.
