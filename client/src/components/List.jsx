// import React from 'react'
import Rating from './Rating'

const List = ({
  name,
  category,
  location,
  rating,
  description,
  status,
  image
}) => {


  return (
    <div className='flex flex-col gap-5 mx-5 bg-white shadow-md rounded-2xl'>
      <img src={image} alt="" className='w-full rounded-t-2xl' />

      <div className="px-5 text-xl">
        <p className="font-bold text-2xl">{name}</p>
        <p>{category}</p>
        <p>{location}</p>
        <Rating rating={rating} />
        <p>{description}</p>
        <p className="text-[#2E7D32]">{status}</p>
        <button className="w-full my-3 p-3 border border-[#F0A500] rounded-2xl text-[#F0A500]">View Profile</button>
      </div>
    </div>
  )
}

export default List