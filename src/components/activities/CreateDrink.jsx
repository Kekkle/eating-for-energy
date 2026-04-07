import { useState, useCallback } from 'react'
import './CreateDrink.css'

const INGREDIENT_EMOJIS = {
  'Apple juice': '🍎',
  'Orange juice': '🍊',
  'Water': '💧',
  'Lemon': '🍋',
  'Berries': '🫐',
  'Mint leaves': '🌿',
  'Watermelon': '🍉',
  'Mango juice': '🥭',
}

export default function CreateDrink({ question, onAnswer }) {
  const [cup, setCup] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [drinkName, setDrinkName] = useState('')

  const maxItems = question.maxIngredients || 4

  const addIngredient = useCallback(
    (ingredient) => {
      if (submitted || cup.length >= maxItems || cup.includes(ingredient)) return
      setCup((prev) => [...prev, ingredient])
    },
    [submitted, cup, maxItems]
  )

  const removeIngredient = useCallback(
    (ingredient) => {
      if (submitted) return
      setCup((prev) => prev.filter((i) => i !== ingredient))
    },
    [submitted]
  )

  const handleSubmit = () => {
    if (cup.length === 0 || submitted) return
    setSubmitted(true)

    const hasSugarReducer = cup.some((i) =>
      ['Water', 'Lemon', 'Berries', 'Mint leaves', 'Watermelon'].includes(i)
    )
    onAnswer(hasSugarReducer, question.explanation)
  }

  const generateDrinkName = (items) => {
    if (items.length === 0) return ''
    if (items.length === 1) return `${items[0]} drink`
    const fruits = items.filter((i) => i !== 'Water' && i !== 'Mint leaves')
    if (fruits.length === 0) return 'Minty water'
    return `${fruits.join(' & ')} mix`
  }

  return (
    <div className="cd-container card">
      <h2 className="cd-question">{question.question}</h2>
      {question.instruction && (
        <p className="cd-instruction">{question.instruction}</p>
      )}

      <div className="cd-workspace">
        <div className="cd-cup-area">
          <div className={`cd-cup ${submitted ? 'cd-cup-done' : ''}`}>
            <div className="cd-cup-liquid" style={{
              height: `${Math.min(cup.length / maxItems * 100, 100)}%`
            }} />
            <div className="cd-cup-items">
              {cup.length === 0 && (
                <p className="cd-cup-empty">Tap ingredients to add them!</p>
              )}
              {cup.map((item) => (
                <button
                  key={item}
                  className="cd-cup-ingredient"
                  onClick={() => removeIngredient(item)}
                  disabled={submitted}
                >
                  <span>{INGREDIENT_EMOJIS[item] || '🥤'}</span>
                  <span>{item}</span>
                  {!submitted && <span className="cd-remove">×</span>}
                </button>
              ))}
            </div>
          </div>
          <p className="cd-cup-count">
            {cup.length}/{maxItems} ingredients
          </p>
          {submitted && cup.length > 0 && (
            <p className="cd-drink-name">{generateDrinkName(cup)}</p>
          )}
        </div>

        <div className="cd-ingredients">
          <p className="cd-ing-label">Ingredients:</p>
          <div className="cd-ing-grid">
            {question.ingredients.map((ing) => {
              const inCup = cup.includes(ing)
              return (
                <button
                  key={ing}
                  className={`cd-ing-btn ${inCup ? 'cd-ing-used' : ''}`}
                  onClick={() => addIngredient(ing)}
                  disabled={submitted || inCup || cup.length >= maxItems}
                >
                  <span className="cd-ing-emoji">
                    {INGREDIENT_EMOJIS[ing] || '🥤'}
                  </span>
                  <span className="cd-ing-name">{ing}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {cup.length > 0 && !submitted && (
        <button className="btn btn-primary cd-submit" onClick={handleSubmit}>
          Create My Drink!
        </button>
      )}
    </div>
  )
}
