import { useId } from 'react'

const Star = ({ fillAmount = 0 }) => {
  const gradientId = useId()

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {fillAmount > 0 && fillAmount < 1 && (
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset={`${fillAmount * 100}%`} stopColor="#F59E0B" />
            <stop offset={`${fillAmount * 100}%`} stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={
          fillAmount >= 1
            ? '#F59E0B'
            : fillAmount > 0
            ? `url(#${gradientId})`
            : 'none'
        }
        stroke="#F59E0B"
        strokeWidth="1"
      />
    </svg>
  )
}

export default Star;