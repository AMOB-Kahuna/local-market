// import React from 'react'
import List from '../components/List'

const Listing = () => {
  const businesses = [
    {
      id: 1,
      name: 'Ceramic Throwing',
      category: 'Art & Crafts',
      location: 'Downtown',
      rating: 4.2,
      description: 'Professional ceramic and pottery classes for all skill levels.',
      status: 'Open',
      image: '/pottery.jpg'
    },
    {
      id: 2,
      name: 'Local Bakery',
      category: 'Baking',
      location: 'Midtown',
      rating: 4.5,
      description: 'Fresh baked goods and artisan breads made daily.',
      status: 'Open',
      image: '/pottery.jpg'
    },
    {
      id: 3,
      name: 'Photography Studio',
      category: 'Photography',
      location: 'Riverside',
      rating: 4.9,
      description: 'Professional photo shoots, portraits, and event photography.',
      status: 'Open',
      image: '/pottery.jpg'
    },
    {
      id: 4,
      name: 'Custom Tailoring',
      category: 'Tailoring',
      location: 'Fashion District',
      rating: 4.6,
      description: 'Bespoke tailoring and alterations for all occasions.',
      status: 'Open',
      image: '/pottery.jpg'
    },
    {
      id: 5,
      name: 'Tech Repair Hub',
      category: 'Tech Repair',
      location: 'Innovation Park',
      rating: 4.0,
      description: 'Expert repair services for phones, laptops, and electronics.',
      status: 'Open',
      image: '/pottery.jpg'
    }
  ]

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