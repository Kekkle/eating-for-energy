# Eating for Energy -- Agent Guidelines

## Project Summary

This is a mobile-friendly, static gamified quiz website for school children (ages 9-15, sports-oriented) who have attended the "Eating for Energy" webinar. The app reinforces learning about macronutrients, energy production, blood sugar regulation, and 9 practical eating tips. There is no backend -- it is a purely client-side React + Vite app deployed to Netlify or Vercel.

## Authoritative Reference

The project plan lives at `PROJECT_PLAN.md` in the workspace root. Always check it before making structural decisions -- the user may update activity types, topics, or features at any time.

## Tech Stack

- React + Vite (static site build)
- CSS Modules or Tailwind CSS (mobile-first, responsive)
- @dnd-kit/core for drag-and-drop interactions (touch-friendly)
- react-router for page navigation
- No backend, no database, no authentication

## Audience

- Children and teens aged 9-15 who play sports
- Language should be clear, encouraging, and age-appropriate
- Avoid jargon; explain nutritional terms simply
- Use a fun, positive tone in all feedback messages

## Inclusivity and Body Positivity

- All imagery must be **body positive** -- represent a range of body types, not just one "athletic" ideal
- Imagery must be **ethnically diverse** -- represent a range of ethnicities and skin tones
- Never frame food choices in terms of weight loss, dieting, or body shape
- Focus on how food makes you **feel** (energy, mood, performance) rather than how you look
- Avoid language that labels foods as "good" or "bad" -- instead use concepts like "more often" vs "less often", or "nutrient-dense" vs "less nutritious"
- Scenarios and character names should reflect diverse cultural backgrounds
- No content should make any child feel excluded or that the advice doesn't apply to them

## Activity Types (8 total)

1. **MultipleChoice** -- 4-option questions
2. **TrueOrFalse** -- quick-fire True/False
3. **DragAndDrop** -- sort foods into macronutrient categories
4. **FillInTheBlank** -- complete a sentence from a word bank
5. **MatchingPairs** -- connect related items across two columns
6. **CreateIt** -- drag items to build a meal or drink (e.g., breakfast plate, lower-sugar drink)
7. **ScenarioQuestion** -- short story with a food decision
8. **OrderIt** -- arrange steps of a process in correct order (e.g., blood sugar regulation)

These may change as the project evolves. Always refer to `PROJECT_PLAN.md` for the current list.

## Content Topics

- Macronutrients (carbohydrates, protein, fat)
- How we get energy from food
- Blood sugar regulation
- 9 tips for eating for energy

## Visual Style Guide -- Emoji Games

- Emoji icon grids must always use **fixed 4-column rows** (`grid-template-columns: repeat(4, 72px)`) so icons stack evenly
- Drop zones in sorting games should also use 4-column grids where space allows
- Never use `auto-fill` for emoji grids -- always specify the exact column count for even alignment
- Each emoji tile is 72×72px with a 16px border-radius
- Emoji font size is 2.2rem inside tiles
- All games should be primarily image/emoji-based with minimal text

## Key Conventions

- All quiz content goes in `src/data/questions.js` as structured data -- never hardcode questions in components
- Each activity type is its own component in `src/components/activities/`
- Shared UI elements (progress bar, score display, etc.) go in `src/components/ui/`
- Theme colors and branding variables go in `src/styles/global.css` as CSS custom properties
- All interactive elements must be touch-friendly (minimum 44px tap targets)
- No hover-dependent interactions -- everything must work on phones
- Feedback messages should be encouraging, never discouraging (e.g., "Not quite -- here's a hint!" rather than "Wrong!")

## Gamification Rules

- Points scale with difficulty (easy: 10pts, medium: 20pts, hard: 30pts)
- Streak bonuses for consecutive correct answers
- End-of-round results show 1-3 star rating
- Every answer (right or wrong) shows a brief educational explanation

## Content Extraction Workflow

When webinar slide images are provided:

1. Extract all visible text from each slide
2. Identify the 9 energy tips, key nutritional facts, and any diagrams/processes
3. Note the color palette, fonts, and visual style for branding
4. Use extracted content to populate `src/data/questions.js`
