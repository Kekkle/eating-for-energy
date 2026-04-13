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

function DraggableTile({ id, emoji, filter, disabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  })

  return (
    <div
      ref={setNodeRef}
      className={`emoji-tile ${isDragging ? 'emoji-tile-dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <span className="emoji-tile-icon" style={filter ? { filter } : undefined}>{emoji}</span>
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
    setSubmitted(true)

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
    onAnswer(allCorrect, question.explanation)
  }

  const activeItem = activeId ? itemMap[activeId] : null

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
          <div className="emoji-tile-grid">
            {pool.map((name) => {
              const item = itemMap[name]
              return (
                <DraggableTile
                  key={name}
                  id={name}
                  emoji={item.emoji}
                  filter={item.filter}
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
                    ? 'emoji-tile-correct'
                    : 'emoji-tile-incorrect'
                  : ''
                return (
                  <button
                    key={name}
                    className={`emoji-tile ${resultClass}`}
                    onClick={() => moveBackToPool(name)}
                    disabled={submitted}
                    style={{ cursor: submitted ? 'default' : 'pointer' }}
                  >
                    <span className="emoji-tile-icon" style={item.filter ? { filter: item.filter } : undefined}>{item.emoji}</span>
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
      </div>

      <DragOverlay dropAnimation={null}>
        {activeItem && (
          <div className="emoji-tile-overlay">
            <span className="emoji-tile-icon" style={activeItem.filter ? { filter: activeItem.filter } : undefined}>{activeItem.emoji}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
