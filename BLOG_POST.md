# Building "Eating for Energy": A Gamified Nutrition Quiz with AI-Assisted Development

*How I turned a children's nutrition webinar into an interactive quiz app using React, Vite, and Cursor AI -- and what I learned along the way.*

---

## The Starting Point

I had a problem: a nutrition educator (Andrea Carroll Langan) had delivered a brilliant "Eating for Energy" webinar for sporty kids aged 9-15, but once the session ended, how would the children actually retain what they'd learned? Slide decks don't stick with kids. Games do.

The goal was simple on paper: take the webinar content -- macronutrients, blood sugar regulation, 9 practical eating tips -- and turn it into a fun, mobile-friendly quiz app that kids could replay on their phones. No logins, no backend, no app store. Just a link they could tap and start playing.

---

## Step 1: Planning Before Code

Before writing a single line of code, I created two foundational documents:

- **`PROJECT_PLAN.md`** -- the product spec: user flow, activity types, gamification rules, tech stack decisions
- **`AGENTS.md`** -- an AI guidelines file with strict rules around body positivity, ethnic diversity, inclusive language, and visual style

This was critical. The `AGENTS.md` file meant that every time I worked with Cursor AI, it automatically understood the project's values: no labelling foods as "good" or "bad", no diet/weight framing, diverse character names, and encouraging feedback for wrong answers ("Not quite -- here's a hint!" instead of "Wrong!").

**Lesson learned:** Spending time on upfront planning documents pays off enormously when working with AI tools. They become the project's memory.

---

## Step 2: Content Extraction

The raw material was a set of webinar slide images and a teacher's booklet (`.docx`). I needed to:

1. Extract all text from the slides into structured markdown (`CONTENT_EXTRACTION.md`)
2. Identify the 8 energy tips, key nutritional facts, and processes (like blood sugar regulation)
3. Pull questions from the teacher's booklet into review documents
4. Organise everything into two tracks: **Quiz** (knowledge questions) and **Games** (interactive activities)

This went through several iterations -- `QUESTIONS_REVIEW.md`, `BOOKLET_QUESTIONS_REVIEW.md`, and finally `QUESTIONS_ORGANISED.md` -- as I refined what content worked best as quiz questions versus interactive games.

**Lesson learned:** Content is king. The code is just the container. Getting the educational content right took as much effort as building the app itself.

---

## Step 3: Scaffolding the App

The tech stack settled quickly:

- **React 19 + Vite 6** for fast static builds
- **React Router 7** for page navigation
- **@dnd-kit** for touch-friendly drag-and-drop
- **CSS custom properties** for theming (no Tailwind in the end -- plain CSS kept things simple)
- **Google Fonts** (Baloo 2 + Nunito) for a playful, readable look

The app flow is four screens:

```
Landing → Topic Select → Game Engine → Results
```

`GameContext` (using `useReducer`) manages all game state: current question, score, streak, feedback visibility, and navigation history.

---

## Step 4: Building 10 Activity Types

This was the heart of the project. Each activity type got its own component:

| Activity | What It Does |
|----------|-------------|
| **MultipleChoice** | Classic 4-option question |
| **TrueOrFalse** | Quick-fire true/false |
| **MultiSelect** | "Select all that apply" |
| **FillInBlank** | Complete a sentence from a word bank |
| **DragSort** | Sort foods into macronutrient categories (emoji grid) |
| **DragMatch** | Match related items across columns |
| **CreateDrink** | Build a lower-sugar drink by selecting ingredients |
| **BuildPlate** | Assemble a balanced meal (breakfast, lunch, or dinner) |
| **EmojiSelect** | Tap the correct items from an emoji grid |
| **OrderIt** | Arrange steps in sequence (e.g., blood sugar regulation) |

The games are deliberately **emoji-first with minimal text** -- the AGENTS.md rules specify fixed 4-column grids with 72x72px tiles. This keeps things visual and accessible for younger players.

---

## Step 5: Gamification Layer

Points scale with difficulty:
- Easy: 10 points
- Medium: 20 points  
- Hard: 30 points

A **streak counter** rewards consecutive correct answers with bonus points (kicking in after 3 in a row). The **results screen** awards 1-3 stars based on your score versus the maximum possible. Every answer -- right or wrong -- shows a brief educational explanation, so even mistakes become learning moments.

---

## Step 6: Asset Extraction

