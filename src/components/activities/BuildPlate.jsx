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
import './BuildPlate.css'
import './emoji-tile.css'

function DraggableFood({ id, emoji, disabled, onTap }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  })

  return (
    <div
      ref={setNodeRef}
      className={`emoji-tile ${isDragging ? 'emoji-tile-dragging' : ''} ${disabled ? 'emoji-tile-used' : ''}`}
      onClick={() => !disabled && onTap(id)}
      {...listeners}
      {...attributes}
    >
      <span className="emoji-tile-icon">{emoji}</span>
    </div>
  )
}

function DroppablePlate({ children, isOver }) {
  const { setNodeRef } = useDroppable({ id: 'plate' })

  return (
    <div
      ref={setNodeRef}
      className={`bp-plate ${isOver ? 'bp-plate-hover' : ''}`}
    >
      <div className="bp-plate-inner">
        {children}
      </div>
    </div>
  )
}

const GROUP_LABELS = {
  'starchy-carbs': '🌾',
  'fibre-carbs': '🥬',
  carbs: '🌾',
  protein: '🍗',
  fats: '🧈',
}

export default function BuildPlate({ question, onAnswer }) {
  const [plate, setPlate] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [activeId, setActiveId] = useState(null)

  const maxItems = question.maxItems || 5

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } })
  )

  const foodMap = Object.fromEntries(
    question.foods.map((f) => [f.name, f])
  )

  const addFood = useCallback(
    (name) => {
      if (submitted || plate.length >= maxItems || plate.includes(name)) return
      setPlate((prev) => [...prev, name])
    },
    [submitted, plate, maxItems]
  )

  const removeFood = useCallback(
    (name) => {
      if (submitted) return
      setPlate((prev) => prev.filter((n) => n !== name))
    },
    [submitted]
  )

  const handleDragStart = (event) => setActiveId(event.active.id)

  const handleDragEnd = (event) => {
    setActiveId(null)
    const { active, over } = event
    if (over?.id === 'plate') {
      addFood(active.id)
    }
  }

  const handleSubmit = () => {
    if (plate.length === 0 || submitted) return
    setSubmitted(true)

    const groupsOnPlate = new Set(
      plate.map((name) => foodMap[name].group).filter((g) => g !== 'none')
    )
    const hasAllGroups = question.requiredGroups.every((g) => groupsOnPlate.has(g))
    const hasNoJunk = !plate.some((name) => foodMap[name].group === 'none')

    onAnswer(hasAllGroups && hasNoJunk, question.explanation)
  }

  const groupsOnPlate = new Set(
    plate.map((name) => foodMap[name]?.group).filter((g) => g && g !== 'none')
  )

  const activeFood = activeId ? foodMap[activeId] : null

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="bp-container card">
        <h2 className="bp-question">{question.question}</h2>
        <p className="game-instruction">{question.instruction}</p>

        <div className="bp-checklist">
          {question.requiredGroups.map((g) => (
            <span
              key={g}
              className={`bp-check ${groupsOnPlate.has(g) ? 'bp-check-done' : ''}`}
            >
              {GROUP_LABELS[g]} {groupsOnPlate.has(g) ? '✓' : '?'}
            </span>
          ))}
        </div>

        <div className="bp-workspace">
          <div className="bp-plate-area">
            <DroppablePlate isOver={activeId !== null}>
              {plate.length === 0 && (
                <p className="bp-plate-empty">Drop food here!</p>
              )}
              <div className="bp-plate-foods">
                {plate.map((name) => {
                  const food = foodMap[name]
                  return (
                    <button
                      key={name}
                      className="bp-plate-item"
                      onClick={() => removeFood(name)}
                      disabled={submitted}
                    >
                      {food.emoji}
                    </button>
                  )
                })}
              </div>
            </DroppablePlate>
            <p className="bp-plate-count">{plate.length}/{maxItems}</p>
          </div>

          <div className="bp-foods">
            <div className="emoji-tile-grid">
              {question.foods.map((food) => {
                const onPlate = plate.includes(food.name)
                return (
                  <DraggableFood
                    key={food.name}
                    id={food.name}
                    emoji={food.emoji}
                    disabled={submitted || onPlate || plate.length >= maxItems}
                    onTap={addFood}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {plate.length > 0 && !submitted && (
          <button className="btn btn-primary bp-submit" onClick={handleSubmit}>
            {question.submitLabel || 'Serve it up!'}
          </button>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeFood && (
          <div className="emoji-tile-overlay">
            <span className="emoji-tile-icon">{activeFood.emoji}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
