import { useState } from 'react'
import './MultiSelect.css'
import './emoji-tile.css'

export default function MultiSelect({ question, onAnswer }) {
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)

  const correctSet = new Set(question.answers)

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

    const isCorrect =
      selected.size === correctSet.size &&
      [...selected].every((i) => correctSet.has(i))

    const itemResults = {}
    selected.forEach((i) => {
      itemResults[i] = correctSet.has(i)
    })
    setResults(itemResults)
    setSubmitted(true)

    if (isCorrect) {
      onAnswer(true, question.explanation)
    }
  }

  const handleTryAgain = () => {
    const keptSelections = new Set()
    selected.forEach((i) => {
      if (correctSet.has(i)) keptSelections.add(i)
    })
    setSelected(keptSelections)
    setSubmitted(false)
    setResults(null)
  }

  const hasWrongAnswers =
    submitted && results && Object.values(results).some((v) => !v)

  return (
    <div className="ms-container card">
      <h2 className="ms-question">{question.question}</h2>
      {question.instruction && (
        <p className="ms-instruction">{question.instruction}</p>
      )}

      <div className="ms-options">
        {question.options.map((option, index) => {
          const isSelected = selected.has(index)
          let statusClass = ''
          if (submitted && results) {
            if (isSelected && results[index] === true) statusClass = 'ms-option-correct'
            else if (isSelected && results[index] === false) statusClass = 'ms-option-incorrect'
          }

          return (
            <button
              key={index}
              className={`ms-option ${isSelected && !submitted ? 'ms-option-selected' : ''} ${statusClass}`}
              onClick={() => toggleOption(index)}
              disabled={submitted}
            >
              <span className={`ms-checkbox ${isSelected ? 'ms-checkbox-checked' : ''} ${submitted && results && isSelected && results[index] === true ? 'ms-checkbox-correct' : ''} ${submitted && results && isSelected && results[index] === false ? 'ms-checkbox-incorrect' : ''}`}>
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

      {hasWrongAnswers && (
        <div className="game-inline-feedback">
          <span className="game-inline-feedback-icon">💡</span>
          <p className="game-inline-feedback-text">
            Not quite! The red selections aren't right. Try again!
          </p>
          <button className="btn btn-primary ms-submit" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
