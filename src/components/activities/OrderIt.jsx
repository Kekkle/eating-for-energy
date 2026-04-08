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
import './OrderIt.css'
import './emoji-tile.css'

function DraggableStep({ id, emoji, text, disabled, onTap }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  })

  return (
    <button
      ref={setNodeRef}
      className={`oi-step-card ${isDragging ? 'oi-step-dragging' : ''} ${disabled ? 'oi-step-used' : ''}`}
      onClick={() => !disabled && onTap(id)}
      {...listeners}
      {...attributes}
    >
      <span className="oi-step-emoji">{emoji}</span>
      <span className="oi-step-text">{text}</span>
    </button>
  )
}

function DroppableSlot({ index, filled, resultClass, children, isOver, onRemove, disabled }) {
  const { setNodeRef } = useDroppable({ id: `slot-${index}` })

  return (
    <div
      ref={setNodeRef}
      className={`oi-slot ${filled ? 'oi-slot-filled' : 'oi-slot-empty'} ${isOver ? 'oi-slot-hover' : ''} ${resultClass}`}
    >
      <span className="oi-slot-num">{index + 1}</span>
      {filled ? (
        <button
          className="oi-slot-content"
          onClick={() => onRemove()}
          disabled={disabled}
        >
          {children}
        </button>
      ) : (
        <span className="oi-slot-placeholder">Drop here</span>
      )}
    </div>
  )
}

export default function OrderIt({ question, onAnswer }) {
  const numSteps = question.steps.length
  const correctOrder = question.steps.map((s) => s.text)

  const [board, setBoard] = useState(() => {
    const shuffled = [...correctOrder]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return { pool: shuffled, slots: Array(numSteps).fill(null) }
  })
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [overSlot, setOverSlot] = useState(null)

  const { pool, slots } = board

  const stepMap = Object.fromEntries(
    question.steps.map((s) => [s.text, s])
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } })
  )

  const placeInSlot = useCallback(
    (stepText, slotIndex) => {
      if (submitted) return
      setBoard((prev) => {
        const nextSlots = [...prev.slots]
        let nextPool = prev.pool.filter((t) => t !== stepText)

        const existingIndex = nextSlots.indexOf(stepText)
        if (existingIndex >= 0) nextSlots[existingIndex] = null

        const displaced = nextSlots[slotIndex]
        if (displaced !== null) {
          nextPool = [...nextPool, displaced]
        }

        nextSlots[slotIndex] = stepText
        return { pool: nextPool, slots: nextSlots }
      })
    },
    [submitted]
  )

  const addToFirstEmpty = useCallback(
    (stepText) => {
      if (submitted) return
      setBoard((prev) => {
        const firstEmpty = prev.slots.indexOf(null)
        if (firstEmpty === -1) return prev

        const nextSlots = [...prev.slots]
        const nextPool = prev.pool.filter((t) => t !== stepText)

        const existingIndex = nextSlots.indexOf(stepText)
        if (existingIndex >= 0) nextSlots[existingIndex] = null

        nextSlots[firstEmpty] = stepText
        return { pool: nextPool, slots: nextSlots }
      })
    },
    [submitted]
  )

  const removeFromSlot = useCallback(
    (slotIndex) => {
      if (submitted) return
      setBoard((prev) => {
        const removed = prev.slots[slotIndex]
        if (removed === null) return prev

        const nextSlots = [...prev.slots]
        nextSlots[slotIndex] = null
        return { pool: [...prev.pool, removed], slots: nextSlots }
      })
    },
    [submitted]
  )

  const handleDragStart = (event) => setActiveId(event.active.id)
  const handleDragOver = (event) => {
    const overId = event.over?.id
    if (typeof overId === 'string' && overId.startsWith('slot-')) {
      setOverSlot(parseInt(overId.replace('slot-', ''), 10))
    } else {
      setOverSlot(null)
    }
  }

  const handleDragEnd = (event) => {
    setActiveId(null)
    setOverSlot(null)
    const { active, over } = event
    if (over && typeof over.id === 'string' && over.id.startsWith('slot-')) {
      const slotIndex = parseInt(over.id.replace('slot-', ''), 10)
      placeInSlot(active.id, slotIndex)
    }
  }

  const handleSubmit = () => {
    if (slots.some((s) => s === null) || submitted) return
    setSubmitted(true)

    const stepResults = slots.map(
      (text, i) => text === correctOrder[i]
    )
    setResults(stepResults)

    const allCorrect = stepResults.every(Boolean)
    onAnswer(allCorrect, question.explanation)
  }

  const activeStep = activeId ? stepMap[activeId] : null
  const allPlaced = slots.every((s) => s !== null)

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="oi-container card">
        <h2 className="oi-question">{question.question}</h2>
        <p className="game-instruction">{question.instruction}</p>

        {pool.length > 0 && (
          <div className="oi-pool">
            {pool.map((text) => {
              const step = stepMap[text]
              return (
                <DraggableStep
                  key={text}
                  id={text}
                  emoji={step.emoji}
                  text={step.text}
                  disabled={submitted}
                  onTap={addToFirstEmpty}
                />
              )
            })}
          </div>
        )}

        <div className="oi-slots">
          {slots.map((stepText, i) => {
            const step = stepText ? stepMap[stepText] : null
            const resultClass = results
              ? results[i]
                ? 'oi-slot-correct'
                : 'oi-slot-incorrect'
              : ''
            return (
              <DroppableSlot
                key={i}
                index={i}
                filled={stepText !== null}
                resultClass={resultClass}
                isOver={overSlot === i}
                onRemove={() => removeFromSlot(i)}
                disabled={submitted}
              >
                {step && (
                  <>
                    <span className="oi-slot-emoji">{step.emoji}</span>
                    <span className="oi-slot-text">{step.text}</span>
                  </>
                )}
              </DroppableSlot>
            )
          })}
        </div>

        {allPlaced && !submitted && (
          <button className="btn btn-primary oi-submit" onClick={handleSubmit}>
            Check Order
          </button>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeStep && (
          <div className="oi-step-card oi-step-overlay">
            <span className="oi-step-emoji">{activeStep.emoji}</span>
            <span className="oi-step-text">{activeStep.text}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
