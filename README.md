# Eating for Energy

A mobile-friendly, gamified nutrition quiz app for children and teens (ages 9–15) who play sports. Built to reinforce learning from the **Eating for Energy & Wellbeing** webinar by Andrea Carroll Langan.

**[Play it live](https://kekkle.github.io/eating-for-energy/)**

## What It Does

Kids work through two modes:

- **Quiz** — 18 questions covering macronutrients, blood sugar regulation, and 8 practical steps for eating well
- **Games** — 9 interactive activities including drag-and-drop sorting, meal building, drink creation, and sequencing challenges

Every answer (right or wrong) includes a brief educational explanation, so even mistakes become learning moments.

## Activity Types

| Type | Description |
|------|-------------|
| Multiple Choice | 4-option questions |
| True or False | Quick-fire statements |
| Multi Select | Select all correct answers |
| Drag & Sort | Sort foods into macronutrient categories |
| Create a Drink | Build a lower-sugar alternative |
| Emoji Select | Tap correct items from a grid |
| Build a Plate | Assemble balanced meals (breakfast, lunch, dinner) |
| Order It | Arrange steps in sequence (e.g. blood sugar regulation) |

## Tech Stack

- **React 19** + **Vite 6** (static site build)
- **React Router 7** for navigation
- **@dnd-kit** for touch-friendly drag-and-drop
- Plain CSS with custom properties for theming
- No backend, no database, no authentication

## Running Locally

```bash
npm install
npm run dev
```

## Deployment

Deployed to GitHub Pages via GitHub Actions. Pushes to `main` trigger automatic builds.

## Design Principles

- **Mobile-first** — 44px minimum tap targets, no hover-dependent interactions
- **Body positive** — no diet/weight framing; focuses on how food makes you feel
- **Inclusive** — diverse cultural representation in scenarios and language
- **Encouraging** — wrong answers get "Not quite — here's a hint!" not "Wrong!"
- **Visual-first** — emoji-based games with minimal text

## Credits

Based on the *Eating for Energy & Wellbeing* webinar by **Andrea Carroll Langan** / **Health Embrace**.
