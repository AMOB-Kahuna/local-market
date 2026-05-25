// import React from 'react'

const Button = ( { onClick, text}) => {
  return (
    <button
      className="bg-[#F0A500] px-6 py-3 rounded-2xl text-[#FFFDF5] text-lg font-bold cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button