import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const hydrationUrl = `${import.meta.env.BASE_URL}hydration-quiz/`

  return (
    <div className="home">
      <header className="home-hero">
        <div className="home-hero-row">
          <div className="home-hero-logo-area">
            <div className="home-logo-circle">
              <img
                src={`${import.meta.env.BASE_URL}health-embrace-logo.png`}
                alt="Health Embrace"
              />
            </div>
          </div>
          <div className="home-hero-title-area">
            <h1 className="home-title">Nutrition Quizzes &amp; Games</h1>
          </div>
        </div>
        <div className="home-hero-deco">
          <span className="hero-emoji hero-emoji-1">🍎</span>
          <span className="hero-emoji hero-emoji-2">💧</span>
          <span className="hero-emoji hero-emoji-3">🥦</span>
          <span className="hero-emoji hero-emoji-4">🍊</span>
          <span className="hero-emoji hero-emoji-5">⚡</span>
        </div>
      </header>

      <section className="home-intro">
        <h2 className="home-tagline">
          Small steps, big impact &mdash;
          <br />
          learn how food fuels your life.
        </h2>
        <p className="home-description">
          Interactive quizzes and games based on our workshops, designed to help
          young people explore nutrition in a fun, hands-on way.
        </p>
      </section>

      <section className="home-quizzes">
        <article
          className="home-card home-card--eating"
          onClick={() => navigate('/eating')}
        >
          <div className="home-card-icon">🍎⚡</div>
          <h3 className="home-card-title">Eating for Energy</h3>
          <p className="home-card-desc">
            Discover how macronutrients, blood sugar, and smart food choices
            fuel your body for sport and everyday life.
          </p>
          <ul className="home-card-topics">
            <li>Macronutrients</li>
            <li>Blood sugar</li>
            <li>8 energy steps</li>
          </ul>
          <span className="home-card-btn home-card-btn--eating">
            Play Now
          </span>
        </article>

        <a
          className="home-card home-card--hydration"
          href={hydrationUrl}
        >
          <div className="home-card-icon">💧🥤</div>
          <h3 className="home-card-title">Hydration Matters</h3>
          <p className="home-card-desc">
            Learn why staying hydrated is important, how much fluids you need
            daily, and how to spot the sneaky sugar hiding in popular drinks.
          </p>
          <ul className="home-card-topics">
            <li>Why we need water</li>
            <li>Sugar in drinks</li>
            <li>Hydrating foods</li>
          </ul>
          <span className="home-card-btn home-card-btn--hydration">
            Play Now
          </span>
        </a>
      </section>

      <footer className="home-footer">
        <div className="home-footer-logo">
          <img
            src={`${import.meta.env.BASE_URL}health-embrace-logo.png`}
            alt="Health Embrace"
          />
        </div>
        <p className="home-footer-text">
          Workshops by <strong>Andrea Carroll Langan</strong>
        </p>
        <p className="home-footer-sub">
          Helping communities, schools, and sports clubs build healthier habits.
        </p>
      </footer>
    </div>
  )
}
