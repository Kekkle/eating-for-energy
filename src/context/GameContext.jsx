import { createContext, useContext, useReducer, useCallback } from 'react'

const GameContext = createContext(null)

const POINTS = { 1: 10, 2: 20, 3: 30 }
const STREAK_BONUS_THRESHOLD = 3
const STREAK_BONUS_POINTS = 5

const initialState = {
  topicId: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  answers: [],
  showFeedback: false,
  feedbackData: null,
  isComplete: false,
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...initialState,
        topicId: action.topicId,
        questions: action.questions,
      }
    }

    case 'SUBMIT_ANSWER': {
      const { isCorrect, explanation, correctAnswer } = action
      const question = state.questions[state.currentIndex]
      const difficulty = question.difficulty || 1
      const basePoints = isCorrect ? POINTS[difficulty] : 0
      const newStreak = isCorrect ? state.streak + 1 : 0
      const streakBonus =
        isCorrect && newStreak >= STREAK_BONUS_THRESHOLD ? STREAK_BONUS_POINTS : 0
      const earnedPoints = basePoints + streakBonus

      return {
        ...state,
        score: state.score + earnedPoints,
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
        answers: [
          ...state.answers,
          { isCorrect, points: earnedPoints, difficulty },
        ],
        showFeedback: true,
        feedbackData: {
          isCorrect,
          explanation: explanation || question.explanation,
          correctAnswer,
          earnedPoints,
          streak: newStreak,
        },
      }
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentIndex + 1
      const isComplete = nextIndex >= state.questions.length

      return {
        ...state,
        currentIndex: nextIndex,
        showFeedback: false,
        feedbackData: null,
        isComplete,
      }
    }

    case 'RESET': {
      return initialState
    }

    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const startGame = useCallback((topicId, questions) => {
    const shuffled = [...questions]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    dispatch({ type: 'START_GAME', topicId, questions: shuffled })
  }, [])

  const submitAnswer = useCallback((isCorrect, explanation, correctAnswer) => {
    dispatch({ type: 'SUBMIT_ANSWER', isCorrect, explanation, correctAnswer })
  }, [])

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const value = {
    ...state,
    startGame,
    submitAnswer,
    nextQuestion,
    resetGame,
    totalQuestions: state.questions.length,
    progress:
      state.questions.length > 0
        ? (state.currentIndex / state.questions.length) * 100
        : 0,
    correctCount: state.answers.filter((a) => a.isCorrect).length,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
