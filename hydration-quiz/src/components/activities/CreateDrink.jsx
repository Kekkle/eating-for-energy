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

function IngredientContent({ item }) {
  if (item.image) {
    return <img className="emoji-tile-img" src={item.image} alt={item.name} />
  }
  return <span className="emoji-tile-icon">{item.emoji}</span>
}

function DraggableIngredient({ id, item, disabled, onTap }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  })
  const hasImage = !!item.image

  return (
    <div
      ref={setNodeRef}
      className={`emoji-tile ${hasImage ? 'cd-img-tile' : ''} ${isDragging ? 'emoji-tile-dragging' : ''} ${disabled ? 'emoji-tile-used' : ''}`}
      onClick={() => !disabled && onTap(id)}
      {...listeners}
      {...attributes}
    >
      <IngredientContent item={item} />
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
      <img
        className="cd-cup-img"
        src="/hydration-quiz/images/water-glass.png"
        alt="Water glass"
      />
      {children}
    </div>
  )
}

export default function CreateDrink({ question, onAnswer }) {
  const [cup, setCup] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)
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

    const itemResults = {}
    let allCorrect = true
    cup.forEach((name) => {
      const ing = ingredientMap[name]
      const correct = ing.healthy === true
      itemResults[name] = correct
      if (!correct) allCorrect = false
    })

    if (allCorrect && cup.every((name) => ingredientMap[name].healthy)) {
      const hasHealthy = cup.some((name) => ingredientMap[name].healthy)
      if (!hasHealthy) allCorrect = false
    }

    setResults(itemResults)
    setSubmitted(true)

    if (allCorrect) {
      onAnswer(true, question.explanation)
    }
  }

  const handleTryAgain = () => {
    const keptItems = cup.filter((name) => ingredientMap[name].healthy)
    setCup(keptItems)
    setSubmitted(false)
    setResults(null)
  }

  const activeIngredient = activeId ? ingredientMap[activeId] : null
  const hasWrongAnswers =
    submitted && results && Object.values(results).some((v) => !v)

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
              <div className="cd-cup-items">
                {cup.length === 0 && (
                  <p className="cd-cup-empty">Drop here!</p>
                )}
                {cup.map((name) => {
                  const ing = ingredientMap[name]
                  let resultClass = ''
                  if (results) {
                    resultClass = results[name]
                      ? 'cd-cup-emoji-correct'
                      : 'cd-cup-emoji-incorrect'
                  }
                  return (
                    <button
                      key={name}
                      className={`cd-cup-emoji-btn ${ing.image ? 'cd-cup-img-btn' : ''} ${resultClass}`}
                      onClick={() => removeIngredient(name)}
                      disabled={submitted}
                    >
                      <IngredientContent item={ing} />
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
                    item={ing}
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

        {hasWrongAnswers && (
          <div className="game-inline-feedback">
            <span className="game-inline-feedback-icon">💡</span>
            <p className="game-inline-feedback-text">
              Not quite! The red ingredients don't belong. Try again!
            </p>
            <button className="btn btn-primary cd-submit" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeIngredient && (
          <div className={`emoji-tile-overlay ${activeIngredient.image ? 'cd-img-tile-overlay' : ''}`}>
            <IngredientContent item={activeIngredient} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
