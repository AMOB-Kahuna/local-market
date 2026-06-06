import { useEffect, useState } from 'react'
import { categories } from "../categories"
import BusinessCard from "../components/BusinessCard"
import Button from "../components/Button"
import Category from "../components/Category"

const Homepage = () => {
  const [topBusinesses, setTopBusinesses] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [allBusinesses, setAllBusinesses] = useState([])

  // Fetch all businesses on mount
  useEffect(() => {
    const loadAllBusinesses = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/businesses/')
        const data = await res.json()
        setAllBusinesses(data)
      } catch (error) {
        console.error('Failed to load businesses', error)
      }
    }

    loadAllBusinesses()
  }, [])

  // Load top-rated businesses
  useEffect(() => {
    const loadTopBusinesses = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/businesses/top-rated/')
        const data = await res.json()
        setTopBusinesses(data)
      } catch (error) {
        console.error('Failed to load top businesses', error)
      }
    }

    loadTopBusinesses()
  }, [])

  // Search logic
  const handleSearch = (e) => {
    e.preventDefault()
    
    if (!searchKeyword.trim()) {
      setIsSearching(false)
      setSearchResults([])
      return
    }

    const keyword = searchKeyword.toLowerCase()
    const results = allBusinesses.filter(business => 
      business.name.toLowerCase().includes(keyword) ||
      business.category.toLowerCase().includes(keyword)
    )

    setSearchResults(results)
    setIsSearching(true)
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchKeyword('')
    setSearchResults([])
    setIsSearching(false)
  }

  return (
    <>
      <section className="py-10 flex flex-col gap-15">
        <h2 className="font-[Abril_Fatface] text-[#1F1F1F] text-3xl font-bold text-center text-shadow-lg">
          Discover the heartbeat of your neighborhood
        </h2>

        <form onSubmit={handleSearch} className="flex flex-col items-center gap-4 p-10 shadow-lg rounded-lg bg-[#ffffff] mx-auto sm:flex-row max-w-3xl">
          <input
            type="text"
            className="w-full h-13 p-2 text-xl border border-black/20 rounded-lg"
            placeholder="Enter keyword..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <div className="flex gap-3">
            <Button text="Search" onClick={handleSearch} />
            {isSearching && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </section>

      {isSearching && (
        <section className="py-10">
          <h2 className="font-[Abril_Fatface] text-3xl font-bold">
            Search Results ({searchResults.length})
          </h2>

          {searchResults.length > 0 ? (
            <div className="grid gap-6 mt-8 md:grid-cols-2">
              {searchResults.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-4">No businesses found matching "{searchKeyword}"</p>
          )}
        </section>
      )}

      {!isSearching && (
        <>
          <section className="py-10">
            <h2 className="font-[Abril_Fatface] text-3xl font-bold">
              Curated Categories
            </h2>

            <div className="pt-10 px-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map( ({name, img}) => <Category key={name} id={name} name={name} img={img} />)}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-[Abril_Fatface] text-3xl font-bold">
              Artisan Spotlight <br />
              <p className="font-normal text-xl">Top-rated local businesses</p>
            </h2>

            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {topBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default Homepage