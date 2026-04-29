# AGENTS.md

## Project Overview

This project is a 3D portfolio website inspired by an airport baggage X-ray scanner.

Users will see a suitcase moving through an airport security scanner, where the contents represent projects, research, and ideas.

The goal is to create a realistic airport atmosphere, not a cyberpunk or overly stylized UI.

---

## Priority

1. Stable working code (no errors)
2. Performance (must run smoothly on MacBook Air M2)
3. Visual clarity (easy to understand)
4. Realistic atmosphere
5. 3D effects

Do NOT prioritize over-complex visuals over performance.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Three Fiber
- drei
- framer-motion

---

## File Scope Rules (IMPORTANT)

Only modify files that are explicitly mentioned in the request.

DO NOT scan or modify the entire project.

DO NOT read the following directories unless explicitly requested:

- node_modules/
- .next/
- dist/
- build/
- .git/
- public/models/
- public/videos/
- public/large/
- *.glb
- *.gltf
- *.mp4
- *.mov

---

## 3D Design Guidelines

- Use realistic airport lighting (dim, neutral, industrial)
- Avoid strong neon or cyberpunk style
- Use subtle cyan/blue ONLY for X-ray effect
- Keep materials realistic (metal, rubber, plastic)

---

## Interaction Rules

- Camera movement should be subtle
- Mouse movement = slight parallax only
- Drag = small rotation only
- No aggressive motion

---

## Performance Constraints

- Limit draw calls
- Use simple geometry first (box, sphere)
- Avoid heavy GLB models initially
- Use Suspense for loading
- Ensure mobile fallback

---

## X-ray Effect Rules

- Objects inside suitcase are hidden by default
- Only visible when scan line passes
- Use transparency + emission
- Do NOT make everything always visible

---

## Project Objects

Even if real projects are limited, use symbolic objects:

- Laptop → development
- Phone → apps
- Map / Pin → Terraplot
- Graph nodes → AI / GNN
- Document → research
- Key → ideas

---

## Coding Style

- Keep components small and modular
- Avoid unnecessary abstractions
- Use clear naming
- Prefer readability over cleverness

---

## What NOT to do

- Do NOT redesign entire project
- Do NOT introduce new frameworks
- Do NOT add unnecessary dependencies
- Do NOT make everything 3D
- Do NOT break existing layout

---

## Expected Output Style

- Minimal explanation
- Focus on working code
- Modify only necessary files
- Clearly state changed files

---

## Goal

Create a clean, realistic, interactive 3D portfolio experience that feels like scanning a suitcase at an airport security checkpoint.

Not a game, not cyberpunk, not flashy — but immersive and believable.