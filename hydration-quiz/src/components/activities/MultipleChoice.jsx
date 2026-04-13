import { useState } from 'react'
import './MultipleChoice.css'

function shuffleOptions(options, correctIndex) {
  const indexed = options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }))
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]]
  }
  const shuffled = indexed.map((item) => item.opt)
  const newCorrect = indexed.findIndex((item) => item.isCorrect)
  return { shuffled, newCorrect }
}

export default function MultipleChoice({ question, onAnswer }) {
  const [{ shuffled, newCorrect }] = useState(() =>
    shuffleOptions(question.options, question.answer)
  )
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (index) => {
    if (submitted) return
    setSelected(index)
  }

  const handleSubmit = () => {
    if (selected === null || submitted) return
    setSubmitted(true)
    const isCorrect = selected === newCorrect
    onAnswer(isCorrect, question.explanation)
  }

  return (
    <div className="mc-container card">
      <h2 className="mc-question">{question.question}</h2>

      <div className="mc-options">
        {shuffled.map((option, index) => (
          <button
            key={index}
            className={`mc-option ${selected === index ? 'mc-option-selected' : ''} ${
              submitted && index === newCorrect ? 'mc-option-correct' : ''
            } ${
              submitted && selected === index && index !== newCorrect
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
