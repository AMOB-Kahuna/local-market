import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  const saveAuthData = ({ user, accessToken, refreshToken }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const signup = async (username, email, password) => {
    setLoading(true)
    setError(null)

    try {
      const registerRes = await fetch(`${apiBaseUrl}/register/`, {
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

      const tokenRes = await fetch(`${apiBaseUrl}/token/`, {
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
      const tokenRes = await fetch(`${apiBaseUrl}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      })
      const tokenData = await tokenRes.json()

      if (!tokenRes.ok) {
        throw new Error(tokenData.detail || 'Login failed')
      }

      const profileRes = await fetch(`${apiBaseUrl}/login/`, {
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

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) throw new Error('No refresh token')

    const res = await fetch(`${apiBaseUrl}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.detail || 'Token refresh failed')

    localStorage.setItem('accessToken', data.access)
    return data.access
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}