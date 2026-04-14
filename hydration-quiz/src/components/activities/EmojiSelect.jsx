import { useState } from 'react'
import './EmojiSelect.css'
import './emoji-tile.css'

function Droplet({ color }) {
  return (
    <svg viewBox="0 0 32 44" width="36" height="50" aria-hidden="true">
      <path
        d="M16 0C16 0 0 22 0 30C0 38 7.2 44 16 44C24.8 44 32 38 32 30C32 22 16 0 16 0Z"
        fill={color}
        stroke="#ccc"
        strokeWidth="0.5"
      />
    </svg>
  )
}

function shuffleWithMapping(options, answers) {
  const indexed = options.map((opt, i) => ({
    opt,
    originalIndex: i,
    isCorrect: answers.includes(i),
  }))
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]]
  }
  const shuffledOptions = indexed.map((item) => item.opt)
  const newAnswers = indexed
    .map((item, i) => (item.isCorrect ? i : -1))
    .filter((i) => i !== -1)
  return { shuffledOptions, newAnswers }
}

export default function EmojiSelect({ question, onAnswer }) {
  const [{ shuffledOptions, newAnswers }] = useState(() =>
    shuffleWithMapping(question.options, question.answers)
  )
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)

  const isDropletMode = shuffledOptions.some((opt) => opt.dropletColor)
  const correctSet = new Set(newAnswers)

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

    if (question.selectCount && selected.size < correctSet.size) {
      const remaining = correctSet.size - selected.size
      setTooFewPrompt(
        `There's ${remaining} more item${remaining > 1 ? 's' : ''} left to find!`
      )
      return
    }

    const isCorrect =
      selected.size === correctSet.size &&
      [...selected].every((i) => correctSet.has(i))

    const itemResults = {}
    shuffledOptions.forEach((_, i) => {
      const isSelected = selected.has(i)
      const shouldBeSelected = correctSet.has(i)
      if (isSelected) {
        itemResults[i] = shouldBeSelected
      }
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
  const [tooFewPrompt, setTooFewPrompt] = useState(null)

  return (
    <div className="es-container card">
      <h2 className="es-question">{question.question}</h2>
      <p className="game-instruction">{question.instruction}</p>

      {question.selectCount && (
        <p className="es-counter">
          {selected.size} / {question.selectCount} selected
        </p>
      )}

      {tooFewPrompt && (
        <div className="es-too-few-overlay">
          <div className="es-too-few-card">
            <p className="es-too-few-text">{tooFewPrompt}</p>
            <button
              className="btn btn-primary"
              onClick={() => setTooFewPrompt(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className={isDropletMode ? 'es-droplet-row' : 'emoji-tile-grid es-grid'}>
        {shuffledOptions.map((option, index) => {
          const isSelected = selected.has(index)
          const isCorrectOption = correctSet.has(index)
          let stateClass = ''
          if (submitted && results) {
            if (isSelected && results[index] === true) {
              stateClass = isDropletMode ? 'es-droplet-correct' : 'emoji-tile-correct'
            } else if (isSelected && results[index] === false) {
              stateClass = isDropletMode ? 'es-droplet-incorrect' : 'emoji-tile-incorrect'
            }
          } else if (isSelected) {
            stateClass = isDropletMode ? 'es-droplet-selected' : 'emoji-tile-selected'
          }

          if (isDropletMode) {
            return (
              <button
                key={index}
                className={`es-droplet-tile ${stateClass}`}
                onClick={() => toggleOption(index)}
                disabled={submitted}
              >
                <Droplet color={option.dropletColor} />
              </button>
            )
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

      {hasWrongAnswers && (
        <div className="game-inline-feedback">
          <span className="game-inline-feedback-icon">💡</span>
          <p className="game-inline-feedback-text">
            Not quite! The red items aren't right. Try again!
          </p>
          <button className="btn btn-primary es-submit" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
