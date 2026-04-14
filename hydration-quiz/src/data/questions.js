const quizQuestions = [
  {
    type: 'multiple-choice',
    question: 'What is hydration?',
    options: [
      'Eating more fruit and vegetables',
      'Giving the body needed water or fluids for optimal function',
      'Sleeping at least 8 hours a night',
      'Exercising every day',
    ],
    answer: 1,
    explanation:
      'Hydration is giving the body needed water (or fluids) for optimal function!',
    difficulty: 1,
  },
  {
    type: 'multiple-choice',
    question: 'How many cups of fluid is it recommended to drink per day?',
    options: ['2-4 cups', '4-6 cups', '6-8 cups', '10-12 cups'],
    answer: 2,
    explanation:
      'It is generally recommended to aim to drink between 6-8 cups of fluid a day.',
    difficulty: 1,
  },
  {
    type: 'multiple-choice',
    question: 'Which of these is NOT one of the 4 good reasons to hydrate?',
    options: [
      'Concentration',
      'Growing taller',
      'Heart health',
      'Temperature regulation',
    ],
    answer: 1,
    explanation:
      'The 4 good reasons to hydrate are: concentration, decision-making, heart health, and temperature regulation.',
    difficulty: 1,
  },
  {
    type: 'multiple-choice',
    question:
      'What body system needs water to pump blood and oxygen throughout the body?',
    options: [
      'The lungs',
      'The brain',
      'The heart',
      'The stomach',
    ],
    answer: 2,
    explanation:
      'Hydration helps the heart pump blood to the muscles during movement — hydration makes the heart\'s job easier.',
    difficulty: 1,
  },
  {
    type: 'multiple-choice',
    question: 'How many grams of sugar are in one teaspoon?',
    options: ['2g', '5g', '8g', '10g'],
    answer: 1,
    explanation:
      'One teaspoon of sugar equals approximately 5 grams. One sugar cube equals about 4 grams.',
    difficulty: 2,
  },
  {
    type: 'multiple-choice',
    question:
      'The NHS recommends that those aged 7-10 should have no more than how many grams of sugar per day?',
    options: ['18g', '24g', '30g', '36g'],
    answer: 1,
    explanation:
      'The NHS recommends no more than 24g of sugar per day for ages 7-10, and no more than 30g for ages 11 and up.',
    difficulty: 2,
  },
  {
    type: 'true-or-false',
    statement:
      'Feeling tired and low in energy can be a sign that you\'re not drinking enough water.',
    answer: true,
    explanation:
      'Hydration is important for energy levels. Feeling tired and low in energy can be a sign that we are not drinking enough water.',
    difficulty: 1,
  },
  {
    type: 'true-or-false',
    statement:
      'Dehydration is when the body takes in more water than it loses.',
    answer: false,
    explanation:
      'It\'s the opposite! Dehydration is when the body loses more water than it takes in.',
    difficulty: 1,
  },
  {
    type: 'true-or-false',
    statement: 'A banana has a higher water content than a cucumber.',
    answer: false,
    explanation:
      'Cucumber has about 98% water content, while banana has about 70-79%. Cucumber is one of the most water-rich foods!',
    difficulty: 2,
  },
  {
    type: 'true-or-false',
    statement:
      'One can of Coca-Cola contains more sugar than the NHS daily recommendation for a 9-year-old.',
    answer: true,
    explanation:
      'A 330mL can of Coca-Cola contains about 35g of sugar, while the NHS recommends no more than 24g per day for children aged 7-10.',
    difficulty: 2,
  },
  {
    type: 'fill-in-the-blank',
    question: 'Complete the sentence:',
    sentence:
      'Many fluids are hydrating, but some have more _____ than others.',
    blanks: ['sugar'],
    wordBank: ['sugar', 'protein', 'water', 'salt'],
    explanation:
      'Many fluids are hydrating, but some options have more sugar than others. Sugary drinks can affect energy and mood.',
    difficulty: 1,
  },
  {
    type: 'fill-in-the-blank',
    question: 'Complete the sentence:',
    sentence:
      'In the _____ or during _____ the body loses water through sweat.',
    blanks: ['heat', 'exercise'],
    wordBank: ['heat', 'exercise', 'winter', 'sleep'],
    explanation:
      'Drinking water helps replace fluids lost during sweating caused by heat or exercise, which is necessary for helping us to cool down.',
    difficulty: 1,
  },
  {
    type: 'fill-in-the-blank',
    question: 'Complete the sentence:',
    sentence:
      '_____ and _____ are other good sources of water for the body.',
    blanks: ['Fruits', 'vegetables'],
    wordBank: ['Fruits', 'vegetables', 'crisps', 'biscuits'],
    explanation:
      'Fruits and vegetables have high water content and are hydrating for the body — another wonderful source of hydration!',
    difficulty: 1,
  },
  {
    type: 'multi-select',
    question: 'Select all the good reasons to hydrate:',
    instruction: 'Select all that apply',
    options: [
      'Concentration',
      'Decision-making',
      'Growing taller',
      'Heart health',
      'Temperature regulation',
      'Making your hair grow faster',
    ],
    answers: [0, 1, 3, 4],
    explanation:
      'The 4 good reasons to hydrate are concentration, decision-making, heart health, and temperature regulation.',
    difficulty: 1,
  },
]

