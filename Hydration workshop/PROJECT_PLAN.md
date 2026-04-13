# Hydration Quiz -- Gamified Quiz App

## Overview

Build a mobile-friendly, static gamified quiz website for the "Hydration" webinar. This is targeted at children/teens (ages 9-15). It will feature a mix of quiz questions and interactive games covering hydration topics (why we need it, how much we need, the urine colour chart, hydrating foods, sugar in drinks, and practical tips). Points, progress tracking, and fun feedback -- all deployable for free with no backend.

---

## Relationship to "Eating for Energy"

This is a **separate Vite + React project** housed in its own directory (`hydration-quiz/`) within the Health Embrace workspace. Reasons for separation:

- Different visual identity (purple/cyan/yellow palette vs the orange/green Eating for Energy palette)
- Different fonts (Luckiest Guy + Quicksand vs Baloo 2 + Nunito)
- Independent deployment to its own URL (e.g. `hydration-quiz.netlify.app`)
- Cleaner content management -- each webinar's quiz is self-contained

The two projects share the same **component architecture** and **activity type patterns**, so code can be adapted from Eating for Energy as a starting point.

> **Decision to confirm:** Should these eventually share a common "Health Embrace" landing page that links out to each quiz? Or remain fully separate?

---

## Tech Stack

- **React + Vite** -- same architecture as Eating for Energy
- **CSS Modules or plain CSS** -- mobile-first, responsive, with the Hydration colour palette
- **@dnd-kit/core + @dnd-kit/sortable** -- for drag-and-drop interactions (touch-friendly)
- **react-router-dom** -- for page navigation
- **Deployed to Netlify or Vercel** -- free hosting, shareable link
- **No backend, no database, no authentication**

---

## App Flow

1. Landing Page (hydration-themed welcome)
2. Topic Selection (Quiz / Games)
3. Mixed Activity Flow (questions from selected topic)
4. Results and Score Summary
5. Back to Topic Selection (retry or pick another)

---

## Content Topics

All content is derived from the Hydration webinar presentation and student summary handout.

### Topic 1: What Is Hydration & Why We Need It
- Definition: giving the body needed water/fluids for optimal function
- Hydration is necessary for energy -- feeling tired can be a sign of not drinking enough
- 4 good reasons to hydrate:
  1. **Concentration** -- helps the brain focus and think clearly
  2. **Decision-making** -- another important brain activity that benefits from hydration
  3. **Heart health** -- helps the heart pump blood to muscles; makes the heart's job easier
  4. **Temperature regulation** -- replaces fluids lost during sweating from heat or exercise, helping us cool down

### Topic 2: How Much Do We Need & How to Check
- Aim for **6-8 cups of fluid per day**
- **Urine colour chart** (scale 1-8): colours 1-3 = hydrated ("healthy pee!"), colours 4-8 = need to drink more
- **Dehydration**: when the body loses more water than it takes in

### Topic 3: Hydrating Foods
- Fruits and vegetables have high water content and are hydrating for the body
- Water content data:
  - Cucumber: 98%
  - Celery: 98%
  - Tomato: 98%
  - Carrot: 89%
  - Orange: 80-89%
  - Apple: 86%
  - Banana: 70-79%

### Topic 4: Sugar in Drinks
- Many fluids are hydrating, but some have more sugar than others
- Sugar content of popular drinks:
  - Minute Maid Orange (240mL cup): 24g
  - Apple juice generic (250mL cup): 22g
  - Minute Maid Lemonade (240mL bottle): 27g
  - Coca-Cola (330mL can): 35g
  - Fanta (330mL can): 28.1g
  - Sprite (330mL can): 38g
- **1 teaspoon = 5g sugar** (or 1 cube = 4g)
- NHS daily sugar limits:
  - Ages 7-10: no more than **24g** per day
  - Ages 11+: no more than **30g** per day

