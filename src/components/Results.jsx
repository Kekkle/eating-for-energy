import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import StarRating from './ui/StarRating'
import './Results.css'

function getMessage(percentage) {
  if (percentage >= 0.85) return "Amazing! You're a nutrition superstar! 🌟"
  if (percentage >= 0.7) return "Great work! You really know your stuff! 💪"
  if (percentage >= 0.5) return "Good effort! You're on your way to becoming an energy expert! 🚀"
  return "Nice try! Every expert started as a beginner. Give it another go! 🌱"
}

export default function Results() {
  const navigate = useNavigate()
  const {
    score,
    answers,
    correctCount,
    totalQuestions,
    maxStreak,
    topicId,
    resetGame,
  } = useGame()

  const maxPossible = answers.reduce((sum, a) => {
    const base = { 1: 10, 2: 20, 3: 30 }[a.difficulty] || 10
    return sum + base
  }, 0)

  const percentage = totalQuestions > 0 ? correctCount / totalQuestions : 0

  const handleRetry = () => {
    resetGame()
    navigate(`/play/${topicId}`)
  }

  const handleTopics = () => {
    resetGame()
    navigate('/topics')
  }

  if (totalQuestions === 0) {
    navigate('/topics')
    return null
  }

  return (
    <div className="results animate-in">
      <h1 className="results-title">Round Complete!</h1>

      <div className="results-stars">
        <StarRating score={score} maxScore={maxPossible} />
      </div>

      <div className="results-message">
        <p>{getMessage(percentage)}</p>
      </div>

      <div className="results-stats card">
        <div className="stat-row">
          <span className="stat-label">Score</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Correct</span>
          <span className="stat-value">
            {correctCount} / {totalQuestions}
          </span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Best Streak</span>
          <span className="stat-value">🔥 {maxStreak}</span>
        </div>
      </div>

      <div className="results-actions">
        <button className="btn btn-primary" onClick={handleRetry}>
          Try Again
        </button>
        <button className="btn btn-secondary" onClick={handleTopics}>
          Choose Another Topic
        </button>
      </div>
    </div>
  )
}
