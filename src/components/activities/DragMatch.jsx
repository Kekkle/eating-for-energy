import { useState, useCallback } from 'react'
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import './DragMatch.css'
import './emoji-tile.css'

function DraggableFood({ id, emoji, disabled, matched, result, onTap }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || !!matched,
  })

  let stateClass = ''
  if (isDragging) stateClass = 'emoji-tile-dragging'
  else if (result === true) stateClass = 'emoji-tile-correct'
  else if (result === false) stateClass = 'emoji-tile-incorrect'
  else if (matched) stateClass = 'emoji-tile-used'

  return (
    <div
      ref={setNodeRef}
      className={`emoji-tile ${stateClass}`}
      onClick={() => !disabled && !matched && onTap(id)}
      {...listeners}
      {...attributes}
    >
      <span className="emoji-tile-icon">{emoji}</span>
    </div>
  )
}

function DroppableTarget({ id, emoji, isOver, matched, result, onTap }) {
  const { setNodeRef } = useDroppable({ id })

  let stateClass = ''
  if (result === true) stateClass = 'emoji-tile-correct'
  else if (result === false) stateClass = 'emoji-tile-incorrect'
  else if (matched) stateClass = 'emoji-tile-selected'
  else if (isOver) stateClass = 'dm-target-hover'

  return (
    <div
      ref={setNodeRef}
      className={`emoji-tile ${stateClass}`}
      onClick={onTap}
      style={{ cursor: onTap ? 'pointer' : 'default' }}
    >
      <span className="emoji-tile-icon">{emoji}</span>
    </div>
  )
}

export default function DragMatch({ question, onAnswer }) {
  const [matches, setMatches] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [overId, setOverId] = useState(null)

  const [shuffledTargets] = useState(() =>
    [...question.pairs.map((p) => p.to)].sort(() => Math.random() - 0.5)
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } })
  )

  const pairByFrom = Object.fromEntries(question.pairs.map((p) => [p.from, p]))
  const pairByTo = Object.fromEntries(question.pairs.map((p) => [p.to, p]))
  const reverseMatches = Object.fromEntries(
    Object.entries(matches).map(([k, v]) => [v, k])
  )

  const handleTapFrom = useCallback(
    (fromItem) => {
      if (submitted || matches[fromItem]) return
      setSelectedFrom((prev) => (prev === fromItem ? null : fromItem))
    },
    [submitted, matches]
  )

  const handleTapTo = useCallback(
    (toItem) => {
      if (submitted || !selectedFrom) return

      if (reverseMatches[toItem]) {
        setMatches((prev) => {
          const next = { ...prev }
          delete next[reverseMatches[toItem]]
          return next
        })
      }

      setMatches((prev) => ({ ...prev, [selectedFrom]: toItem }))
      setSelectedFrom(null)
    },
    [submitted, selectedFrom, reverseMatches]
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

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
    setSelectedFrom(null)
  }
  const handleDragOver = (event) => setOverId(event.over?.id || null)

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)
    setOverId(null)

    if (over && pairByTo[over.id]) {
      if (reverseMatches[over.id]) {
        setMatches((prev) => {
          const next = { ...prev }
          delete next[reverseMatches[over.id]]
          return next
        })
      }
      setMatches((prev) => ({ ...prev, [active.id]: over.id }))
    }
  }

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

  const activePair = activeId ? pairByFrom[activeId] : null

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="dm-container card">
        <h2 className="dm-question">{question.question}</h2>
        <p className="game-instruction">{question.instruction}</p>

        <div className="dm-game-area">
          <div className="dm-column">
            {question.pairs.map((pair) => (
              <div key={pair.from} className="dm-tile-slot">
                <DraggableFood
                  id={pair.from}
                  emoji={pair.fromEmoji}
                  disabled={submitted}
                  matched={matches[pair.from]}
                  result={results ? results[pair.from] : null}
                  onTap={handleTapFrom}
                />
                {matches[pair.from] && !submitted && (
                  <button className="dm-undo" onClick={() => clearMatch(pair.from)}>
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="dm-arrows">
            {question.pairs.map((pair) => (
              <div
                key={pair.from}
                className={`dm-arrow ${matches[pair.from] ? 'dm-arrow-active' : ''}`}
              >
                →
              </div>
            ))}
          </div>

          <div className="dm-column">
            {shuffledTargets.map((targetName) => {
              const pair = pairByTo[targetName]
              const matchedFrom = reverseMatches[targetName]
              return (
                <DroppableTarget
                  key={targetName}
                  id={targetName}
                  emoji={pair.toEmoji}
                  isOver={overId === targetName}
                  matched={!!matchedFrom}
                  result={results && matchedFrom ? results[matchedFrom] : null}
                  onTap={
                    !submitted && selectedFrom && !matchedFrom
                      ? () => handleTapTo(targetName)
                      : undefined
                  }
                />
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

      <DragOverlay dropAnimation={null}>
        {activePair && (
          <div className="emoji-tile-overlay">
            <span className="emoji-tile-icon">{activePair.fromEmoji}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
