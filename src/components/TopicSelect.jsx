import { useNavigate } from 'react-router-dom'
import './TopicSelect.css'

const TOPICS = [
  {
    id: 'macronutrients',
    title: 'Macronutrients & Balanced Eating',
    description: 'What are macronutrients, what do they do, and how do we eat well?',
    icon: '⚡',
    color: 'var(--color-yellow)',
  },
  {
    id: 'bloodSugar',
    title: 'Blood Sugar & Energy',
    description: 'How does blood sugar work, what controls it, and how does it affect our energy?',
    icon: '🩸',
    color: 'var(--color-red)',
  },
  {
    id: 'healthyHabits',
    title: 'Healthy Habits & Smart Choices',
    description: 'Drink swaps, hydration, reading labels, and managing stress.',
    icon: '🏆',
    color: 'var(--color-green)',
  },
  {
    id: 'fullChallenge',
    title: 'Full Challenge',
    description: 'Take on every topic! The ultimate test of your nutrition knowledge.',
    icon: '🌟',
    color: 'var(--color-orange)',
  },
]

export default function TopicSelect() {
  const navigate = useNavigate()

  return (
    <div className="topic-select animate-in">
      <h1 className="topic-select-title">Choose Your Challenge</h1>
      <p className="topic-select-subtitle">Pick a topic to test your knowledge</p>

      <div className="topic-grid">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            className="topic-card card"
            onClick={() => navigate(`/play/${topic.id}`)}
            style={{ '--topic-color': topic.color }}
          >
            <span className="topic-icon">{topic.icon}</span>
            <h2 className="topic-card-title">{topic.title}</h2>
            <p className="topic-card-description">{topic.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
