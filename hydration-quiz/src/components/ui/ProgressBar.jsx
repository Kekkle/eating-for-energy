import './ProgressBar.css'

export default function ProgressBar({ current, total }) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="progress-bar-label">
        {current} / {total}
      </span>
    </div>
  )
}
