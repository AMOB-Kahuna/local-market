// import React from 'react'

import Button from "../components/Button"

const Homepage = () => {


  return (
    <>
      <section className="py-10 flex flex-col gap-15">
        <h2 className="font-[Abril_Fatface] text-[#5C3317] text-3xl font-bold text-center text-shadow-lg">
          Discover the heartbeat of your neighborhood
        </h2>

        <form action="" className="flex flex-col items-center gap-4 p-10 shadow-lg rounded-lg bg-[#ffffff]">
          <input
            type="text"
            className="w-full h-13 p-2 text-xl border border-black/20 rounded-lg"
            placeholder="Enter keyword..."
          />

          <div className="text-xl w-full flex items-center">
            <label htmlFor="filter" className="font-bold mr-2">Filter:</label>
            <select name="" id="filter" className="w-full border border-black/20 p-2 rounded-lg text-center">
              <option value="all">all</option>
              <option value="all">Tailoring</option>
              <option value="all">Baking</option>
              <option value="all">Photography</option>
              <option value="all">Furniture</option>
              <option value="all">Beauty</option>
              <option value="all">Tech Repair</option>
              <option value="all">Catering</option>
              <option value="all">Art</option>
            </select>
          </div>

          <Button text="Search" onClick={() => {}} />
        </form>
      </section>
    </>
  )
}

export default Homepage