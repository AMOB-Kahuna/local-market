import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from "../components/Button"

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    if (!formData.email || !formData.password) {
      setError('All fields are required')
      return
    }

    try {
      await login(formData.email, formData.password)
      alert('Login successful!')
      navigate('/')
    } catch (err) {
      console.log(err)
      setError(authError || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-[Abril_Fatface] text-3xl font-bold text-center mb-6">Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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

          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="text-lg font-bold mb-2">Password:</label>
            <input 
              type="password" 
              id="password" 
              className="border border-gray-300 px-3 py-2 rounded"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <Button 
            text={loading ? "Logging in..." : "Login"} 
            onClick={() => {}}
          />
        </form>

        <p className="text-center mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login