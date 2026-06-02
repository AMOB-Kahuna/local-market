// import React from 'react'

import Star from "./Star"

const Rating = ({ rating = 5 }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillAmount = Math.max(0, Math.min(1, rating - index))
    return <Star key={index} id={index} fillAmount={fillAmount} />
  })

  return (
    <div className="inline-flex items-center gap-2 text-slate-900">
      <div className="flex items-center gap-1">{stars}</div>
      <span className="font-semibold">{rating.toFixed(1)}</span>
    </div>
  )
}

export default Rating