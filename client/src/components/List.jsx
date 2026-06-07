// import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const List = ({
  id,
  name,
  category,
  location,
  rating,
  description,
  status,
  image
}) => {


  return (
    <div className='flex flex-col gap-5 mx-5 bg-white shadow-md rounded-2xl items-center'>
      <img src={image || "/placeholder.png"} alt="" className='w-full h-60 rounded-t-2xl object-cover' />

      <div className="w-full px-5 text-xl h-50">
        <p className="font-bold text-2xl">{name}</p>
        <p className='text-gray-500'>{category}</p>
        <p className='text-gray-500'>{location}</p>
        <Rating rating={rating} />
        <p>{description}</p>
        <p className="text-[#2E7D32]">{status}</p>
      </div>
      <Link
        className="block mt-3 mb-5 py-3 px-10 border border-[#F0A500] rounded-2xl text-[#F0A500] font-bold text-center hover:bg-[#F0A500] hover:text-[#FFFDF5] transition-colors duration-600 ease-in-out"
        to={`/business/${id}`}
      >View Profile</Link>
    </div>
  )
}

export default List