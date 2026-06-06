import Rating from './Rating'

const Review = ({ review }) => {
  return (
    <div className="border border-gray-200 rounded-3xl p-5 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-900">{review.user}</div>
          <div className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
        </div>
        <Rating rating={parseFloat(review.rating)} />
      </div>

      {review.comment && (
        <p className="mt-4 text-sm leading-6 text-gray-700">{review.comment}</p>
      )}
    </div>
  )
}

export default Review