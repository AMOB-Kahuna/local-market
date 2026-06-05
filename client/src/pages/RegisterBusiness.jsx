import { useState } from 'react'
import Button from "../components/Button"

const RegisterBusiness = () => {
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
    detailed_description: ''
  })

  const handleChange = (e) => {
    const { id, value, name } = e.target
    const fieldName = id || name
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Send to backend here
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-4xl">
        <h1 className="font-[Abril_Fatface] text-3xl font-bold text-center mb-8">
          Register Your Business
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
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

          <div className="flex flex-col">
            <label htmlFor="detailed_description" className="text-lg font-bold mb-2">
              About Business:
            </label>
            <textarea
              id="detailed_description"
              className="border border-gray-300 px-3 py-2 rounded min-h-[140px]"
              value={formData.detailed_description}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <Button text="Register Business" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterBusiness