import { useState, useCallback } from 'react'
import './DragSort.css'

export default function DragSort({ question, onAnswer }) {
  const allItems = question.categories
    .flatMap((cat) => cat.items.map((item) => ({ item, category: cat.name })))

  const [pool, setPool] = useState(() =>
    allItems.map((i) => i.item).sort(() => Math.random() - 0.5)
  )
  const [bins, setBins] = useState(() =>
    Object.fromEntries(question.categories.map((c) => [c.name, []]))
  )
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)

  const correctMap = Object.fromEntries(
    allItems.map((i) => [i.item, i.category])
  )

  const moveToCategory = useCallback(
    (item, categoryName) => {
      if (submitted) return
      setPool((prev) => prev.filter((i) => i !== item))
      setBins((prev) => {
        const next = { ...prev }
        Object.keys(next).forEach((key) => {
          next[key] = next[key].filter((i) => i !== item)
        })
        next[categoryName] = [...next[categoryName], item]
        return next
      })
    },
    [submitted]
  )

  const moveBackToPool = useCallback(
    (item, categoryName) => {
      if (submitted) return
      setBins((prev) => ({
        ...prev,
        [categoryName]: prev[categoryName].filter((i) => i !== item),
      }))
      setPool((prev) => [...prev, item])
    },
    [submitted]
  )

  const handleSubmit = () => {
    if (pool.length > 0 || submitted) return
    setSubmitted(true)

    const itemResults = {}
    let allCorrect = true

    Object.entries(bins).forEach(([catName, items]) => {
      items.forEach((item) => {
        const correct = correctMap[item] === catName
        itemResults[item] = correct
        if (!correct) allCorrect = false
      })
    })

    setResults(itemResults)
    onAnswer(allCorrect, question.explanation)
  }

  return (
    <div className="ds-container card">
      <h2 className="ds-question">{question.question}</h2>

      {pool.length > 0 && (
        <div className="ds-pool">
          <p className="ds-pool-label">Tap an item, then tap the category it belongs to:</p>
          <div className="ds-pool-items">
            {pool.map((item) => (
              <span key={item} className="ds-pool-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="ds-categories">
        {question.categories.map((cat) => (
          <div key={cat.name} className="ds-category">
            <h3 className="ds-category-title">{cat.name}</h3>
            <div className="ds-category-drop">
              {bins[cat.name].length === 0 && !submitted && (
                <p className="ds-placeholder">Tap items below to add</p>
              )}
              {bins[cat.name].map((item) => (
                <button
                  key={item}
                  className={`ds-sorted-item ${
                    results
                      ? results[item]
                        ? 'ds-item-correct'
                        : 'ds-item-incorrect'
                      : ''
                  }`}
                  onClick={() => moveBackToPool(item, cat.name)}
                  disabled={submitted}
                >
                  {item}
                  {!submitted && <span className="ds-remove">×</span>}
                  {results && (
                    <span className="ds-result-icon">
                      {results[item] ? '✓' : '✗'}
                    </span>
                  )}
                </button>
              ))}
            </div>
            {pool.length > 0 && !submitted && (
              <div className="ds-add-buttons">
                {pool.map((item) => (
                  <button
                    key={item}
                    className="ds-add-btn"
                    onClick={() => moveToCategory(item, cat.name)}
                  >
                    + {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {pool.length === 0 && !submitted && (
        <button className="btn btn-primary ds-submit" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}
    </div>
  )
}
