import { Link } from 'react-router-dom'
import Rating from './Rating'

const BusinessCard = ({ business }) => {
  if (!business) return null

  return (
    <div className="flex flex-col items-center gap-5 mx-5 bg-white shadow-md rounded-2xl overflow-hidden">
      <img
        src={business.image || '/pottery.jpg'}
        alt={business.name}
        className="w-full h-56 object-cover"
      />

      <div className="w-full px-5 py-5 text-xl max-h-55">
        <p className="font-bold text-2xl">{business.name}</p>
        <p className="text-gray-500">{business.category}</p>
        <p className="text-gray-500">{business.location}</p>
        <div className="mt-3">
          <Rating rating={parseFloat(business.average_rating || 0)} />
        </div>
        <p className="text-[#2E7D32] mt-4">Status</p>
      </div>
      <Link
        className="block mt-3 mb-5 py-3 px-10 border border-[#F0A500] rounded-2xl text-[#F0A500] text-center"
        to={`/business/${business.id}`}
      >View Profile</Link>
    </div>
  )
}

export default BusinessCard
