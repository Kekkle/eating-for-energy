import './StreakCounter.css'

export default function StreakCounter({ streak }) {
  if (streak < 2) return null

  return (
    <div className="streak-counter animate-pop">
      <span className="streak-fire">🔥</span>
      <span className="streak-value">{streak} streak!</span>
    </div>
  )
}
