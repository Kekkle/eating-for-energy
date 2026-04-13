import { useState } from 'react'
import './MatchingPairs.css'

export default function MatchingPairs({ question, onAnswer }) {
  const { pairs } = question
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matches, setMatches] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)

  const [shuffledRight] = useState(() =>
    [...pairs].sort(() => Math.random() - 0.5).map((p) => p.right)
  )

  const matchedLefts = new Set(Object.keys(matches))
  const matchedRights = new Set(Object.values(matches))

  const handleLeftClick = (leftItem) => {
    if (submitted || matchedLefts.has(leftItem)) return
    setSelectedLeft(leftItem)
  }

  const handleRightClick = (rightItem) => {
    if (submitted || matchedRights.has(rightItem) || selectedLeft === null) return
    setMatches((prev) => ({ ...prev, [selectedLeft]: rightItem }))
    setSelectedLeft(null)
  }

  const undoMatch = (leftItem) => {
    if (submitted) return
    setMatches((prev) => {
      const next = { ...prev }
      delete next[leftItem]
      return next
    })
  }

  const handleSubmit = () => {
    if (Object.keys(matches).length !== pairs.length || submitted) return
    setSubmitted(true)

    const correctMap = Object.fromEntries(pairs.map((p) => [p.left, p.right]))
    const pairResults = {}
    let allCorrect = true
    Object.entries(matches).forEach(([left, right]) => {
      const correct = correctMap[left] === right
      pairResults[left] = correct
      if (!correct) allCorrect = false
    })
    setResults(pairResults)
    onAnswer(allCorrect, question.explanation)
  }

  const allMatched = Object.keys(matches).length === pairs.length

  return (
    <div className="mp-container card">
      <h2 className="mp-question">{question.question}</h2>
      {question.instruction && (
        <p className="game-instruction">{question.instruction}</p>
      )}

      <div className="mp-columns">
        <div className="mp-column">
          {pairs.map((pair) => {
            const isMatched = matchedLefts.has(pair.left)
            const isSelected = selectedLeft === pair.left
            let resultClass = ''
            if (results) {
              resultClass = results[pair.left] ? 'mp-item-correct' : 'mp-item-incorrect'
            }

            return (
              <button
                key={pair.left}
                className={`mp-item mp-item-left ${isSelected ? 'mp-item-selected' : ''} ${isMatched ? 'mp-item-matched' : ''} ${resultClass}`}
                onClick={() => isMatched ? undoMatch(pair.left) : handleLeftClick(pair.left)}
                disabled={submitted}
              >
                {pair.leftEmoji && <span className="mp-item-emoji">{pair.leftEmoji}</span>}
                <span className="mp-item-text">{pair.left}</span>
              </button>
            )
          })}
        </div>

        <div className="mp-column">
          {shuffledRight.map((right) => {
            const isMatched = matchedRights.has(right)
            const matchingLeft = Object.entries(matches).find(([, r]) => r === right)?.[0]
            let resultClass = ''
            if (results && matchingLeft) {
              resultClass = results[matchingLeft] ? 'mp-item-correct' : 'mp-item-incorrect'
            }

            return (
              <button
                key={right}
                className={`mp-item mp-item-right ${isMatched ? 'mp-item-matched' : ''} ${selectedLeft && !isMatched ? 'mp-item-target' : ''} ${resultClass}`}
                onClick={() => handleRightClick(right)}
                disabled={submitted || isMatched}
              >
                <span className="mp-item-text">{right}</span>
              </button>
            )
          })}
        </div>
      </div>

      {allMatched && !submitted && (
        <button className="btn btn-primary mp-submit" onClick={handleSubmit}>
          Check Matches
        </button>
      )}
    </div>
  )
}
