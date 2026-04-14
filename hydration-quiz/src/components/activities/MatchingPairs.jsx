import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import './MatchingPairs.css'
import './emoji-tile.css'

export default function MatchingPairs({ question, onAnswer }) {
  const { pairs } = question
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matches, setMatches] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)
  const [mousePos, setMousePos] = useState(null)
  const [arrowStart, setArrowStart] = useState(null)

  const containerRef = useRef(null)
  const leftButtonRefs = useRef({})
  const rightButtonRefs = useRef({})

  const [shuffledRight] = useState(() =>
    [...pairs].sort(() => Math.random() - 0.5).map((p) => p.right)
  )

  const matchedLefts = new Set(Object.keys(matches))
  const matchedRights = new Set(Object.values(matches))

  const displayRight = useMemo(() => {
    const result = new Array(pairs.length).fill(null)
    pairs.forEach((pair, i) => {
      if (matches[pair.left]) {
        result[i] = matches[pair.left]
      }
    })
    const placedRights = new Set(result.filter(Boolean))
    const unmatchedRights = shuffledRight.filter((r) => !placedRights.has(r))
    let unmatchedIdx = 0
    for (let i = 0; i < result.length; i++) {
      if (result[i] === null) {
        result[i] = unmatchedRights[unmatchedIdx++]
      }
    }
    return result
  }, [pairs, matches, shuffledRight])

  useEffect(() => {
    if (!selectedLeft) {
      setArrowStart(null)
      setMousePos(null)
      return
    }
    const btn = leftButtonRefs.current[selectedLeft]
    const container = containerRef.current
    if (!btn || !container) return
    const btnRect = btn.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    setArrowStart({
      x: btnRect.right - containerRect.left,
      y: btnRect.top - containerRect.top + btnRect.height / 2,
    })
  }, [selectedLeft])

  const handlePointerMove = useCallback(
    (e) => {
      if (!selectedLeft) return
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    },
    [selectedLeft]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener('pointermove', handlePointerMove)
    return () => container.removeEventListener('pointermove', handlePointerMove)
  }, [handlePointerMove])

  const handleLeftClick = (leftItem) => {
    if (submitted || matchedLefts.has(leftItem)) return
    if (selectedLeft === leftItem) {
      setSelectedLeft(null)
      return
    }
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

    const correctMap = Object.fromEntries(pairs.map((p) => [p.left, p.right]))
    const pairResults = {}
    let allCorrect = true
    Object.entries(matches).forEach(([left, right]) => {
      const correct = correctMap[left] === right
      pairResults[left] = correct
      if (!correct) allCorrect = false
    })
    setResults(pairResults)
    setSubmitted(true)

    if (allCorrect) {
      onAnswer(true, question.explanation)
    }
  }

  const handleTryAgain = () => {
    const correctMap = Object.fromEntries(pairs.map((p) => [p.left, p.right]))
    const keptMatches = {}
    Object.entries(matches).forEach(([left, right]) => {
      if (correctMap[left] === right) {
        keptMatches[left] = right
      }
    })
    setMatches(keptMatches)
    setSubmitted(false)
    setResults(null)
  }

  const allMatched = Object.keys(matches).length === pairs.length
  const showArrow = selectedLeft && arrowStart && mousePos
  const hasWrongAnswers =
    submitted && results && !Object.values(results).every(Boolean)

  return (
    <div className="mp-container card" ref={containerRef} style={{ position: 'relative' }}>
      <h2 className="mp-question">{question.question}</h2>
      {question.instruction && (
        <p className="game-instruction">{question.instruction}</p>
      )}

      <svg className="mp-arrow-overlay" aria-hidden="true">
        <defs>
          <marker
            id="mp-arrowhead"
            markerWidth="5"
            markerHeight="4"
            refX="4.5"
            refY="2"
            orient="auto"
          >
            <path d="M0,0 L5,2 L0,4 Z" fill="var(--color-cyan)" />
          </marker>
        </defs>

        {showArrow && (
          <line
            x1={arrowStart.x}
            y1={arrowStart.y}
            x2={mousePos.x}
            y2={mousePos.y}
            className="mp-arrow-line"
            markerEnd="url(#mp-arrowhead)"
          />
        )}
      </svg>

      <div className="mp-rows">
        {pairs.map((pair, rowIndex) => {
          const isMatched = matchedLefts.has(pair.left)
          const isSelected = selectedLeft === pair.left
          let leftResultClass = ''
          if (results) {
            leftResultClass = results[pair.left]
              ? 'mp-item-correct'
              : 'mp-item-incorrect'
          }

          const right = displayRight[rowIndex]
          const isRightMatched = matchedRights.has(right)
          const matchingLeft = Object.entries(matches).find(
            ([, r]) => r === right
          )?.[0]
          let rightResultClass = ''
          if (results && matchingLeft) {
            rightResultClass = results[matchingLeft]
              ? 'mp-item-correct'
              : 'mp-item-incorrect'
          }

          return (
            <div key={rowIndex} className="mp-row">
              <button
                data-left={pair.left}
                ref={(el) => {
                  leftButtonRefs.current[pair.left] = el
                }}
                className={`mp-item mp-item-left ${isSelected ? 'mp-item-selected' : ''} ${isMatched ? 'mp-item-matched' : ''} ${leftResultClass}`}
                onClick={() =>
                  isMatched ? undoMatch(pair.left) : handleLeftClick(pair.left)
                }
                disabled={submitted}
              >
                {pair.leftEmoji && (
                  <span className="mp-item-emoji">{pair.leftEmoji}</span>
                )}
                <span className="mp-item-text">{pair.left}</span>
              </button>
              <button
                ref={(el) => {
                  rightButtonRefs.current[right] = el
                }}
                className={`mp-item mp-item-right ${isRightMatched ? 'mp-item-matched' : ''} ${selectedLeft && !isRightMatched ? 'mp-item-target' : ''} ${rightResultClass}`}
                onClick={() => handleRightClick(right)}
                disabled={submitted || isRightMatched}
              >
                <span className="mp-item-text">{right}</span>
              </button>
            </div>
          )
        })}
      </div>

      {allMatched && !submitted && (
        <button className="btn btn-primary mp-submit" onClick={handleSubmit}>
          Check Matches
        </button>
      )}

      {hasWrongAnswers && (
        <div className="game-inline-feedback">
          <span className="game-inline-feedback-icon">💡</span>
          <p className="game-inline-feedback-text">
            Not quite! Check the red matches and try again.
          </p>
          <button className="btn btn-primary mp-submit" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
