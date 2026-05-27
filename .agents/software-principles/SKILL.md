---
name: software-principles
description: Engineering principles for all code in this Next.js JavaScript project. Required reading before any code generation.
license: MIT
---

## Pre-Code Checklist

1. One reason to change? If not — split (SRP)
2. Simpler solution, same outcome? — use it (KISS)
3. Building for a future need that doesn't exist? — delete it (YAGNI)
4. Name reveals intent without generic words (`and`, `data`, `info`, `manager`, `handle`)? If not — rethink design

## Principles

| Principle                            | Rule                              | Violation Signal                                   | Fix                                         |
| ------------------------------------ | --------------------------------- | -------------------------------------------------- | ------------------------------------------- |
| **SRP** — Single Responsibility      | One unit, one reason to change    | `"and"` in name · file > 200 lines · fn > 20 lines | Split into focused units                    |
| **OCP** — Open/Closed Principle      | Extend without modifying existing | Adding variant by editing component internals      | Variant props · composition · new component |
| **DIP** — Dependency Inversion       | Depend on abstractions            | `new ConcreteService()` hardcoded inside logic     | Inject dependencies                         |
| **Composition > Inheritance**        | Compose via hooks/props           | Class chains                                       | Props + custom hooks                        |
| **DRY** — Don't Repeat Yourself      | One source of truth per logic     | Copy-paste logic across files                      | Extract to shared fn/module                 |
| **KISS** — Keep It Simple, Stupid    | Simplest correct solution         | Unnecessary abstraction · deep indirection         | Remove layers · flatten                     |
| **YAGNI** — You Aren't Gonna Need It | Build only what's needed now      | Unused params · "might need later" code            | Delete it                                   |
| **SoC** — Separation of Concerns     | Each module owns one concern      | UI + fetch + logic in one file                     | Separate layers (page · hook · util)        |
| **LoD** — Law of Demeter             | Talk only to direct collaborators | `a.b.c.method()` chains                            | Add intermediate method                     |
| **Fail Fast**                        | Surface errors at earliest point  | Silent catch · late validation                     | Validate at boundaries · throw early        |
| **SSOT** — Single Source of Truth    | One authoritative place per logic | Same validation in multiple layers                 | Centralize · import everywhere              |

## Naming

Names must reveal intent. Generic names destroy readability.

| Concept    | Pattern                 | Good                                           | Bad                                     |
| ---------- | ----------------------- | ---------------------------------------------- | --------------------------------------- |
| Functions  | verb phrase             | `getUserById`, `validateEmail`, `hashPassword` | `handle`, `process`, `doStuff`, `run`   |
| Booleans   | `is`/`has`/`can` prefix | `isActive`, `hasPermission`, `canDelete`       | `active`, `flag`, `check`, `status`     |
| Variables  | noun, specific          | `userId`, `paginatedUsers`, `hashedPassword`   | `data`, `result`, `info`, `temp`, `val` |
| Components | PascalCase noun         | `UserCard`, `AuthGuard`, `ModalOverlay`        | `usercard`, `myComponent`, `Comp1`      |
| Hooks      | `use` + verb phrase     | `useAuth`, `useFetchUser`, `useFormValidation` | `authHook`, `userData`, `myHook`        |
| Files      | `[domain].[layer].js`   | `user.service.js`, `auth.middleware.js`        | `utils2.js`, `misc.js`, `helpers.js`    |

No abbreviations except: `id`, `req`, `res`, `err`, `ctx`. No single-letter names outside loop counters. Name length proportional to scope.

## Function Design

| Rule                  | Limit                   | When exceeded                                |
| --------------------- | ----------------------- | -------------------------------------------- |
| Single responsibility | One action per function | Split into smaller functions                 |
| Length                | ≤ 20 lines              | Extract inner logic to named helper          |
| Parameters            | ≤ 3                     | Group into options object                    |
| Nesting               | ≤ 2 levels deep         | Extract or use early return (guard clause)   |
| Return paths          | Prefer single exit      | Guard clauses at top, one `return` at bottom |

## Applied to This Project

| Principle | Concrete example                                                                          |
| --------- | ----------------------------------------------------------------------------------------- |
| SRP       | `UserCard` renders one user — fetch lives in `useUser` hook, not the component            |
| SoC       | Pages fetch · UI components render · hooks own logic — never mix                          |
| DRY       | Shared types in `types/` · validation schema once in `validations/`                       |
| Fail Fast | `config/env.js` throws at startup if env vars missing · validate API response at boundary |
| SSOT      | Error messages → `constants/errors.js` · API base URL → one config file                   |
| YAGNI     | No global state until local state is proven insufficient                                  |
| KISS      | Component calls one hook — no multi-source data orchestration inside JSX                  |
| DIP       | Components depend on hook interfaces, not fetch calls directly                            |

## Async Error Handling

- Catch only where you can meaningfully recover
- Never `catch` and return `null`/`undefined` — throw a typed error instead
- React: use error boundaries or `error.jsx` for UI-level recovery

## Testing

- Unit test pure functions and hooks in isolation
- Integration test at API route boundaries — not implementation details
- Mock external services only — don't mock what you own
- One assertion per test concept

## Never Do

- Name anything `data`, `result`, `info`, `temp`, `manager`, `handleX`, `processX`
- Functions > 20 lines · params > 3 · nesting > 2 — split or group
- Mutate state directly — always return new references (`{ ...prev, key: value }`, `[...arr, item]`)
- Business logic inside JSX or component body — extract to hook or utility
