import { useEffect, useState } from 'react'
import List from '../components/List'
import { categories } from '../categories'

const Listing = () => {
  const [businesses, setBusinesses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

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

  // Filter businesses by selected category
  const filteredBusinesses = selectedCategory 
    ? businesses.filter(b => b.category === selectedCategory)
    : businesses;

  return (
    <div className='py-10 flex flex-col gap-10'>
      <h1 className="font-[Abril_Fatface] text-3xl font-bold px-5">Local Businesses</h1>
      
      {/* Category Filter */}
      <div className='px-5 flex gap-3 pb-2 flex-wrap'>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full whitespace-nowrap cursor-pointer ${
            selectedCategory === null 
              ? 'bg-[#F0A500] text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.name 
                ? 'bg-[#F0A500] text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className='flex flex-col gap-8'>
        {filteredBusinesses.map(({
          id,
          name,
          category,
          location,
          description,
          status,
          image,
          average_rating,
        }) => {
          return (<List
            key={id}
            id={id}
            name={name}
            category={category}
            location={location}
            rating={average_rating}
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