import { useEffect, useState } from 'react'
import Button from './Button'

const BusinessProfileForm = ({ business, onSaved }) => {
  const [form, setForm] = useState(business || {})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    if (!message) return

    const timeoutId = setTimeout(() => {
      setMessage(null)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [message])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) setForm(prev => ({ ...prev, [name]: files[0] }))
    else setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const fd = new FormData()
      const fields = [
        'name','category','location','description','detailed_description',
        'phone','email','instagram_handle','twitter_handle','facebook_handle','whatsapp_number','image'
      ]
      fields.forEach(k => {
        if (form[k] !== undefined && form[k] !== null) fd.append(k, form[k])
      })

      const res = await fetch('http://127.0.0.1:8000/api/my-business/', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || Object.values(data).flat().join(' ') || 'Save failed')
      onSaved(data)
      setMessage({ type: 'success', text: 'Profile saved.' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="">
      {message && (
        <div className={`${message.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} border px-4 py-3 rounded`}>
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-lg font-bold mb-1 block">Business Name</label>
          <input name="name" value={form.name || ''} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded" />
        </div>

        <div>
          <label className="text-lg font-bold mb-1 block">Category</label>
          <input name="category" value={form.category || ''} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded" />
        </div>

        <div>
          <label className="text-lg font-bold mb-1 block">Location</label>
          <input name="location" value={form.location || ''} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded" />
        </div>

        <div>
          <label className="text-lg font-bold mb-1 block">Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded" />
        </div>

        <div>
          <label className="text-lg font-bold mb-1 block">Contact Email</label>
          <input name="email" value={form.email || ''} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded" />
        </div>

        <div>
          <label className="text-lg font-bold mb-1 block">Whatsapp</label>
          <input name="whatsapp_number" value={form.whatsapp_number || ''} onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded" />
        </div>
      </div>

      <div>
        <label className="text-lg font-bold mb-1 block">Short Description</label>
        <input name="description" value={form.description || ''} onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded" />
      </div>

      <div>
        <label className="text-lg font-bold mb-1 block">Detailed Description</label>
        <textarea name="detailed_description" value={form.detailed_description || ''} onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded h-28" />
      </div>

      <div>
        <label className="text-lg font-bold mb-1 block">Image</label>
        {form.image && typeof form.image === 'string' && (
          <img src={form.image} alt="business" className="w-40 h-28 object-cover rounded mb-2" />
        )}
        <input type="file" name="image" className='w-full border border-gray-300 px-3 py-2 cursor-pointer' onChange={handleChange} />
      </div>

      <div className="flex justify-end mt-5">
        <Button text={saving ? 'Saving...' : 'Save Profile'} onClick={() => {}} />
      </div>
    </form>
  )
}

export default BusinessProfileForm