The webinar slides contained composite images (multiple food photos arranged on a single slide). I used a Python script with Pillow and NumPy to segment these into **47 individual food images** saved to `Extracted_Game_Images/`. This was a surprisingly involved side-quest that got its own conversation thread.

---

## Step 7: Deployment to GitHub Pages

The final step was getting the app live at `https://kekkle.github.io/eating-for-energy/`. This involved:

- Setting up a GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Configuring Vite's `base` path and React Router's `basename`
- Making the repo public (required for free GitHub Pages)
- Fixing image paths to use `import.meta.env.BASE_URL`

---

## What Went Well

**AI as a pair programmer.** Cursor AI was genuinely useful for scaffolding components, writing CSS, and iterating quickly. The `AGENTS.md` file kept it aligned with the project's values without me repeating instructions every session.

**Content-first approach.** Starting with the educational content and structuring it in markdown before touching code meant the quiz questions were solid before I wired them into components.

**Emoji-based games.** The decision to make games primarily visual (emoji grids instead of text-heavy interfaces) was a winner. It keeps the experience fun and accessible, especially on small screens.

**Structured state management.** Using `useReducer` in a single `GameContext` kept game logic centralised and predictable. Adding features like streaks, back/skip navigation, and "play again" was straightforward.

**Inclusive design from day one.** Baking body positivity and diversity rules into the project plan (not bolting them on later) meant the content naturally avoided harmful framing around food and bodies.

---

## What Didn't Go Well

**Drag-and-drop was a headache.** `@dnd-kit` is powerful but finicky. The "Create a Drink" game had a tap-fallback overlay that stole pointer events, breaking the drag interaction entirely. The fix was removing the overlay and using click handlers on draggable items with an activation distance. DnD on mobile is inherently fiddly.

**React Strict Mode + state bugs.** The `OrderIt` component had a maddening bug where pool items would duplicate. Root cause: React 18's Strict Mode double-invokes effects, and updating `pool` state inside a `setSlots` updater created duplicate adds. The fix was consolidating into a single atomic `board` state object.

**Biased shuffle algorithm.** My first attempt at randomising questions used `sort(() => Math.random() - 0.5)`, which produces a biased distribution. Replaced it with a proper Fisher-Yates shuffle. A good reminder that "close enough" randomness isn't.

**GitHub Pages deployment friction.** Multiple small issues stacked up: the workflow wasn't pushed initially due to permissions, the repo needed to be public for free Pages, and all image paths broke because they used leading `/` instead of Vite's `BASE_URL`. Each was a small fix, but together they ate a chunk of time.

**Localhost connection issues.** During development, the Cursor sandbox occasionally blocked the dev server from binding properly, requiring restarts outside the sandbox. Not a showstopper, but a recurring interruption.

---

## What We Built: By the Numbers

- **27 total activities** (18 quiz questions + 9 interactive games)
- **10 activity types** implemented as React components
- **47 extracted food images** from webinar slides
- **4 app screens** (Landing, Topic Select, Game Engine, Results)
- **5 UI components** (ProgressBar, ScoreDisplay, StreakCounter, StarRating, Feedback)
- **0 backend services** -- entirely static, deployable anywhere
- **2 game modes** -- Quiz (knowledge check) and Games (interactive activities)

---

## Key Takeaways

1. **Plan documents are your best AI prompt.** `AGENTS.md` and `PROJECT_PLAN.md` turned every AI session into a productive one because the context was already there.

2. **Content extraction is real work.** Don't underestimate the time needed to turn raw educational material into structured, quiz-ready data.

3. **Mobile-first means touch-first.** Every interaction decision (44px tap targets, no hover states, emoji grids) had to account for small screens and clumsy fingers.

4. **State management decisions echo everywhere.** Getting `GameContext` right early made every feature addition smoother. Getting it wrong (like the OrderIt board state) caused cascading bugs.

5. **Ship early, fix on prod.** The GitHub Pages deployment revealed issues (paths, base URLs) that localhost never would. Better to find them live than to polish forever locally.

6. **AI-assisted development is iterative, not magic.** Cursor didn't write the app autonomously. It was more like a very fast junior developer -- great at executing specific tasks, but needing clear direction and occasional course corrections.

---

*Built with React, Vite, and a lot of conversations with an AI. Deployed at [kekkle.github.io/eating-for-energy](https://kekkle.github.io/eating-for-energy/).*
