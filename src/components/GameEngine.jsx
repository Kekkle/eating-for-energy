import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { getQuestionsForTopic } from '../data/questions'
import ProgressBar from './ui/ProgressBar'
import ScoreDisplay from './ui/ScoreDisplay'
import StreakCounter from './ui/StreakCounter'
import Feedback from './ui/Feedback'
import MultipleChoice from './activities/MultipleChoice'
import TrueOrFalse from './activities/TrueOrFalse'
import MultiSelect from './activities/MultiSelect'
import FillInBlank from './activities/FillInBlank'
import DragSort from './activities/DragSort'
import DragMatch from './activities/DragMatch'
import CreateDrink from './activities/CreateDrink'
import './GameEngine.css'

const ACTIVITY_COMPONENTS = {
  'multiple-choice': MultipleChoice,
  'true-or-false': TrueOrFalse,
  'multi-select': MultiSelect,
  'fill-in-blank': FillInBlank,
  'drag-sort': DragSort,
  'drag-match': DragMatch,
  'create-drink': CreateDrink,
}

export default function GameEngine() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const {
    questions,
    currentIndex,
    score,
    streak,
    showFeedback,
    feedbackData,
    isComplete,
    startGame,
    submitAnswer,
    nextQuestion,
  } = useGame()

  useEffect(() => {
    const topicQuestions = getQuestionsForTopic(topicId)
    if (topicQuestions.length === 0) {
      navigate('/topics')
      return
    }
    startGame(topicId, topicQuestions)
  }, [topicId])

  useEffect(() => {
    if (isComplete) {
      navigate('/results')
    }
  }, [isComplete, navigate])

  if (questions.length === 0) return null

  const currentQuestion = questions[currentIndex]
  if (!currentQuestion) return null

  const ActivityComponent = ACTIVITY_COMPONENTS[currentQuestion.type]

  if (!ActivityComponent) {
    return (
      <div className="game-engine">
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>This activity type ({currentQuestion.type}) is coming soon!</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
            onClick={() => submitAnswer(true, 'This activity is still being built.')}
          >
            Skip to Next
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="game-engine animate-in">
      <div className="game-header">
        <ProgressBar current={currentIndex} total={questions.length} />
        <div className="game-header-stats">
          <ScoreDisplay score={score} />
          <StreakCounter streak={streak} />
        </div>
      </div>

      <div className="game-question-area" key={currentIndex}>
        <ActivityComponent
          question={currentQuestion}
          onAnswer={(isCorrect, explanation, correctAnswer) =>
            submitAnswer(isCorrect, explanation, correctAnswer)
          }
        />
      </div>

      {showFeedback && (
        <Feedback data={feedbackData} onNext={nextQuestion} />
      )}
    </div>
  )
}
