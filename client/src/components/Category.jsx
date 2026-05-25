// import React from 'react'

const Category = ( {name, img} ) => {


  return (
    <div className="bg-white rounded-2xl shadow-md px-10 py-6 flex flex-col items-center gap-4">
      <img src={img} alt="" className="w-20" />
      <p className="text-2xl font-bold text-[#5C3317]">{name}</p>
    </div>
  )
}

export default Category