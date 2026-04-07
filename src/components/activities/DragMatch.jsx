import { useState, useCallback } from 'react'
import './DragMatch.css'

export default function DragMatch({ question, onAnswer }) {
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [matches, setMatches] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)

  const shuffledTargets = useState(() =>
    [...question.pairs.map((p) => p.to)].sort(() => Math.random() - 0.5)
  )[0]

  const handleFromClick = useCallback(
    (fromItem) => {
      if (submitted) return
      setSelectedFrom((prev) => (prev === fromItem ? null : fromItem))
    },
    [submitted]
  )

  const handleToClick = useCallback(
    (toItem) => {
      if (submitted || !selectedFrom) return

      const existing = Object.entries(matches).find(([, v]) => v === toItem)
      if (existing) {
        setMatches((prev) => {
          const next = { ...prev }
          delete next[existing[0]]
          return next
        })
      }

      setMatches((prev) => ({ ...prev, [selectedFrom]: toItem }))
      setSelectedFrom(null)
    },
    [submitted, selectedFrom, matches]
  )

  const clearMatch = useCallback(
    (fromItem) => {
      if (submitted) return
      setMatches((prev) => {
        const next = { ...prev }
        delete next[fromItem]
        return next
      })
    },
    [submitted]
  )

  const handleSubmit = () => {
    if (Object.keys(matches).length < question.pairs.length || submitted) return
    setSubmitted(true)

    const correctMap = Object.fromEntries(question.pairs.map((p) => [p.from, p.to]))
    const pairResults = {}
    let allCorrect = true

    Object.entries(matches).forEach(([from, to]) => {
      const correct = correctMap[from] === to
      pairResults[from] = correct
      if (!correct) allCorrect = false
    })

    setResults(pairResults)
    onAnswer(allCorrect, question.explanation)
  }

  return (
    <div className="dm-container card">
      <h2 className="dm-question">{question.question}</h2>
      <p className="dm-instruction">Tap a food on the left, then tap its healthier swap on the right.</p>

      <div className="dm-pairs">
        <div className="dm-column">
          <p className="dm-column-label">Swap this...</p>
          {question.pairs.map((pair) => (
            <button
              key={pair.from}
              className={`dm-item dm-from ${
                selectedFrom === pair.from ? 'dm-item-active' : ''
              } ${matches[pair.from] ? 'dm-item-matched' : ''} ${
                results
                  ? results[pair.from]
                    ? 'dm-item-correct'
                    : 'dm-item-incorrect'
                  : ''
              }`}
              onClick={() =>
                matches[pair.from] && !submitted
                  ? clearMatch(pair.from)
                  : handleFromClick(pair.from)
              }
              disabled={submitted}
            >
              {pair.from}
              {matches[pair.from] && !submitted && (
                <span className="dm-clear">×</span>
              )}
              {results && (
                <span className="dm-result-icon">
                  {results[pair.from] ? '✓' : '✗'}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="dm-connector">
          {question.pairs.map((pair) => (
            <div
              key={pair.from}
              className={`dm-line ${matches[pair.from] ? 'dm-line-active' : ''}`}
            >
              {matches[pair.from] ? '→' : '·'}
            </div>
          ))}
        </div>

        <div className="dm-column">
          <p className="dm-column-label">...for this</p>
          {shuffledTargets.map((target) => {
            const matchedBy = Object.entries(matches).find(([, v]) => v === target)
            return (
              <button
                key={target}
                className={`dm-item dm-to ${
                  matchedBy ? 'dm-item-matched' : ''
                } ${selectedFrom ? 'dm-item-target' : ''} ${
                  results && matchedBy
                    ? results[matchedBy[0]]
                      ? 'dm-item-correct'
                      : 'dm-item-incorrect'
                    : ''
                }`}
                onClick={() => handleToClick(target)}
                disabled={submitted || !selectedFrom}
              >
                {target}
              </button>
            )
          })}
        </div>
      </div>

      {Object.keys(matches).length === question.pairs.length && !submitted && (
        <button className="btn btn-primary dm-submit" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}
    </div>
  )
}
