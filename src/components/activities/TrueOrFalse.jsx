import { useState } from 'react'
import './TrueOrFalse.css'

export default function TrueOrFalse({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (value) => {
    if (submitted) return
    setSelected(value)
    setSubmitted(true)
    const isCorrect = value === question.answer
    onAnswer(isCorrect, question.explanation)
  }

  return (
    <div className="tf-container card">
      <h2 className="tf-statement">{question.statement}</h2>

      <div className="tf-buttons">
        <button
          className={`tf-btn tf-btn-true ${
            submitted && question.answer === true ? 'tf-btn-correct' : ''
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
            submitted && question.answer === false ? 'tf-btn-correct' : ''
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
    </div>
  )
}