### Topic 5: Practical Hydrating Tips
- Drink a glass of water when you first wake up in the morning
- Fill up your school water bottle even at home to sip throughout the day
- Add slices of fruit (orange, apple, berries) to water for extra flavour
- Sugary drinks can affect energy and mood -- try healthier swaps instead
- Liquids with sugar content can be diluted or substituted for healthier options

---

## Activity Types

### Quiz Activities
1. **MultipleChoice** -- 4-option questions with instant feedback
2. **TrueOrFalse** -- quick-fire True/False statements
3. **MultiSelect** -- select all correct answers from a list
4. **FillInTheBlank** -- complete a sentence from a word bank

### Game Activities
5. **DragSort** -- sort items into categories (e.g. drinks into "higher sugar" vs "lower sugar")
6. **MatchingPairs** -- connect related items (e.g. each reason to hydrate with its explanation)
7. **CreateIt** -- build a flavoured water or hydrating snack (drag ingredients into a glass/plate)
8. **OrderIt** -- arrange items in the correct order (e.g. fruits by water content, urine colours)
9. **EmojiSelect** -- select the correct items from a visual emoji grid
10. **ScenarioQuestion** -- short story with a hydration decision to make

---

## Proposed Questions & Games

### Quiz Questions (~12)

**Multiple Choice:**
1. What is hydration? *(giving the body needed water/fluids for optimal function)*
2. How many cups of fluid is it recommended to drink per day? *(6-8)*
3. Which of these is NOT one of the 4 good reasons to hydrate? *(Growing taller / Concentration / Heart health / Temperature)*
4. What body system needs water to pump blood and oxygen throughout the body? *(The heart)*
5. How many grams of sugar are in one teaspoon? *(5g)*
6. The NHS recommends that those aged 7-10 should have no more than how many grams of super per day? *(24g)*

