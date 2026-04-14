import { useState } from 'react'
import './TrueOrFalse.css'
import './emoji-tile.css'

export default function TrueOrFalse({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [wasWrong, setWasWrong] = useState(false)

  const handleSelect = (value) => {
    if (submitted) return
    setSelected(value)
    setSubmitted(true)

    const isCorrect = value === question.answer
    if (isCorrect) {
      onAnswer(true, question.explanation)
    } else {
      setWasWrong(true)
    }
  }

  const handleTryAgain = () => {
    setSelected(null)
    setSubmitted(false)
    setWasWrong(false)
  }

  return (
    <div className="tf-container card">
      <h2 className="tf-statement">{question.statement}</h2>

      <div className="tf-buttons">
        <button
          className={`tf-btn tf-btn-true ${
            submitted && selected === true && question.answer === true ? 'tf-btn-correct' : ''
          } ${
            submitted && selected === true && question.answer !== true
              ? 'tf-btn-incorrect'
              : ''
          }`}
          onClick={() => handleSelect(true)}
          disabled={submitted}
        >
          ✓ True
        </button>
        <button
          className={`tf-btn tf-btn-false ${
            submitted && selected === false && question.answer === false ? 'tf-btn-correct' : ''
          } ${
            submitted && selected === false && question.answer !== false
              ? 'tf-btn-incorrect'
              : ''
          }`}
          onClick={() => handleSelect(false)}
          disabled={submitted}
        >
          ✗ False
        </button>
      </div>

      {wasWrong && submitted && (
        <div className="game-inline-feedback">
          <span className="game-inline-feedback-icon">💡</span>
          <p className="game-inline-feedback-text">
            Not quite! Try the other one.
          </p>
          <button className="btn btn-primary" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
