import { useState, useEffect, useRef } from 'react'
import Button from "../components/Button"
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

const RegisterBusiness = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    phone: '',
    email: '',
    twitter_handle: '',
    instagram_handle: '',
    facebook_handle: '',
    whatsapp_number: '',
    detailed_description: '',
    lat: '',
    lng: '',
    image: '',
  })
  // console.log(formData);
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  // const [mapCenter, setMapCenter] = useState([7.5283, 3.91156])
  // const [markerPosition, setMarkerPosition] = useState(
  //   mapCenter ||
  //   (formData.lat && formData.lng
  //     && [Number(formData.lat), Number(formData.lng)]
  //   )
  // )

  const mapRef = useRef(null)


  useEffect(() => {
    if (!submitError && !submitSuccess) return

    const timer = setTimeout(() => {
      setSubmitError('')
      setSubmitSuccess('')
    }, 2000)

    return () => clearTimeout(timer)
  }, [submitError, submitSuccess])

  const handleChange = (e) => {
    const { id, value, name, files } = e.target
    const fieldName = id || name
    if (files) setFormData(prev => ({ ...prev, [fieldName]: files[0] }))
    else setFormData(prev => ({ ...prev, [fieldName]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')
    setSubmitting(true)

    const requiredFields = [
      'name',
      'category',
      'location',
      'description',
      'phone',
      'email',
      'detailed_description'
    ]

    const missingField = requiredFields.find(field => !formData[field]?.trim())
    if (missingField) {
      setSubmitError('Please fill out all required fields.')
      setSubmitting(false)
      return
    }

    const token = localStorage.getItem('accessToken')

    const formDataToSend = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      if (value === null || value === undefined) return
      if (typeof value === 'string') {
        if (value.trim() !== '') formDataToSend.append(key, value.trim())
        return
      }
      formDataToSend.append(key, value)
    })

    try {
      const response = await fetch(`${apiBaseUrl}/businesses/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        const message =
          data.detail ||
          Object.values(data).flat().join(' ') ||
          'Failed to register business'
        throw new Error(message)
      }

      setSubmitSuccess('Business registered successfully.')
      setFormData({
        name: '',
        category: '',
        location: '',
        description: '',
        phone: '',
        email: '',
        twitter_handle: '',
        instagram_handle: '',
        facebook_handle: '',
        whatsapp_number: '',
        detailed_description: '',
        lat: '',
        lng: '',
        image: '',
      })
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSubmitError('Geolocation is not supported by this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        console.log(position)

        // const nextPosition = [latitude, longitude]
        // console.log(nextPosition)

        setFormData((prev) => ({
          ...prev,
          lat: latitude,
          lng: longitude,
        }))

        // setMapCenter(nextPosition)
        // setMarkerPosition(nextPosition)
        setSubmitSuccess('Your location has been captured.')
      },
      (error) => {
        console.error(error)
        setSubmitError('Could not get your location.')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-4xl">
        <h1 className="font-[Abril_Fatface] text-3xl font-bold text-center mb-8">
          Register Your Business
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <fieldset className="border border-gray-200 rounded-3xl p-6">
            <legend className="text-xl font-semibold px-2">Basic Info.</legend>

            <div className="grid gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-lg font-bold mb-2">
                  Business Name:
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="category" className="text-lg font-bold mb-2">
                  Category:
                </label>
                <select
                  id="category"
                  required
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Tailoring">Tailoring</option>
                  <option value="Catering">Catering</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Photography">Photography</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Tech Repair">Tech Repair</option>
                  <option value="Baking">Baking</option>
                  <option value="Art">Art</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="location" className="text-lg font-bold mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  id="location"
                  required
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="text-lg font-bold mb-2">
                  Brief:
                </label>
                <input
                  type="text"
                  id="description"
                  required
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="text-lg font-bold mb-2">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone"
                  required
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="flex<Marker>

            </Marker> flex-col">
                <label htmlFor="email" className="text-lg font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border border-gray-200 rounded-3xl p-6">
            <legend className="text-xl font-semibold px-2">Online Presence</legend>

            <div className="grid gap-4">
              <div className="flex flex-col">
                <label htmlFor="twitter_handle" className="text-lg font-bold mb-2">
                  Twitter:
                </label>
                <input
                  type="text"
                  id="twitter_handle"
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.twitter_handle}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="instagram_handle" className="text-lg font-bold mb-2">
                  Instagram:
                </label>
                <input
                  type="text"
                  id="instagram_handle"
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.instagram_handle}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="facebook_handle" className="text-lg font-bold mb-2">
                  Facebook:
                </label>
                <input
                  type="text"
                  id="facebook_handle"
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.facebook_handle}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="whatsapp_number" className="text-lg font-bold mb-2">
                  WhatsApp:
                </label>
                <input
                  type="text"
                  id="whatsapp_number"
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <div>
            <label className="text-lg font-bold mb-1 block">Image</label>
            <input type="file" name="image" className='w-full border border-gray-300 px-3 py-2 cursor-pointer' onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="detailed_description" className="text-lg font-bold mb-2">
              About Business:
            </label>
            <textarea
              id="detailed_description"
              required
              className="border border-gray-300 px-3 py-2 rounded min-h-35"
              value={formData.detailed_description}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="mt-2 rounded-xl bg-[#F0A500] px-4 py-2 text-white"
            >
              Use my current location
            </button>
          </div>

          {/* <MapContainer center={mapCenter && mapCenter} zoom={16} whenReady={ (map) => mapRef.current = map}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={markerPosition}></Marker>
          </MapContainer> */}

          <div className="text-center">
            <Button text="Register Business" onClick={handleSubmit} />
          </div>
        </form>

        {submitError && (
          <div className="w-fit bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 fixed top-0 left-0 right-0 mt-5 mx-auto">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="w-fit bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 fixed top-0 left-0 right-0 mt-5 mx-auto">
            {submitSuccess}
          </div>
        )}
      </div>
    </div>
  )
}

export default RegisterBusiness