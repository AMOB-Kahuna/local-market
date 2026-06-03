// import React from 'react'
import { useEffect, useState } from 'react'
import List from '../components/List'

const Listing = () => {
  const [businesses, setBusinesses] = useState([])

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/businesses/');
        const data = await res.json();
        setBusinesses(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBusinesses();
  }, [])

  return (
    <div className='py-10 flex flex-col gap-10'>
      <h1 className="font-[Abril_Fatface] text-3xl font-bold px-5">Local Businesses</h1>
      <div className='flex flex-col gap-8'>
        {businesses.map(({
          id,
          name,
          category,
          location,
          rating,
          description,
          status,
          image
        }) => {
          return (<List
            key={id}
            name={name}
            category={category}
            location={location}
            rating={rating}
            description={description}
            status={status}
            image={image}
          />)
        })}
      </div>
    </div>
  )
}

export default Listing