const games = [
  {
    type: 'drag-sort',
    question: 'Sugar Sorter!',
    instruction:
      'Sort these drinks by how much sugar they contain.\n(Hint: 5 teaspoons = about 25g)',
    categories: [
      {
        name: '5 or fewer teaspoons',
        items: [
          { name: 'Water', emoji: '💧' },
          { name: 'Apple juice', emoji: '🍎' },
        ],
      },
      {
        name: '6 or more teaspoons',
        items: [
          { name: 'Coca-Cola', emoji: '🥤' },
          { name: 'Sprite', emoji: '🍋' },
          { name: 'Chocolate milk', emoji: '🍫' },
          { name: 'Orange juice', emoji: '🍊' },
        ],
      },
    ],
    explanation:
      'Water has 0 teaspoons of sugar. Apple juice has about 4-5 teaspoons. Chocolate milk has 5-6, orange juice has 5-6, Coca-Cola has 8-9, and Sprite has 9-10 teaspoons!',
    difficulty: 2,
  },
  {
    type: 'matching-pairs',
    question: 'Reasons to Hydrate',
    instruction: 'Match each reason to its explanation. Tap one on the left, then its match on the right.',
    pairs: [
      {
        left: 'Concentration',
        leftEmoji: '🧠',
        right: 'Helps the brain focus and think clearly',
      },
      {
        left: 'Decision-making',
        leftEmoji: '🤔',
        right: 'Helps the brain make good choices',
      },
      {
        left: 'Heart health',
        leftEmoji: '❤️',
        right: 'Makes pumping blood to muscles easier',
      },
      {
        left: 'Temperature',
        leftEmoji: '🌡️',
        right: 'Replaces fluids lost during sweating',
      },
    ],
    explanation:
      'Hydration is necessary for concentration, decision-making, heart health, and temperature regulation — these are the 4 good reasons to hydrate!',
    difficulty: 1,
  },
  {
    type: 'create-drink',
    question: 'Flavoured Water Builder!',
    instruction:
      'Build a tasty flavoured water — drag healthy ingredients into the glass. Avoid the sugary options!',
    maxIngredients: 4,
    ingredients: [
      { name: 'Water', emoji: '💧', healthy: true },
      { name: 'Lemon slices', emoji: '🍋', healthy: true },
      { name: 'Orange slices', emoji: '🍊', healthy: true },
      { name: 'Berries', emoji: '🫐', healthy: true },
      { name: 'Apple slices', emoji: '🍎', healthy: true },
      { name: 'Mint leaves', emoji: '🌿', healthy: true },
      { name: 'Ice', emoji: '🧊', healthy: true },
      { name: 'Sugar', emoji: '🍬', healthy: false },
      { name: 'Fizzy drink', emoji: '🥤', healthy: false },
    ],
    explanation:
      'Adding slices of fruit like orange, apple, or berries to your water adds extra flavour without processed sugar! A great way to stay hydrated.',
    difficulty: 1,
  },
  {
    type: 'emoji-select',
    question: 'Hydrating or Not?',
    instruction: 'Select only the foods that are hydrating for your body.',
    selectCount: 8,
    options: [
      { name: 'Cucumber', emoji: '🥒' },
      { name: 'Celery', emoji: '🥬' },
      { name: 'Tomato', emoji: '🍅' },
      { name: 'Watermelon', emoji: '🍉' },
      { name: 'Apple', emoji: '🍎' },
      { name: 'Soup', emoji: '🍲' },
      { name: 'Orange', emoji: '🍊' },
      { name: 'Strawberry', emoji: '🍓' },
      { name: 'Bread', emoji: '🍞' },
      { name: 'Cheese', emoji: '🧀' },
      { name: 'Cookie', emoji: '🍪' },
      { name: 'Peanuts', emoji: '🥜' },
      { name: 'Crisps', emoji: '🍟' },
      { name: 'Chocolate', emoji: '🍫' },
      { name: 'Popcorn', emoji: '🍿' },
      { name: 'Pretzel', emoji: '🥨' },
    ],
    answers: [0, 1, 2, 3, 4, 5, 6, 7],
    explanation:
      'Fruits and vegetables have high water content and are hydrating for the body. Cucumber, celery, and tomatoes are about 98% water! Watermelon, oranges, strawberries, apples, and soup are also great sources.',
    difficulty: 1,
  },
  {
    type: 'emoji-select',
    question: 'Urine Colour Check!',
    instruction:
      'Select the 3 colours that indicate you\'re well hydrated (the "healthy pee" colours).',
    options: [
      { name: 'Very pale', dropletColor: '#F5F0C8' },
      { name: 'Light straw', dropletColor: '#EDE4A0' },
      { name: 'Pale yellow', dropletColor: '#E5D370' },
      { name: 'Medium yellow', dropletColor: '#D4C020' },
      { name: 'Dark gold', dropletColor: '#C49A00' },
      { name: 'Amber', dropletColor: '#A06800' },
    ],
    answers: [0, 1, 2],
    explanation:
      'Urine colours 1-3 (the lightest shades) indicate "you\'re hydrated!" Colours 4-8 (darker shades) mean you need to drink more water.',
    difficulty: 1,
  },
  {
    type: 'matching-pairs',
    question: 'Water Content in Our Bodies!',
    instruction:
      'Match each to its approximate water content percentage. Tap one on the left, then its match on the right.',
    pairs: [
      { left: 'Baby', leftEmoji: '👶', right: '78%' },
      { left: 'Adult man', leftEmoji: '🧑', right: '60%' },
      { left: 'Adult woman', leftEmoji: '👩', right: '55%' },
      { left: 'Brain', leftEmoji: '🧠', right: '73%' },
      { left: 'Heart', leftEmoji: '❤️', right: '73%' },
    ],
    explanation:
      'Our bodies are mostly water! Babies are about 78% water, adult men about 60%, adult women about 55%, and both the brain and heart are about 73% water.',
    difficulty: 2,
  },
]

const quiz = [...quizQuestions]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getQuestionsForTopic(topicId) {
  if (topicId === 'quiz') return shuffle(quizQuestions)
  if (topicId === 'games') return games
  return []
}

export { quiz, games }
export default { quiz, games }
