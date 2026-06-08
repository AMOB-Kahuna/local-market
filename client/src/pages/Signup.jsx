import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from "../components/Button"

const Signup = () => {
  const navigate = useNavigate()
  const { signup, loading, error: authError } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      await signup(formData.username, formData.email, formData.password)
      // alert('Signup successful! Please login.')
      navigate('/login')
    } catch (err) {
      console.log(err)
      setError(authError || 'Signup failed. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-[Abril_Fatface] text-3xl font-bold text-center mb-6">Sign Up</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="text-lg font-bold mb-2">Username:</label>
            <input 
              type="text" 
              id="username" 
              className="border border-gray-300 px-3 py-2 rounded"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-lg font-bold mb-2">Email:</label>
            <input 
              type="email" 
              id="email" 
              className="border border-gray-300 px-3 py-2 rounded"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-lg font-bold mb-2">Password:</label>
            <input 
              type="password" 
              id="password" 
              className="border border-gray-300 px-3 py-2 rounded"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label htmlFor="confirmPassword" className="text-lg font-bold mb-2">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="border border-gray-300 px-3 py-2 rounded"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>

          <Button 
            text={loading ? "Signing up..." : "Sign Up"} 
            onClick={() => {}}
          />
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup