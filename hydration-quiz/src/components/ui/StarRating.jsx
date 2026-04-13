import './StarRating.css'

export default function StarRating({ score, maxScore }) {
  const percentage = maxScore > 0 ? score / maxScore : 0
  let stars
  if (percentage >= 0.85) stars = 3
  else if (percentage >= 0.55) stars = 2
  else stars = 1

  return (
    <div className="star-rating" aria-label={`${stars} out of 3 stars`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`star ${i <= stars ? 'star-filled' : 'star-empty'}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}
