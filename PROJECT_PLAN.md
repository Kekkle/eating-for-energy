# Eating for Energy -- Gamified Quiz App

## Overview

Build a mobile-friendly, static gamified quiz website for the "Eating for Energy" webinar. This is targeted to children/teens (ages 9-15) who play sports. It will feature 8 activity types across the webinar topics (macronutrients, how do we get energy, blood sugar regulation, 8 energy steps), with points, progress tracking, and fun feedback -- all deployable for free with no backend.

---

## Tech Stack

- **React + Vite** -- component-based architecture makes it easy to build each game type as its own reusable component. Builds to a static site.
- **CSS Modules or Tailwind CSS** -- for responsive, mobile-first styling that can match your webinar slides' look and feel.
- **Deployed to Netlify or Vercel** -- free hosting, gives you a shareable link (e.g., `eatingforenergy.netlify.app`). No backend, no database, no cost.
- **No accounts or login** -- students just click the link and play.

---

## App Flow

Students land on a welcoming page, choose a topic (or tackle all topics), then work through a mixed sequence of activity types. Each round contains ~8-12 questions drawn from the relevant topic. After completing a round, they see a score summary with encouraging feedback.

**Flow:**

1. Landing Page
2. Topic Selection (Quiz / Games)
3. Mixed Activity Flow (questions from selected topic)
4. Results and Score Summary
5. Back to Topic Selection (retry or pick another)

---

## The 8 Activity Types

Each activity type will be its own React component:

1. **MultipleChoice** -- standard 4-option question with instant right/wrong feedback
2. **TrueOrFalse** -- quick-fire statement with True/False buttons
3. **DragAndDrop** -- sort food items into categories (e.g., drag "chicken" into "Protein", "rice" into "Carbohydrate"). Works on mobile via touch events.
4. **FillInTheBlank** -- sentence with a missing word; student types or picks from a word bank
5. **MatchingPairs** -- two columns; student draws connections (e.g., match each tip to its benefit)
6. **CreateIt** -- Create a lower sugar drink option (e.g., instead of Coke, mix water with lemon juice and add honey). Game involves dragging items into a cup or bottle to create a new drink. The same for "Create a breakfast plate" -- user drags food items onto a plate making sure to include carbs, protein, and fats.
7. **ScenarioQuestion** -- short story ("Maya has football practice at 3pm...") with a "What should she eat?" decision
8. **OrderIt** -- User needs to put the process of blood sugar regulation into order.

---

## Gamification Features

- **Points** -- each correct answer earns points (harder activities earn more)
- **Progress bar** -- shows how far through the current round
- **Streak counter** -- consecutive correct answers trigger bonus points and animations
- **Instant feedback** -- correct answers get a brief explanation reinforcing the learning; wrong answers show the right answer with a "did you know?" fact
- **End-of-round summary** -- star rating (1-3 stars), total score, encouragement message, option to retry or pick another topic
- **Fun animations/transitions** -- lightweight CSS animations for correct/wrong answers (confetti on streaks, gentle shake on wrong)

---

## Content Structure

All quiz content lives in a single data file (`src/data/questions.js`) as a structured object. This makes it easy to update or add questions without touching any component code. Example shape:

```javascript
export const questions = {
  macronutrients: [
    {
      type: "multiple-choice",
      question: "Which macronutrient is the body's preferred source of energy?",
      options: ["Protein", "Carbohydrates", "Fat", "Vitamins"],
      answer: 1,
      explanation: "Carbohydrates are broken down into glucose...",
      difficulty: 1,
    },
    {
      type: "drag-and-drop",
      instruction: "Sort these foods into the correct macronutrient group",
      items: [
        { label: "Chicken breast", category: "Protein" },
        { label: "Brown rice", category: "Carbohydrates" },
        { label: "Avocado", category: "Fat" },
      ],
      difficulty: 2,
    },
  ],
  bloodSugar: [ /* ... */ ],
  tips: [ /* ... */ ],
};
```

---

## Mobile-First Design

- Touch-friendly tap targets (min 44px)
- Drag-and-drop uses touch events (via `@dnd-kit/core` library or custom touch handlers)
- Responsive layout: single column on phone, wider layout on tablet/desktop
- Large, readable fonts appropriate for mixed-age audience
- No hover-dependent interactions

---

## Branding

Once webinar slide images are uploaded:

- Extract the color palette, fonts, and visual style
- Apply those to the app's theme (CSS custom properties make this easy to adjust globally)
- Use similar graphic styles for any illustrated elements

---

## Project File Structure

```
/
  index.html
  src/
    main.jsx              -- app entry point
    App.jsx               -- routing and layout
    data/
      questions.js        -- all quiz content in one file
    components/
      Landing.jsx         -- welcome screen
      TopicSelect.jsx     -- choose a topic/round
      GameEngine.jsx      -- orchestrates question flow, scoring, progress
      Results.jsx         -- end-of-round summary
      activities/
        MultipleChoice.jsx
        TrueOrFalse.jsx
        DragAndDrop.jsx
        FillInTheBlank.jsx
        MatchingPairs.jsx
        CreateIt.jsx
        ScenarioQuestion.jsx
        OrderIt.jsx
      ui/
        ProgressBar.jsx
        ScoreDisplay.jsx
        StreakCounter.jsx
        StarRating.jsx
    styles/
      global.css          -- theme variables, base styles
      activities.css      -- activity-specific styles
    assets/
      images/             -- food and drink images for activities
```

---

## Development Phases

### Phase 0 -- Content Extraction
- [x] User uploads webinar slide images
- [x] Extract all text, the 8 steps, key facts, and the visual style/branding from the slides
- [x] Use extracted content to draft questions for all topic areas

### Phase 1 -- Project Scaffold
- [x] Initialize a Vite + React project
- [x] Set up the file structure as outlined above
- [x] Install dependencies (react-router, @dnd-kit/core)
- [x] Create Landing, TopicSelect, and Results pages
- [x] Build the GameEngine component (sequences questions, tracks score/progress)

### Phase 2 -- Build Activity Components
- [x] MultipleChoice component
- [x] TrueOrFalse component
- [x] DragAndDrop component (with mobile touch support)
- [x] MultiSelect component
- [x] CreateIt component (drag items to build a drink or plate)
- [x] EmojiSelect component
- [x] BuildPlate component
- [x] OrderIt component (arrange process steps in order)
- [x] Ensure all components report answers back to GameEngine

### Phase 3 -- Gamification Layer
- [x] Points system with difficulty weighting
- [x] Streak counter with bonus points
- [x] Progress bar
- [x] Star ratings on results screen
- [x] Instant feedback with explanations
- [x] CSS animations (confetti, shake, slide transitions)

### Phase 4 -- Populate Real Content
- [x] Write 18 quiz questions + 9 games using extracted webinar content
- [x] Include a mix of activity types per topic
- [x] Source or create food/drink images for CreateIt and other visual activities

### Phase 5 -- Styling and Branding
- [x] Apply the webinar's color palette and visual style
- [x] Responsive design testing across screen sizes
- [ ] Accessibility review (contrast, focus states, screen reader labels)

### Phase 6 -- Deploy
- [x] Build production bundle
- [x] Deploy to GitHub Pages via GitHub Actions
- [x] Configure base URL for subpath hosting
- [x] Test the live link on phone and desktop

---

## Notes / Decisions to Confirm

_Add any notes, changes, or questions below before approving:_

- 
- 
- 
