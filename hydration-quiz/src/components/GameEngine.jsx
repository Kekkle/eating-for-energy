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
import FillInTheBlank from './activities/FillInTheBlank'
import DragSort from './activities/DragSort'
import EmojiSelect from './activities/EmojiSelect'
import MatchingPairs from './activities/MatchingPairs'
import CreateDrink from './activities/CreateDrink'
import OrderIt from './activities/OrderIt'
import WaterFill from './activities/WaterFill'
import './GameEngine.css'

const ACTIVITY_COMPONENTS = {
  'multiple-choice': MultipleChoice,
  'true-or-false': TrueOrFalse,
  'multi-select': MultiSelect,
  'fill-in-the-blank': FillInTheBlank,
  'drag-sort': DragSort,
  'emoji-select': EmojiSelect,
  'matching-pairs': MatchingPairs,
  'create-drink': CreateDrink,
  'order-it': OrderIt,
  'water-fill': WaterFill,
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
    replayCount,
    startGame,
    submitAnswer,
    nextQuestion,
    skipQuestion,
    prevQuestion,
    replayCurrent,
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
        <div className="game-header-top">
          <button className="btn btn-secondary game-home-btn" onClick={() => navigate('/topics')}>
            ← Home
          </button>
          <div className="game-header-stats">
            <ScoreDisplay score={score} />
            <StreakCounter streak={streak} />
          </div>
        </div>
        <ProgressBar current={currentIndex} total={questions.length} />
      </div>

      <div className="game-question-area" key={`${currentIndex}-${replayCount}`}>
        <ActivityComponent
          question={currentQuestion}
          onAnswer={(isCorrect, explanation, correctAnswer) =>
            submitAnswer(isCorrect, explanation, correctAnswer)
          }
        />
      </div>

      {!showFeedback && (
        <div className="game-nav">
          {currentIndex > 0 && (
            <button className="btn btn-secondary game-nav-btn" onClick={prevQuestion}>
              ← Back
            </button>
          )}
          <button className="btn btn-secondary game-nav-btn game-nav-skip" onClick={skipQuestion}>
            Skip →
          </button>
        </div>
      )}

      {showFeedback && (
        <Feedback data={feedbackData} onNext={nextQuestion} onReplay={replayCurrent} />
      )}
    </div>
  )
}
