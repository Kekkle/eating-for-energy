import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  const navigate = useNavigate()
  const [wiggleKey, setWiggleKey] = useState(0)

  const handleWiggle = useCallback(() => {
    setWiggleKey((k) => k + 1)
  }, [])

  return (
    <div className="landing animate-in">
      <button
        className="landing-back"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>
      <div className="landing-decorations">
        <span className="deco deco-1">🍎</span>
        <span className="deco deco-2">⚽</span>
        <span className="deco deco-3">🥦</span>
        <span className="deco deco-4">✨</span>
      </div>

      <div className="landing-content">
        <h1 className="landing-title">
          Eating for
          <span className="landing-title-accent"> Energy</span>
        </h1>
        <p className="landing-subtitle">
          Test what you&rsquo;ve learned and become a nutrition champion!
        </p>
        <p className="landing-description">
          Fun quizzes and games about macronutrients, blood sugar, and the
          8 steps to fuel your best performance.
        </p>

        <button
          className="btn btn-primary landing-cta"
          onClick={() => navigate('/topics')}
        >
          Let&rsquo;s Go!
        </button>

        <img
          key={wiggleKey}
          src={`${import.meta.env.BASE_URL}veggie_thumbsup.png`}
          alt="Veggie thumbs up"
          className="landing-mascot"
          onClick={handleWiggle}
        />
      </div>

      <div className="landing-logo-wrap">
        <div className="landing-logo-oval">
          <img src={`${import.meta.env.BASE_URL}health-embrace-logo.png`} alt="Health Embrace" />
        </div>
      </div>

      <div className="landing-footer">
        <p>
          Based on the <strong>Eating for Energy &amp; Wellbeing</strong> webinar
          by Andrea Carroll Langan
        </p>
        <p className="landing-footer-credit">© 2026 KekkleMePink</p>
      </div>
    </div>
  )
}