**True or False:**
7. Feeling tired and low in energy can be a sign that you're not drinking enough water. *(True)*
8. Dehydration is when the body takes in more water than it loses. *(False -- it's the opposite)*
9. A banana has a higher water content than a cucumber. *(False -- cucumber is 98%, banana is 70-79%)*
10. One can of Coca-Cola contains more sugar than the NHS daily recommendation for a 9-year-old. *(True -- 35g vs 24g limit)*

**Fill in the Blanks:**
11. Many fluids are hydrating, but some have more __________ than others. *(sugar)*
12. In the ___________  or during ___________  the body loses water through sweat. *(heat)* *(exercise/sport)*
13. _____________ and _____________ are other good sources of water. *(fruits)* *(vegetables)*

### Games (~8)

**DragSort -- "Sugar Sorter":**
1. Can you estimate how many teaspoons of sugar are in these drinks?
   - Sprite (9-10), Coke (9-10), Chocolate milk (5-6), Orange juice (8-9), Apple juice (3-4), Water (0)

**MatchingPairs -- "Reasons to Hydrate":**
3. Match each reason to its explanation
   - Concentration → Helps the brain focus and think clearly
   - Decision-making → Helps the brain make good choices
   - Heart health → Makes pumping blood to muscles easier
   - Temperature → Replaces fluids lost during sweating

**CreateIt -- "Flavoured Water Builder":**
4. Build a tasty flavoured water! Drag ingredients into the glass
   - Available: water, lemon slices, orange slices, berries, apple slices, mint leaves, ice, sugar (should NOT be added), fizzy drink (should NOT be added)
   - Goal: create a refreshing drink without adding processed sugar

**EmojiSelect -- "Hydrating Foods":**
5.  Sort these into "Hydrating" vs "Not Hydrating" categories
   - Hydrating: : 🥒 Cucumber, 🥬 Celery, 🍅 Tomato, 🥕 Carrot, 🍎 Apple, Watermelon, 🍌 Banana, Soup
   - Not Hydrating: 🍞 Bread, 🧀 Cheese, Cookie , Peanut

**EmojiSelect -- "Urine Colour Check":**
6. Select the three “P” colours that indicate “hydrated”.
   - Six yellow droplets shown, with three in the lighter range to indicate hydrated.

**Drag&Drop -- "Water Content within Us":**
8. Can you guess the percentage of water content in these examples? Drag the water to fill up!
   - Man (60%), Woman (55%), Baby (78%), Brain (73%), Heart (73%)


---

## Visual Style & Branding

### Colour Palette

```css
:root {
  /* Backgrounds */
  --color-bg-gradient-top: #7C6BC4;       /* Medium purple-blue */
  --color-bg-gradient-bottom: #8B1A7A;    /* Deep magenta-purple */
  --color-bg-texture: #9178D1;            /* Lighter purple for bubble pattern */
  --color-bg-white: #FFFFFF;              /* White content cards */

  /* Primary accents */
  --color-cyan: #00BCD4;                  /* Headings, highlights, chart bars */
  --color-yellow: #FFD700;                /* Numbers, titles, large headings */
  --color-yellow-badge: #FFC107;          /* Number badge backgrounds */

  /* Text */
  --color-text: #333333;                  /* Body text on white cards */
  --color-text-on-dark: #FFFFFF;          /* Text on purple backgrounds */

  /* Feedback */
  --color-correct: #2D8E3C;
  --color-incorrect: #E84C3D;
  --color-streak: #FFD700;
}
```

### Typography

```css
:root {
  --font-heading: 'Luckiest Guy', cursive;   /* Bold, chunky, comic-style display font */
  --font-body: 'Quicksand', sans-serif;      /* Clean, rounded, child-friendly */
}
```

- Headings: uppercase, chunky lettering with subtle 3D shadow/outline effect (matching the presentation style)
- Body text: clean, rounded sans-serif inside white content cards
- Google Fonts: both Luckiest Guy and Quicksand are freely available

### Graphic Elements

- **Purple gradient backgrounds** with decorative circle/bubble pattern texture
- **White rounded-corner cards** for content and explanations (large border-radius)
- **Yellow rounded-square number badges** with dark outlines and slight 3D tilt
- **Cyan chevron/arrow badges** for navigation elements
- **Cartoon clipart characters**: brain with glasses, heart with face, sweating emoji character
- **Emoji-based game tiles** for food, drink, and hydration items
- **Bar charts** with cyan bars on white backgrounds (for water content visualisations)

### Key Style Differences from Eating for Energy

| Element | Eating for Energy | Hydration |
|---------|------------------|-----------|
| Background | Light grey (#EDEDEE) | Purple gradient (#7C6BC4 → #8B1A7A) |
| Heading font | Baloo 2 | Luckiest Guy |
| Body font | Nunito | Quicksand |
| Primary accent | Orange (#F26522) | Cyan (#00BCD4) |
| Secondary accent | Yellow (#F5C518) | Yellow (#FFD700) |
| Card style | White, subtle shadow | White, large radius, on dark background |
| Overall feel | Warm, earthy | Cool, vibrant, playful |

---

## Gamification Features

Same system as Eating for Energy:

- **Points** -- each correct answer earns points (harder activities earn more: easy 10pts, medium 20pts, hard 30pts)
- **Progress bar** -- shows how far through the current round
- **Streak counter** -- consecutive correct answers trigger bonus points and animations
- **Instant feedback** -- correct answers get a brief explanation reinforcing the learning; wrong answers show the right answer with a "did you know?" fact
- **End-of-round summary** -- star rating (1-3 stars), total score, encouragement message, option to retry or pick another topic
- **Animations** -- confetti on streaks, gentle shake on wrong, slide transitions

---

## Project File Structure

```
hydration-quiz/
  index.html
  package.json
  vite.config.js
  public/
  src/
    main.jsx
    App.jsx
    data/
      questions.js           -- all hydration quiz content
    components/
      Landing.jsx            -- hydration-themed welcome screen
      TopicSelect.jsx        -- choose Quiz or Games
      GameEngine.jsx         -- orchestrates question flow, scoring, progress
      Results.jsx            -- end-of-round summary
      activities/
        MultipleChoice.jsx
        TrueOrFalse.jsx
        MultiSelect.jsx
        DragSort.jsx
        EmojiSelect.jsx
        CreateIt.jsx
        MatchingPairs.jsx
        OrderIt.jsx
        ScenarioQuestion.jsx
      ui/
        ProgressBar.jsx
        ScoreDisplay.jsx
        StreakCounter.jsx
        Feedback.jsx
        StarRating.jsx
    styles/
      global.css             -- hydration theme variables, base styles
      activities.css         -- activity-specific styles
    assets/
      images/
```

---

## Inclusivity and Body Positivity

- All imagery must be **body positive** -- represent a range of body types
- Imagery must be **ethnically diverse** -- represent a range of ethnicities and skin tones
- Never frame hydration in terms of weight loss, dieting, or body shape
- Focus on how hydration makes you **feel** (energy, concentration, performance)
- Scenarios and character names should reflect diverse cultural backgrounds
- No content should make any child feel excluded

---

## Development Phases

### Phase 0 -- Content Extraction
- [x] Extract all visible text from webinar slides
- [x] Extract text from student summary handout
- [x] Identify the colour palette, fonts, and visual style from PNG exports
- [x] Draft quiz questions and game concepts from extracted content

### Phase 1 -- Project Scaffold
- [ ] Initialise a new Vite + React project in `hydration-quiz/`
- [ ] Set up the file structure as outlined above
- [ ] Install dependencies (react-router-dom, @dnd-kit/core, @dnd-kit/sortable)
- [ ] Apply the hydration colour palette and typography to `global.css`
- [ ] Create Landing, TopicSelect, and Results pages
- [ ] Build the GameEngine component (sequences questions, tracks score/progress)

### Phase 2 -- Build Activity Components
- [ ] Adapt MultipleChoice from Eating for Energy with hydration styling
- [ ] Adapt TrueOrFalse
- [ ] Adapt MultiSelect
- [ ] Adapt DragSort (for sugar sorting, hydrating vs non-hydrating)
- [ ] Adapt EmojiSelect (for hydrating foods)
- [ ] Adapt CreateIt (for flavoured water builder)
- [ ] Adapt MatchingPairs (for reasons to hydrate)
- [ ] Adapt OrderIt (for water content ranking, urine colour ordering)
- [ ] Build ScenarioQuestion (if not already in Eating for Energy)
- [ ] Ensure all components report answers back to GameEngine

### Phase 3 -- Gamification Layer
- [ ] Points system with difficulty weighting
- [ ] Streak counter with bonus points
- [ ] Progress bar
- [ ] Star ratings on results screen
- [ ] Instant feedback with explanations
- [ ] CSS animations (confetti, shake, slide transitions)

### Phase 4 -- Populate Content
- [ ] Write all ~12 quiz questions in `questions.js`
- [ ] Write all ~8 games in `questions.js`
- [ ] Review content for accuracy against the webinar material
- [ ] Ensure a good mix of activity types and difficulty levels

### Phase 5 -- Styling and Polish
- [ ] Apply the full hydration visual style (purple gradients, bubble textures, card styles)
- [ ] Responsive design testing across screen sizes
- [ ] Accessibility review (contrast, focus states, screen reader labels)
- [ ] Test all touch interactions on mobile

### Phase 6 -- Deploy
- [ ] Build production bundle
- [ ] Deploy to Netlify or Vercel (or GitHub Pages)
- [ ] Test the live link on phone and desktop

---

## Notes / Decisions Confirmed

- **Shared landing page**: Yes -- Hydration and Eating for Energy will eventually share a common "Health Embrace" landing page
- **Fonts**: Trying Luckiest Guy + Quicksand -- will adjust after seeing them rendered if needed
- **Content scope**: Starting with current content and adjusting later as needed
