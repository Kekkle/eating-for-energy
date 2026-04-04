import { useState } from 'react'
import './MultipleChoice.css'

export default function MultipleChoice({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (index) => {
    if (submitted) return
    setSelected(index)
  }

  const handleSubmit = () => {
    if (selected === null || submitted) return
    setSubmitted(true)
    const isCorrect = selected === question.answer
    onAnswer(isCorrect, question.explanation)
  }

  return (
    <div className="mc-container card">
      <h2 className="mc-question">{question.question}</h2>

      <div className="mc-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`mc-option ${selected === index ? 'mc-option-selected' : ''} ${
              submitted && index === question.answer ? 'mc-option-correct' : ''
            } ${
              submitted && selected === index && index !== question.answer
                ? 'mc-option-incorrect'
                : ''
            }`}
            onClick={() => handleSelect(index)}
            disabled={submitted}
          >
            <span className="mc-option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="mc-option-text">{option}</span>
          </button>
        ))}
      </div>

      {selected !== null && !submitted && (
        <button className="btn btn-primary mc-submit" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}
    </div>
  )
}
