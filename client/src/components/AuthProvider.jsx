import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  console.log(user)

  const API_BASE = 'http://127.0.0.1:8000/api'

  const saveAuthData = ({ user, accessToken, refreshToken }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const signup = async (username, email, password) => {
    setLoading(true)
    setError(null)

    try {
      const registerRes = await fetch(`${API_BASE}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
      const registerData = await registerRes.json()

      if (!registerRes.ok) {
        throw new Error(
          registerData.username?.[0] ||
          registerData.email?.[0] ||
          registerData.password?.[0] ||
          'Signup failed'
        )
      }

      const tokenRes = await fetch(`${API_BASE}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      })
      const tokenData = await tokenRes.json()

      if (!tokenRes.ok) {
        throw new Error(tokenData.detail || 'Signup succeeded but token request failed')
      }

      saveAuthData({
        user: registerData,
        accessToken: tokenData.access,
        refreshToken: tokenData.refresh
      })
      setUser(registerData)

      return registerData
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      const tokenRes = await fetch(`${API_BASE}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      })
      const tokenData = await tokenRes.json()

      if (!tokenRes.ok) {
        throw new Error(tokenData.detail || 'Login failed')
      }

      // Optional: fetch user profile from backend
      const profileRes = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const profileData = await profileRes.json()

      if (!profileRes.ok) {
        throw new Error(profileData.detail || 'Could not load user profile')
      }

      saveAuthData({
        user: profileData,
        accessToken: tokenData.access,
        refreshToken: tokenData.refresh
      })
      setUser(profileData)

      return { ...tokenData, user: profileData }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}