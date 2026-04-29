# Task: Place all prepared GLB models inside suitcase as a clean X-ray portfolio composition

## Context

We already have the following models:

/models/
- suitcase.glb
- burger.glb
- cable.glb
- cpu.glb
- headset.glb
- pin.glb
- wrench.glb

Do NOT use knife.FBX.

Goal:
Place all these objects inside the suitcase in a clean, meaningful composition.

---

## IMPORTANT DESIGN DIRECTION

This is NOT a technical wireframe demo.

This IS a portfolio.

The suitcase represents:
"My skills, projects, and interests packed into one place"

The result should feel:
- clean
- intentional
- slightly messy but curated
- like real objects inside a suitcase
- soft X-ray / translucent (NOT wireframe)

---

## 1. Suitcase (main object)

- Use /models/suitcase.glb
- Rotate 90 degrees so it faces the user properly
- Make it large (50–65% of viewport height)
- Center slightly right of screen

Material:
- white translucent
- opacity: 0.25–0.4
- no wireframe
- soft edges

---

## 2. Remove unwanted objects

Remove:
- any square box behind suitcase
- unnecessary scanner structures
- excessive UI panels

Keep scene minimal.

---

## 3. Place objects INSIDE suitcase

All objects must be INSIDE the suitcase volume.

Use bounding box of suitcase to constrain placement.

---

## 4. Object meaning (VERY IMPORTANT)

Each object must represent something:

- cpu.glb → AI / computation / backend
- headset.glb → creativity / production / UX
- pin.glb → Terraplot / GPS / location
- cable.glb → connection / systems / engineering
- wrench.glb → building / engineering / problem solving
- burger.glb → personality / humor / casual / human side

This gives personality to the portfolio.

---

## 5. Placement rules

- Objects should be arranged naturally (not perfectly aligned)
- Slight overlap is OK
- Different rotations for each object
- Do NOT place objects outside suitcase
- Do NOT make them float far apart

Example layout:

top-left: cpu  
top-right: headset  
center: pin  
bottom-left: cable  
bottom-right: wrench  
one playful object: burger

---

## 6. Object transforms (example)

Each object:

- scale relative to suitcase (small to medium)
- random slight rotation
- positioned within suitcase bounds

---

## 7. Material (CRITICAL)

Do NOT use wireframe.

Use soft translucent material:

- color: light gray / white
- opacity: 0.35–0.6
- slightly darker than suitcase shell

Result:
Objects look like they are inside a transparent case.

---

## 8. X-ray feeling

Do NOT use heavy effects.

Instead:

- subtle transparency
- slight brightness difference between shell and objects
- soft contrast
- no neon
- no cyan

---

## 9. Lighting

- soft ambient light
- no strong shadows
- slightly top-down light
- keep everything readable

---

## 10. Hero layout

Left side:

KO YAMASAKI  
Computer Science / AI / App Development  

Building products around location, graph data, and interactive systems.

Button:
View Works

Right side:
Large suitcase with objects inside

---

## 11. Scroll behavior

- suitcase slowly moves left → right
- objects become slightly clearer
- after hero → normal portfolio sections

---

## 12. Files to modify

Only:

- components/xray/XrayPortfolioHero.tsx
- components/xray/SuitcaseModel.tsx
- components/xray/ProjectObjects.tsx

---

## 13. Acceptance criteria

- All objects are inside suitcase
- No floating objects outside
- No wireframe look
- Clean and readable composition
- Each object feels intentional
- Suitcase dominates the hero
- Looks like a portfolio, not a debug scene