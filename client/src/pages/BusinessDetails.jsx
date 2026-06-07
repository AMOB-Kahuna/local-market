import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Rating from "../components/Rating"
import Review from "../components/Review"

const BusinessDetails = () => {
  const { id } = useParams()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ rating: '', comment: '' })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
  // console.log(business)
  // console.log(currentUser)

  const fetchBusiness = async () => {
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/businesses/${id}/`)
      const data = await res.json()
      setBusiness(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchBusiness()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFormError('')
    setFormSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')

    if (!form.rating || !form.comment.trim()) {
      setFormError('Please provide both a rating and a comment.')
      return
    }

    const token = localStorage.getItem('accessToken')
    if (!token) {
      setFormError('You must be logged in to submit a review.')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          business: id,
          rating: form.rating,
          comment: form.comment,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || Object.values(data).flat().join(' ') || 'Could not submit review.')
      }

      setForm({ rating: '', comment: '' })
      setFormSuccess('Review submitted!')
      fetchBusiness()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const hasReviewed = business?.reviews?.some(
    (review) => review.user === currentUser?.username
  )

  if (loading) {
    return <h1 className="font-[Abril_Fatface] text-3xl font-bold px-5">Loading...</h1>
  }

  return (
    <>
      {business ? (
        <div className="max-w-6xl mx-auto px-5 py-10">
          <section>
            <img src={business.image || "/placeholder.png"} alt="" className="w-full h-80 object-cover rounded-3xl" />

            <div className="mt-8 text-center">
              <h2 className="font-[Abril_Fatface] text-4xl font-bold">{business.name}</h2>

              <div className="mt-4 flex flex-col items-center gap-3">
                <Rating rating={parseFloat(business.average_rating || 0)} />
                <p className="text-sm text-gray-500">{business.category} • {business.location}</p>
              </div>

              <div className="w-full flex flex-col gap-3 px-10 mt-8 md:flex-row md:justify-center">
                <button className="bg-[#F0A500] py-3 px-6 rounded-2xl text-[#FFFDF5]">Contact Business</button>
                <button className="border border-[#F0A500] py-3 px-6 rounded-2xl">Visit Website</button>
                <button className="border border-[#F0A500] py-3 px-6 rounded-2xl">Share</button>
              </div>
            </div>
          </section>

          <section className="mt-14 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-10">
              <div>
                <h2 className="font-[Abril_Fatface] text-2xl font-bold mb-4">About Us</h2>
                <p className="text-gray-700 leading-7">{business.detailed_description}</p>
              </div>

              <div>
                <h2 className="font-[Abril_Fatface] text-2xl font-bold mb-4">Reviews</h2>

                {business.reviews && business.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {business.reviews.map((review) => (
                      <Review key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">This business has no reviews yet.</p>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <h2 className="font-[Abril_Fatface] text-2xl font-bold mb-4">Leave a Review</h2>

                {formError && (
                  <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {formError}
                  </div>
                )}
                {formSuccess && (
                  <div className="mb-4 rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                    {formSuccess}
                  </div>
                )}

                {hasReviewed ? (
                  <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-900">
                    You already submitted a review for this business.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="rating" className="text-sm font-semibold block mb-2">Rating</label>
                      <select
                        id="rating"
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                      >
                        <option value="">Choose rating</option>
                        {[5, 4, 3, 2, 1].map((value) => (
                          <option key={value} value={value}>{value} star{value > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="comment" className="text-sm font-semibold block mb-2">Comment</label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                        rows="5"
                        className="w-full border border-gray-300 rounded-3xl px-4 py-3 text-sm"
                        placeholder="Tell others what you liked"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-[#F0A500] text-[#FFFDF5] px-6 py-3 rounded-2xl font-bold"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <aside className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <h2 className="font-[Abril_Fatface] text-2xl font-bold mb-4">Contact Info</h2>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Location:</strong> {business.location}</p>
                  <p><strong>Phone:</strong> {business.phone}</p>
                  <p><strong>Email:</strong> {business.email}</p>
                  <p><strong>WhatsApp:</strong> {business.whatsapp_number}</p>
                  <p><strong>Facebook:</strong> {business.facebook_handle}</p>
                  <p><strong>Twitter:</strong> {business.twitter_handle}</p>
                  <p><strong>Instagram:</strong> {business.instagram_handle}</p>
                </div>
              </div>
            </aside>
          </section>
        </div>
      ) : (
        <h1 className="font-[Abril_Fatface] text-3xl font-bold px-5">Business not found.</h1>
      )}
    </>
  )
}

export default BusinessDetails