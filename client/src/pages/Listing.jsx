import { useEffect, useState } from 'react'
import List from '../components/List'
import { categories } from '../categories'
import { useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const Listing = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [position, setPosition] = useState(null);

  const [searchParams] = useSearchParams();

  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const viewMode = searchParams.get('view') || 'list'

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/businesses/`);
        const data = await res.json();
        setBusinesses(data);
        // console.log(data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchBusinesses();
  }, [])

  useEffect( () => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by this browser.')
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          console.log(position)

          const nextPosition = [latitude, longitude]
          setPosition(nextPosition)
          // console.log(nextPosition)
        },
        (error) => {
          console.error(error)
          console.log('Could not get your location.')
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      )
    }

    getCurrentLocation();
  }, [])

  // Filter businesses by selected category
  const filteredBusinesses = selectedCategory 
    ? businesses.filter(b => b.category === selectedCategory)
    : businesses;

  return (
    <div className='py-10 flex flex-col gap-10'>
      <h1 className="font-[Abril_Fatface] text-3xl font-bold px-5">Local Businesses</h1>
      
      {/* Category Filter */}
      {viewMode === 'map' ? null : <div className='px-5 flex gap-3 pb-2 flex-wrap'>
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
      </div>}

      {
        viewMode === 'map' ?
        <>
          
          {position && <MapContainer center={position} zoom={16}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredBusinesses.map( ({id, lat, lng}) => {
              const marker = [Number(lat), Number(lng)];
              if(lat && lng) return (
                <Marker key={id} position={marker}>

                </Marker>
              )
            })}
          </MapContainer>}
        </>
        :
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
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
      }
    </div>
  )
}

export default Listing