import { useState } from 'react'
import './MultiSelect.css'

export default function MultiSelect({ question, onAnswer }) {
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)

  const toggleOption = (index) => {
    if (submitted) return
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const handleSubmit = () => {
    if (selected.size === 0 || submitted) return
    setSubmitted(true)

    const correctSet = new Set(question.answers)
    const isCorrect =
      selected.size === correctSet.size &&
      [...selected].every((i) => correctSet.has(i))

    onAnswer(isCorrect, question.explanation)
  }

  const correctSet = new Set(question.answers)

  return (
    <div className="ms-container card">
      <h2 className="ms-question">{question.question}</h2>
      {question.instruction && (
        <p className="ms-instruction">{question.instruction}</p>
      )}

      <div className="ms-options">
        {question.options.map((option, index) => {
          const isSelected = selected.has(index)
          const isCorrectOption = correctSet.has(index)
          let statusClass = ''
          if (submitted) {
            if (isCorrectOption) statusClass = 'ms-option-correct'
            else if (isSelected && !isCorrectOption) statusClass = 'ms-option-incorrect'
          }

          return (
            <button
              key={index}
              className={`ms-option ${isSelected ? 'ms-option-selected' : ''} ${statusClass}`}
              onClick={() => toggleOption(index)}
              disabled={submitted}
            >
              <span className={`ms-checkbox ${isSelected ? 'ms-checkbox-checked' : ''} ${submitted && isCorrectOption ? 'ms-checkbox-correct' : ''}`}>
                {isSelected ? '✓' : ''}
              </span>
              <span className="ms-option-text">{option}</span>
            </button>
          )
        })}
      </div>

      {selected.size > 0 && !submitted && (
        <button className="btn btn-primary ms-submit" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}
    </div>
  )
}
