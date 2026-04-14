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
import './DragSort.css'
import './emoji-tile.css'

function TileContent({ item }) {
  if (item.image) {
    return <img className="emoji-tile-img" src={item.image} alt={item.name} />
  }
  return (
    <span className="emoji-tile-icon" style={item.filter ? { filter: item.filter } : undefined}>
      {item.emoji}
    </span>
  )
}

function DraggableTile({ id, item, disabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  })

  const tileClass = item.image
    ? `ds-img-tile ${isDragging ? 'ds-img-tile-dragging' : ''}`
    : `emoji-tile ${isDragging ? 'emoji-tile-dragging' : ''}`

  return (
    <div
      ref={setNodeRef}
      className={tileClass}
      {...listeners}
      {...attributes}
    >
      <TileContent item={item} />
    </div>
  )
}

function CategoryDropZone({ id, name, children, isOver }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div className="ds-category">
      <h3 className="ds-category-title">{name}</h3>
      <div
        ref={setNodeRef}
        className={`drop-zone ${isOver ? 'drop-zone-over' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}

export default function DragSort({ question, onAnswer }) {
  const allItems = question.categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.name }))
  )

  const itemMap = Object.fromEntries(allItems.map((i) => [i.name, i]))
  const correctMap = Object.fromEntries(allItems.map((i) => [i.name, i.category]))

  const [pool, setPool] = useState(() =>
    allItems.map((i) => i.name).sort(() => Math.random() - 0.5)
  )
  const [bins, setBins] = useState(() =>
    Object.fromEntries(question.categories.map((c) => [c.name, []]))
  )
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } })
  )

  const moveToCategory = useCallback(
    (itemName, categoryName) => {
      if (submitted) return
      setPool((prev) => prev.filter((n) => n !== itemName))
      setBins((prev) => {
        const next = { ...prev }
        Object.keys(next).forEach((key) => {
          next[key] = next[key].filter((n) => n !== itemName)
        })
        next[categoryName] = [...next[categoryName], itemName]
        return next
      })
    },
    [submitted]
  )

  const moveBackToPool = useCallback(
    (itemName) => {
      if (submitted) return
      setBins((prev) => {
        const next = {}
        Object.entries(prev).forEach(([k, v]) => {
          next[k] = v.filter((n) => n !== itemName)
        })
        return next
      })
      setPool((prev) => [...prev, itemName])
    },
    [submitted]
  )

  const handleDragStart = (event) => setActiveId(event.active.id)
  const handleDragOver = (event) => setOverId(event.over?.id || null)

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)
    setOverId(null)
    if (over && bins[over.id] !== undefined) {
      moveToCategory(active.id, over.id)
    }
  }

  const handleSubmit = () => {
    if (pool.length > 0 || submitted) return

    const itemResults = {}
    let allCorrect = true
    Object.entries(bins).forEach(([catName, items]) => {
      items.forEach((name) => {
        const correct = correctMap[name] === catName
        itemResults[name] = correct
        if (!correct) allCorrect = false
      })
    })
    setResults(itemResults)
    setSubmitted(true)

    if (allCorrect) {
      onAnswer(true, question.explanation)
    }
  }

  const handleTryAgain = () => {
    const incorrectItems = []
    const newBins = {}
    Object.entries(bins).forEach(([catName, items]) => {
      newBins[catName] = items.filter((name) => {
        if (correctMap[name] === catName) return true
        incorrectItems.push(name)
        return false
      })
    })
    setBins(newBins)
    setPool(incorrectItems)
    setSubmitted(false)
    setResults(null)
  }

  const activeItem = activeId ? itemMap[activeId] : null
  const hasImages = allItems.some((i) => i.image)
  const hasWrongAnswers =
    submitted && results && !Object.values(results).every(Boolean)

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="ds-container card">
        <h2 className="ds-question">{question.question}</h2>
        <p className="game-instruction">{question.instruction}</p>

        {pool.length > 0 && (
          <div className={hasImages ? 'ds-img-grid' : 'emoji-tile-grid'}>
            {pool.map((name) => {
              const item = itemMap[name]
              return (
                <DraggableTile
                  key={name}
                  id={name}
                  item={item}
                  disabled={submitted}
                />
              )
            })}
          </div>
        )}

        <div className="ds-categories">
          {question.categories.map((cat) => (
            <CategoryDropZone
              key={cat.name}
              id={cat.name}
              name={cat.name}
              isOver={overId === cat.name}
            >
              {bins[cat.name].length === 0 && !submitted && (
                <p className="drop-zone-placeholder">Drop here</p>
              )}
              {bins[cat.name].map((name) => {
                const item = itemMap[name]
                const resultClass = results
                  ? results[name]
                    ? item.image ? 'ds-img-tile-correct' : 'emoji-tile-correct'
                    : item.image ? 'ds-img-tile-incorrect' : 'emoji-tile-incorrect'
                  : ''
                const baseClass = item.image ? 'ds-img-tile ds-img-tile-in-zone' : 'emoji-tile'
                return (
                  <button
                    key={name}
                    className={`${baseClass} ${resultClass}`}
                    onClick={() => moveBackToPool(name)}
                    disabled={submitted}
                    style={{ cursor: submitted ? 'default' : 'pointer' }}
                  >
                    <TileContent item={item} />
                  </button>
                )
              })}
            </CategoryDropZone>
          ))}
        </div>

        {pool.length === 0 && !submitted && (
          <button className="btn btn-primary ds-submit" onClick={handleSubmit}>
            Submit Answer
          </button>
        )}

        {hasWrongAnswers && (
          <div className="game-inline-feedback">
            <span className="game-inline-feedback-icon">💡</span>
            <p className="game-inline-feedback-text">
              Not quite! The red items are in the wrong category. Try again!
            </p>
            <button className="btn btn-primary ds-submit" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeItem && (
          <div className={activeItem.image ? 'ds-img-tile ds-img-tile-overlay' : 'emoji-tile-overlay'}>
            <TileContent item={activeItem} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
