import { useNavigate } from 'react-router-dom'
import './TopicSelect.css'

const SECTIONS = [
  {
    id: 'quiz',
    title: 'Take the Quiz!',
    description: 'Test your knowledge on macronutrients, blood sugar, and healthy habits.',
    icon: '🧠',
    color: 'var(--color-blue)',
    enabled: true,
  },
  {
    id: 'games',
    title: 'Play Games',
    description: 'Sort foods, create drinks, and swap carbs in fun mini-games.',
    icon: '🎮',
    color: 'var(--color-green)',
    enabled: true,
  },
]

export default function TopicSelect() {
  const navigate = useNavigate()

  return (
    <div className="topic-select animate-in">
      <button className="btn btn-secondary topic-back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>
      <h1 className="topic-select-title">What would you like to do?</h1>
      <p className="topic-select-subtitle">Choose an activity to get started</p>

      <div className="topic-grid">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            className={`topic-card card ${!section.enabled ? 'topic-card-disabled' : ''}`}
            onClick={() => section.enabled && navigate(`/play/${section.id}`)}
            style={{ '--topic-color': section.color }}
            disabled={!section.enabled}
          >
            <span className="topic-icon">{section.icon}</span>
            <h2 className="topic-card-title">{section.title}</h2>
            <p className="topic-card-description">{section.description}</p>
            {!section.enabled && (
              <span className="topic-coming-soon">Coming Soon</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
