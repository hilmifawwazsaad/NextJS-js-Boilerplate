# AGENTS.md

Check `package.json` before importing — never use unlisted libraries.

**Stack:** Next.js 16 · React 19 · JavaScript (JSX) · Tailwind CSS 4 · ESLint 9 · Prettier · Husky · commitlint — no data-fetching lib installed.

## Reading Order (every task)

1. **Always** read `.agents/software-principles/SKILL.md` first — principles, naming, function design
2. Read the domain skill below

## Skill Routing

| Domain          | When                                                                       | Skill                                  |
| --------------- | -------------------------------------------------------------------------- | -------------------------------------- |
| All             | Always — principles, naming, function design                               | `.agents/software-principles/SKILL.md` |
| Frontend        | Pure UI — components, pages, layouts, styling; no DB or server logic       | `.agents/frontend/SKILL.md`            |
| Frontend Design | UI with visual/aesthetic emphasis — use alongside frontend skill           | `.agents/frontend-design/SKILL.md`     |
| Backend         | External API server (Go, Python, PHP, etc.) separate from Next.js repo     | `.agents/backend/SKILL.md`             |
| Fullstack       | UI + server logic in one Next.js repo — Route Handlers, Server Actions, DB | `.agents/fullstack/SKILL.md`           |

Multi-domain task → pick dominant, note overlap. Convention missing → ask before inventing.
