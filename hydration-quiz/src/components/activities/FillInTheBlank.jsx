import { useState } from 'react'
import './FillInTheBlank.css'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FillInTheBlank({ question, onAnswer }) {
  const blanks = question.blanks
  const [shuffledWordBank] = useState(() => shuffleArray(question.wordBank))
  const [filled, setFilled] = useState(Array(blanks.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const usedWords = filled.filter(Boolean)

  const fillBlank = (word) => {
    if (submitted) return
    const firstEmpty = filled.indexOf(null)
    if (firstEmpty === -1) return
    setFilled((prev) => {
      const next = [...prev]
      next[firstEmpty] = word
      return next
    })
  }

  const clearBlank = (index) => {
    if (submitted) return
    setFilled((prev) => {
      const next = [...prev]
      next[index] = null
      return next
    })
  }

  const handleSubmit = () => {
    if (filled.some((w) => w === null) || submitted) return
    setSubmitted(true)

    const isCorrect = blanks.every((answer, i) =>
      answer.toLowerCase() === filled[i]?.toLowerCase()
    )
    onAnswer(isCorrect, question.explanation)
  }

  const sentenceParts = question.sentence.split('_____')

  return (
    <div className="fib-container card">
      <h2 className="fib-question">{question.question}</h2>

      <div className="fib-sentence">
        {sentenceParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < blanks.length && (
              <button
                className={`fib-blank ${filled[i] ? 'fib-blank-filled' : ''} ${
                  submitted && filled[i]?.toLowerCase() === blanks[i].toLowerCase()
                    ? 'fib-blank-correct'
                    : ''
                } ${
                  submitted && filled[i] && filled[i]?.toLowerCase() !== blanks[i].toLowerCase()
                    ? 'fib-blank-incorrect'
                    : ''
                }`}
                onClick={() => clearBlank(i)}
                disabled={submitted || !filled[i]}
              >
                {filled[i] || '______'}
              </button>
            )}
          </span>
        ))}
      </div>

      <div className="fib-word-bank">
        <p className="fib-word-bank-label">Word bank:</p>
        <div className="fib-words">
          {shuffledWordBank.map((word) => {
            const isUsed = usedWords.includes(word)
            return (
              <button
                key={word}
                className={`fib-word ${isUsed ? 'fib-word-used' : ''}`}
                onClick={() => fillBlank(word)}
                disabled={submitted || isUsed}
              >
                {word}
              </button>
            )
          })}
        </div>
      </div>

      {filled.every((w) => w !== null) && !submitted && (
        <button className="btn btn-primary fib-submit" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}
    </div>
  )
}
