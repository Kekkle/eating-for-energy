import { useState } from 'react'
import './EmojiSelect.css'
import './emoji-tile.css'

export default function EmojiSelect({ question, onAnswer }) {
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
    <div className="es-container card">
      <h2 className="es-question">{question.question}</h2>
      <p className="game-instruction">{question.instruction}</p>

      <div className="emoji-tile-grid es-grid">
        {question.options.map((option, index) => {
          const isSelected = selected.has(index)
          const isCorrectOption = correctSet.has(index)
          let stateClass = ''
          if (submitted) {
            if (isCorrectOption) stateClass = 'emoji-tile-correct'
            else if (isSelected && !isCorrectOption) stateClass = 'emoji-tile-incorrect'
          } else if (isSelected) {
            stateClass = 'emoji-tile-selected'
          }

          return (
            <button
              key={index}
              className={`emoji-tile ${stateClass}`}
              onClick={() => toggleOption(index)}
              disabled={submitted}
              style={{ cursor: submitted ? 'default' : 'pointer' }}
            >
              <span className="emoji-tile-icon">{option.emoji}</span>
            </button>
          )
        })}
      </div>

      {selected.size > 0 && !submitted && (
        <button className="btn btn-primary es-submit" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}
    </div>
  )
}
