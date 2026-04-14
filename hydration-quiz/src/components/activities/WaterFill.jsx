import { useState, useRef, useCallback } from 'react'
import './WaterFill.css'

const SCALE_LABELS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

function snapToNearest5(pct) {
  return Math.round(pct / 5) * 5
}

function FillColumn({ item, value, onChange, result, disabled }) {
  const barRef = useRef(null)

  const handleClick = useCallback(
    (e) => {
      if (disabled) return
      const rect = barRef.current.getBoundingClientRect()
      const y = e.clientY - rect.top
      const rawPct = 100 - (y / rect.height) * 100
      const snapped = snapToNearest5(Math.max(0, Math.min(100, rawPct)))
      onChange(snapped)
    },
    [disabled, onChange]
  )

  let borderClass = ''
  if (result === true) borderClass = 'wf-col-correct'
  else if (result === false) borderClass = 'wf-col-incorrect'

  return (
    <div className={`wf-column ${borderClass}`}>
      <span className="wf-value">{value != null ? `${value}%` : '—'}</span>
      <div className="wf-bar" ref={barRef} onClick={handleClick}>
        <div className="wf-fill" style={{ height: `${value || 0}%` }} />
        <img className="wf-image" src={item.image} alt={item.name} />
      </div>
      <span className="wf-label">{item.name}</span>
    </div>
  )
}

export default function WaterFill({ question, onAnswer }) {
  const [values, setValues] = useState(() =>
    question.items.map(() => null)
  )
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)

  const tolerance = question.tolerance || 5

  const handleChange = useCallback(
    (index, pct) => {
      if (submitted) return
      setValues((prev) => {
        const next = [...prev]
        next[index] = pct
        return next
      })
    },
    [submitted]
  )

  const handleSubmit = () => {
    if (values.some((v) => v == null) || submitted) return

    const itemResults = question.items.map(
      (item, i) => Math.abs(values[i] - item.answer) <= tolerance
    )

    setResults(itemResults)
    setSubmitted(true)

    if (itemResults.every(Boolean)) {
      onAnswer(true, question.explanation)
    }
  }

  const handleTryAgain = () => {
    setValues((prev) =>
      prev.map((v, i) => (results[i] ? v : null))
    )
    setSubmitted(false)
    setResults(null)
  }

  const allFilled = values.every((v) => v != null)
  const hasWrong = submitted && results && results.some((r) => !r)

  return (
    <div className="wf-container card">
      <h2 className="wf-question">{question.question}</h2>
      <p className="game-instruction">{question.instruction}</p>

      <div className="wf-game-area">
        <div className="wf-scale">
          {SCALE_LABELS.slice()
            .reverse()
            .map((pct) => (
              <span key={pct} className="wf-scale-label">
                {pct}%
              </span>
            ))}
        </div>

        <div className="wf-columns">
          {question.items.map((item, i) => (
            <FillColumn
              key={item.name}
              item={item}
              value={values[i]}
              onChange={(pct) => handleChange(i, pct)}
              result={results ? results[i] : null}
              disabled={submitted}
            />
          ))}
        </div>
      </div>

      {allFilled && !submitted && (
        <button className="btn btn-primary wf-submit" onClick={handleSubmit}>
          Check Answers
        </button>
      )}

      {hasWrong && (
        <div className="game-inline-feedback">
          <span className="game-inline-feedback-icon">💡</span>
          <p className="game-inline-feedback-text">
            Not quite! The red columns are off — try adjusting them!
          </p>
          <button className="btn btn-primary wf-submit" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
