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
    <div>
      <h1 className="font-[Abril_Fatface] text-3xl font-bold px-5">Register Your Business</h1>

      <form className="mt-10" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Basic Info.</legend>

          <div className="flex flex-col">
            <label htmlFor="name" className="text-xl font-bold">Business Name:</label>
            <input 
              type="text" 
              id="name" 
              className="border"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="text-xl font-bold">Category:</label>
            <select 
              id="category" 
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
            <label htmlFor="location" className="text-xl font-bold">Address:</label>
            <input 
              type="text" 
              id="location" 
              className="border"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-xl font-bold">Brief:</label>
            <input 
              type="text" 
              id="description" 
              className="border"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-xl font-bold">Phone Number:</label>
            <input 
              type="text" 
              id="phone" 
              className="border"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl font-bold">Email:</label>
            <input 
              type="email" 
              id="email" 
              className="border"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Online Presence</legend>

          <div className="flex flex-col">
            <label htmlFor="twitter_handle" className="text-xl font-bold">Twitter:</label>
            <input 
              type="text" 
              id="twitter_handle" 
              className="border"
              value={formData.twitter_handle}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="instagram_handle" className="text-xl font-bold">Instagram:</label>
            <input 
              type="text" 
              id="instagram_handle" 
              className="border"
              value={formData.instagram_handle}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="facebook_handle" className="text-xl font-bold">Facebook:</label>
            <input 
              type="text" 
              id="facebook_handle" 
              className="border"
              value={formData.facebook_handle}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="whatsapp_number" className="text-xl font-bold">WhatsApp:</label>
            <input 
              type="text" 
              id="whatsapp_number" 
              className="border"
              value={formData.whatsapp_number}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <div className="flex flex-col">
          <label htmlFor="detailed_description" className="text-xl font-bold">About Business:</label>
          <textarea 
            id="detailed_description" 
            className="border"
            value={formData.detailed_description}
            onChange={handleChange}
          />
        </div>

        <Button text="Register Business" onClick={(e) => handleSubmit(e)} />
      </form>
    </div>
  )
}

export default RegisterBusiness