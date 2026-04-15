import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('idle')
  const [fallDist, setFallDist] = useState(0)
  const mascotRef = useRef(null)
  const logoRef = useRef(null)

  const handlePop = useCallback(() => {
    if (phase !== 'idle') return

    const mascotRect = mascotRef.current.getBoundingClientRect()
    const logoRect = logoRef.current.getBoundingClientRect()
    const dist = logoRect.top - mascotRect.top - mascotRect.height / 2 + logoRect.height / 2
    setFallDist(dist)

    setPhase('falling')
    setTimeout(() => setPhase('splash'), 600)
    setTimeout(() => setPhase('idle'), 2400)
  }, [phase])

  const homeUrl = import.meta.env.BASE_URL.replace(/hydration-quiz\/$/, '')

  return (
    <div className="landing animate-in">
      <a className="landing-back" href={homeUrl}>
        ← Back to Home
      </a>
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

        <div className="landing-mascot-wrap" ref={mascotRef} onClick={handlePop}>
          {phase === 'idle' && (
            <div className="landing-emoji-mascot">💧</div>
          )}
          {phase === 'falling' && (
            <div
              className="landing-emoji-falling"
              style={{ '--fall-distance': `${fallDist}px` }}
            >
              💧
            </div>
          )}
        </div>
      </div>

      <div className="landing-logo-wrap" ref={logoRef}>
        <div className="landing-logo-oval">
          <img src={`${import.meta.env.BASE_URL}images/health-embrace-logo.png`} alt="Health Embrace" />
        </div>
        {phase === 'splash' && (
          <div className="landing-splash">
            <span className="splash-drop splash-1">💧</span>
            <span className="splash-drop splash-2">💧</span>
            <span className="splash-drop splash-3">💧</span>
            <span className="splash-drop splash-4">💧</span>
            <span className="splash-drop splash-5">💧</span>
            <span className="splash-drop splash-6">💧</span>
          </div>
        )}
      </div>

      <div className="landing-footer">
        <p>
          Based on the <strong>Hydration</strong> workshop
          by Health Embrace
        </p>
        <p className="landing-footer-credit">© 2026 KekkleMePink</p>
      </div>
    </div>
  )
}
