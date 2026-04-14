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
      'Sort these drinks by how much sugar they contain.\n(Hint: 1 teaspoon = 5g of sugar)',
    categories: [
      {
        name: 'About 5 teaspoons',
        items: [
          { name: 'Apple juice', image: '/hydration-quiz/images/apple-juice.png' },
          { name: 'Chocolate milk', image: '/hydration-quiz/images/chocolate-milk.png' },
          { name: 'Orange juice', image: '/hydration-quiz/images/orange-juice.png' },
        ],
      },
      {
        name: '6 teaspoons or more',
        items: [
          { name: 'Soda', image: '/hydration-quiz/images/soda.png' },
          { name: 'Energy drink', image: '/hydration-quiz/images/energy-drink.png' },
        ],
      },
    ],
    explanation:
      'The sugar content in drinks varies depending on the brand and portion size. A 250ml glass of fruit juice usually contains around 20–25g of sugar. Soft drinks and energy drinks often contain about 25–30g of sugar per 250ml, but larger cans can contain 50g or more.',
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
      'Build a tasty flavoured water — drag your favourite ingredients into the glass!',
    maxIngredients: 4,
    ingredients: [
      { name: 'Lemon', image: '/hydration-quiz/images/lemon.png', healthy: true },
      { name: 'Orange', image: '/hydration-quiz/images/orange-slice.png', healthy: true },
      { name: 'Strawberry', image: '/hydration-quiz/images/strawberry.png', healthy: true },
      { name: 'Kiwi', image: '/hydration-quiz/images/kiwi.png', healthy: true },
      { name: 'Cucumber', image: '/hydration-quiz/images/cucumber.png', healthy: true },
      { name: 'Mint', image: '/hydration-quiz/images/mint.png', healthy: true },
      { name: 'Ice', image: '/hydration-quiz/images/ice.png', healthy: true },
      { name: 'Pomegranate', image: '/hydration-quiz/images/pomegranate.png', healthy: true },
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
      { name: '1 - Very pale', dropletColor: '#F5F5DC' },
      { name: '2 - Light straw', dropletColor: '#F0E68C' },
      { name: '3 - Pale yellow', dropletColor: '#E8D44D' },
      { name: '4 - Yellow', dropletColor: '#D4B828' },
      { name: '5 - Dark yellow', dropletColor: '#C8A000' },
      { name: '6 - Orange', dropletColor: '#D48B00' },
      { name: '7 - Dark orange', dropletColor: '#B86800' },
      { name: '8 - Brown', dropletColor: '#8B5A00' },
    ],
    answers: [0, 1, 2],
    explanation:
      'The lightest shades indicate you\'re hydrated, while darker shades mean you need to drink more water!',
    difficulty: 1,
  },
  {
    type: 'water-fill',
    question: 'Water Content in Our Bodies!',
    instruction:
      'Tap on each figure to set how much of their body is water.',
    items: [
      { name: 'Baby', image: '/hydration-quiz/images/baby.png', answer: 80 },
      { name: 'Adult man', image: '/hydration-quiz/images/man.png', answer: 60 },
      { name: 'Adult woman', image: '/hydration-quiz/images/woman.png', answer: 55 },
      { name: 'Brain', image: '/hydration-quiz/images/brain.png', answer: 75 },
      { name: 'Heart', image: '/hydration-quiz/images/heart.png', answer: 75 },
    ],
    tolerance: 5,
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
