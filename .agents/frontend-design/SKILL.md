---
name: frontend-design
description: Baseline design philosophy for distinctive, production-grade UI. Use when visual quality and aesthetic direction matter — components, pages, layouts, styling. Extends frontend skill — all frontend rules still apply.
license: MIT
---

> Read `.agents/software-principles/SKILL.md` and `.agents/frontend/SKILL.md` first.

## Design Thinking

Before writing code, commit to a clear aesthetic direction:

1. **Purpose** — What problem does this UI solve? Who uses it?
2. **Tone** — Pick one and commit: minimal · editorial · playful · brutalist · luxury · retro-futuristic · organic · industrial · soft · geometric
3. **Differentiation** — What is the one thing a user will remember about this UI?

No two designs should look the same. Avoid safe, predictable choices.

## Typography

Choose characterful, distinctive fonts — never Inter, Roboto, Arial, or system fonts as default. Pair a display font with a refined body font. Font choice drives the entire aesthetic — decide first.

## Color & Composition

- Dominant palette + sharp accent outperforms even, timid color distribution
- Commit to light or dark — don't default to neutral gray
- Asymmetry, overlap, diagonal flow, grid-breaking elements over predictable grids
- Generous negative space OR controlled density — pick one and execute fully

## Motion

Focus on high-impact moments: page load with staggered reveals, surprising hover states, scroll-triggered transitions. One orchestrated entrance creates more delight than scattered micro-interactions. Use whatever motion tool fits — CSS animations, Framer Motion, GSAP, Three.js, etc.

## Visual Details

Add depth — gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders. Match effect to tone. No texture that contradicts the chosen aesthetic.

## Never Do

- Generic AI aesthetics: Inter/Roboto/Arial, purple-on-white gradients, cookie-cutter card layouts
- Aesthetic choices that contradict the committed tone
- Ignore four states (loading · error · empty · ideal) for visual polish
- Converge on same aesthetic across different designs
