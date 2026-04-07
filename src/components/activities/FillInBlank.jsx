import { useState, useCallback } from 'react'
import './FillInBlank.css'

export default function FillInBlank({ question, onAnswer }) {
  const parts = question.template.split('|BLANK|')
  const blankCount = parts.length - 1

  const [filled, setFilled] = useState(Array(blankCount).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allWords = [...question.words, ...(question.distractors || [])]
  const [available, setAvailable] = useState(() =>
    [...allWords].sort(() => Math.random() - 0.5)
  )

  const placeWord = useCallback(
    (word) => {
      if (submitted) return
      const emptyIndex = filled.indexOf(null)
      if (emptyIndex === -1) return

      setFilled((prev) => {
        const next = [...prev]
        next[emptyIndex] = word
        return next
      })
      setAvailable((prev) => prev.filter((w) => w !== word))
    },
    [filled, submitted]
  )

  const removeWord = useCallback(
    (index) => {
      if (submitted) return
      const word = filled[index]
      if (!word) return

      setFilled((prev) => {
        const next = [...prev]
        next[index] = null
        return next
      })
      setAvailable((prev) => [...prev, word])
    },
    [filled, submitted]
  )

  const handleSubmit = () => {
    if (filled.includes(null) || submitted) return
    setSubmitted(true)

    const isCorrect = question.words.every(
      (word, i) => filled[i] === word
    )
    onAnswer(isCorrect, question.explanation)
  }

  return (
    <div className="fib-container card">
      <h2 className="fib-title">{question.question}</h2>

      <div className="fib-sentence">
        {parts.map((part, i) => (
          <span key={i}>
            <span>{part}</span>
            {i < blankCount && (
              <button
                className={`fib-blank ${filled[i] ? 'fib-blank-filled' : ''} ${
                  submitted && filled[i] === question.words[i]
                    ? 'fib-blank-correct'
                    : ''
                } ${
                  submitted && filled[i] && filled[i] !== question.words[i]
                    ? 'fib-blank-incorrect'
                    : ''
                }`}
                onClick={() => removeWord(i)}
                disabled={submitted}
              >
                {filled[i] || '______'}
              </button>
            )}
          </span>
        ))}
      </div>

      <div className="fib-word-bank">
        <p className="fib-bank-label">Tap a word to place it:</p>
        <div className="fib-words">
          {available.map((word) => (
            <button
              key={word}
              className="fib-word"
              onClick={() => placeWord(word)}
              disabled={submitted}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {!filled.includes(null) && !submitted && (
        <button className="btn btn-primary fib-submit" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}
    </div>
  )
}
