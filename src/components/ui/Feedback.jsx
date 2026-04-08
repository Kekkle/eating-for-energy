import './Feedback.css'

export default function Feedback({ data, onNext, onReplay }) {
  if (!data) return null

  const { isCorrect, explanation, earnedPoints, streak } = data

  return (
    <div className="feedback-overlay animate-in">
      <div className={`feedback-card card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
        <div className="feedback-icon">
          {isCorrect ? '🎉' : '💡'}
        </div>
        <h3 className="feedback-heading">
          {isCorrect ? 'Nice one!' : 'Not quite!'}
        </h3>

        {earnedPoints > 0 && (
          <p className="feedback-points animate-pop">+{earnedPoints} points</p>
        )}

        {streak >= 3 && (
          <p className="feedback-streak">🔥 {streak} in a row!</p>
        )}

        {explanation && (
          <p className="feedback-explanation">{explanation}</p>
        )}

        <div className="feedback-actions">
          <button className="btn btn-primary feedback-next" onClick={onNext}>
            {isCorrect ? 'Keep Going!' : 'Next Question'}
          </button>
          {onReplay && (
            <button className="btn btn-secondary feedback-replay" onClick={onReplay}>
              Play it again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
