// import React from 'react'
import Rating from './Rating'

const BusinessCard = () => {


  return (
    <div className='flex flex-col gap-5 mx-5 bg-white shadow-md rounded-2xl'>
      <img src="/pottery.jpg" alt="" className='w-full rounded-t-2xl' />

      <div className="px-5 text-xl">
        <p className="font-bold text-2xl">Ceramin Throwing</p>
        <p>category</p>
        <p>Location</p>
        <Rating rating={3.5} />
        <p className="text-[#2E7D32]">Status</p>
        <button className="w-full my-3 p-3 border border-[#F0A500] rounded-2xl text-[#F0A500]">View Profile</button>
      </div>
    </div>
  )
}

export default BusinessCard
