// import React from 'react'

import { categories } from "../categories"
import Button from "../components/Button"
import Category from "../components/Category"

const Homepage = () => {


  return (
    <>
      <section className="py-10 flex flex-col gap-15">
        <h2 className="font-[Abril_Fatface] text-[#1F1F1F] text-3xl font-bold text-center text-shadow-lg">
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

      <section className="py-10">
        <h2 className="font-[Abril_Fatface] text-3xl font-bold">
          Curated Categories
        </h2>

        <div className="pt-10 px-8 flex flex-col gap-5">
          {categories.map( ({name, img}) => <Category id={name} name={name} img={img} />)}
        </div>
      </section>
    </>
  )
}

export default Homepage