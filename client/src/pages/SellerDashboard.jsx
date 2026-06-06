import { useEffect, useState } from 'react'
import BusinessProfileForm from '../components/BusinessProfileForm'

const SellerDashboard = () => {
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!token) {
        setError('You must be logged in to view the dashboard.')
        setLoading(false)
        return
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/api/my-business/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        if (res.status === 401) {
          setError('Session expired. Please log in again.')
        } else if (res.status === 404) {
          setError('No business found for this account.')
        } else if (!res.ok) {
          setError('Failed to load business.')
        } else {
          setBusiness(await res.json())
        }
      } catch (err) {
        console.log(err)
        setError('Network error while fetching business.')
      } finally {
        setLoading(false)
      }
    }

    fetchBusiness()
  }, [token])

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-4xl">
        <h1 className="font-[Abril_Fatface] text-3xl font-bold text-center mb-6">Seller Dashboard</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <BusinessProfileForm business={business} onSaved={setBusiness} />
          </div>

          <aside className="bg-gray-50 border border-gray-200 p-4 rounded-2xl">
            <h2 className="text-lg font-semibold mb-3">Business Info</h2>
            {business ? (
              <div className="space-y-2 text-sm text-gray-700">
                <div><strong>Name:</strong> {business.name}</div>
                <div><strong>Category:</strong> {business.category}</div>
                <div><strong>Location:</strong> {business.location}</div>
                <div><strong>Phone:</strong> {business.phone}</div>
                <div><strong>Email:</strong> {business.email}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">No business loaded.</div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard