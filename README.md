# Next.js JS Boilerplate

A lightweight Next.js boilerplate using **JavaScript (JSX)** instead of TypeScript, optimized for rapid prototyping and quick testing.

## Why JSX Instead of TypeScript?

This boilerplate uses `.jsx` for React components and `.js` for utilities/logic files. The rationale:

- **Faster Development**: No need to check types one by one during rapid prototyping
- **Quick Testing**: Perfect for experimenting with new ideas without type constraints
- **Clear Separation**: `.jsx` for components (returns JSX), `.js` for pure logic
- **Learning Friendly**: Easier for beginners to focus on React concepts first

> **Note**: For production apps with large teams, TypeScript is still recommended!

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Package Manager**: [pnpm](https://pnpm.io)
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint (Conventional Commits)

## Getting Started

### 1. Clone or Download Repository

```bash
# Clone the repository
git clone <repository-url>
cd nexjs-jsx-boilerplate

# Or download ZIP and extract it
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### 4. Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:strict      # ESLint with max 0 warnings
pnpm lint:fix         # Auto-fix ESLint errors
pnpm format:write     # Format with Prettier
pnpm format:check     # Check formatting
pnpm format           # Format + Lint + Strict check (all-in-one)
```

## Project Structure

```
├── src/
│   ├── app/              # App Router pages
│   │   ├── page.jsx      # Home page (/)
│   │   ├── layout.jsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # Reusable components (.jsx)
│   ├── utils/            # Utility functions (.js)
│   └── services/         # API services (.js)
├── public/               # Static assets
└── .husky/               # Git hooks
```

## File Naming Convention

- **`.jsx`** - React components that return JSX
- **`.js`** - Pure JavaScript (utils, services, helpers)
- **`.css`** - Stylesheets

## Code Quality Setup

### Auto-formatting on Save

This project uses Prettier + ESLint with auto-formatting:

- **On Save**: VSCode auto-formats (if configured)
- **On Commit**: Husky + lint-staged auto-format staged files
- **Manual**: Run `pnpm format`

### Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

Commitlint will **reject** commits that don't follow this format.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [pnpm Documentation](https://pnpm.io)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
