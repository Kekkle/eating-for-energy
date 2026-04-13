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
import './CreateDrink.css'
import './emoji-tile.css'

function DraggableIngredient({ id, emoji, disabled, onTap }) {
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

function DroppableCup({ children, isOver }) {
  const { setNodeRef } = useDroppable({ id: 'cup' })

  return (
    <div
      ref={setNodeRef}
      className={`cd-cup ${isOver ? 'cd-cup-hover' : ''}`}
    >
      {children}
    </div>
  )
}

export default function CreateDrink({ question, onAnswer }) {
  const [cup, setCup] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [activeId, setActiveId] = useState(null)

  const maxItems = question.maxIngredients || 4

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } })
  )

  const ingredientMap = Object.fromEntries(
    question.ingredients.map((ing) => [ing.name, ing])
  )

  const addIngredient = useCallback(
    (name) => {
      if (submitted || cup.length >= maxItems || cup.includes(name)) return
      setCup((prev) => [...prev, name])
    },
    [submitted, cup, maxItems]
  )

  const removeIngredient = useCallback(
    (name) => {
      if (submitted) return
      setCup((prev) => prev.filter((i) => i !== name))
    },
    [submitted]
  )

  const handleDragStart = (event) => setActiveId(event.active.id)

  const handleDragEnd = (event) => {
    setActiveId(null)
    const { active, over } = event
    if (over?.id === 'cup') {
      addIngredient(active.id)
    }
  }

  const handleSubmit = () => {
    if (cup.length === 0 || submitted) return
    setSubmitted(true)
    const hasHealthy = cup.some((name) => {
      const ing = ingredientMap[name]
      return ing.healthy === true
    })
    const hasUnhealthy = cup.some((name) => {
      const ing = ingredientMap[name]
      return ing.healthy === false
    })
    onAnswer(hasHealthy && !hasUnhealthy, question.explanation)
  }

  const activeIngredient = activeId ? ingredientMap[activeId] : null

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="cd-container card">
        <h2 className="cd-question">{question.question}</h2>
        <p className="game-instruction">{question.instruction}</p>

        <div className="cd-workspace">
          <div className="cd-cup-area">
            <DroppableCup isOver={activeId !== null}>
              <div
                className="cd-cup-liquid"
                style={{ height: `${Math.min((cup.length / maxItems) * 100, 100)}%` }}
              />
              <div className="cd-cup-items">
                {cup.length === 0 && (
                  <p className="cd-cup-empty">Drop here!</p>
                )}
                {cup.map((name) => {
                  const ing = ingredientMap[name]
                  return (
                    <button
                      key={name}
                      className="cd-cup-emoji-btn"
                      onClick={() => removeIngredient(name)}
                      disabled={submitted}
                    >
                      {ing.emoji}
                    </button>
                  )
                })}
              </div>
            </DroppableCup>
            <p className="cd-cup-count">{cup.length}/{maxItems}</p>
          </div>

          <div className="cd-ingredients">
            <div className="emoji-tile-grid">
              {question.ingredients.map((ing) => {
                const inCup = cup.includes(ing.name)
                return (
                  <DraggableIngredient
                    key={ing.name}
                    id={ing.name}
                    emoji={ing.emoji}
                    disabled={submitted || inCup || cup.length >= maxItems}
                    onTap={addIngredient}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {cup.length > 0 && !submitted && (
          <button className="btn btn-primary cd-submit" onClick={handleSubmit}>
            Create My Drink! 💧
          </button>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeIngredient && (
          <div className="emoji-tile-overlay">
            <span className="emoji-tile-icon">{activeIngredient.emoji}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
