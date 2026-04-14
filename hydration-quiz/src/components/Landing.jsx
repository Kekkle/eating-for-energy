import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  const navigate = useNavigate()
  const [popped, setPopped] = useState(false)

  const handlePop = useCallback(() => {
    if (popped) return
    setPopped(true)
    setTimeout(() => setPopped(false), 2000)
  }, [popped])

  return (
    <div className="landing animate-in">
      <div className="landing-decorations">
        <span className="deco deco-1">💧</span>
        <span className="deco deco-2">🥤</span>
        <span className="deco deco-3">🥒</span>
        <span className="deco deco-4">✨</span>
      </div>

      <div className="landing-content">
        <h1 className="landing-title">
          <span className="landing-title-accent">Hydration</span>
          <br />Quiz
        </h1>
        <p className="landing-subtitle">
          Test what you&rsquo;ve learned about staying hydrated!
        </p>
        <p className="landing-description">
          Fun quizzes and games about why we need water,
          how much to drink, hydrating foods, and sugar in drinks.
        </p>

        <button
          className="btn btn-primary landing-cta"
          onClick={() => navigate('/topics')}
        >
          Let&rsquo;s Go! 💧
        </button>

        <div className="landing-mascot-wrap" onClick={handlePop}>
          {popped ? (
            <div className="landing-splash">
              <span className="splash-drop splash-1">💧</span>
              <span className="splash-drop splash-2">💧</span>
              <span className="splash-drop splash-3">💧</span>
              <span className="splash-drop splash-4">💧</span>
              <span className="splash-drop splash-5">💧</span>
              <span className="splash-drop splash-6">💧</span>
            </div>
          ) : (
            <div className="landing-emoji-mascot">💧</div>
          )}
        </div>
      </div>

      <div className="landing-logo-wrap">
        <div className="landing-logo-oval">
          <img src={`${import.meta.env.BASE_URL}images/health-embrace-logo.png`} alt="Health Embrace" />
        </div>
      </div>

      <div className="landing-footer">
        <p>
          Based on the <strong>Hydration</strong> workshop
          by Health Embrace
        </p>
      </div>
    </div>
  )
}
