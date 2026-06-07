// import React from 'react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Layout = () => {

  const [showNav, setShowNav] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    setShowNav(false)
    setShowLogoutConfirm(false)
    navigate('/')
  }

  return (
    <>
      <header className='px-3 py-4 border-b border-b-[#F0A500] flex justify-between items-center lg:px-10'>
        <h1 className='text-[#5C3317] font-[Abril_Fatface] font-bold text-2xl'>LocalMarket</h1>

        <button
          className='w-10 sm:hidden'
          onClick={() => setShowNav(prev => !prev)}
        >
          <img src="/menu.png" alt="" className='w-full' />
        </button>
        
        <nav className={`${showNav ? 'absolute top-0 right-0 mt-20 bg-[#FFFDF5] py-5 px-10  flex-col gap-5 shadow-md' : ''} text-xl flex gap-5`}>
          <button onClick={() => setShowNav(false)}>
            <NavLink to="/">Home</NavLink>
          </button>
          <button onClick={() => setShowNav(false)}>
            <NavLink to="/listings">Listings</NavLink>
          </button>

          {user && !user.has_business && (
            <button onClick={() => setShowNav(false)}>
              <NavLink to="/registerbusiness">Register Business</NavLink>
            </button>
          )}

          {user ? (
            <>
              <button onClick={() => setShowNav(false)}>
                  <NavLink to="/mybusiness">Dashboard</NavLink>
                </button>
              <button className='cursor-pointer' onClick={() => setShowLogoutConfirm(true)}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowNav(false)}>
                <NavLink to="/login" state={{from: location}}>Login</NavLink>
              </button>
              <button onClick={() => setShowNav(false)}>
                <NavLink to="/signup">Sign Up</NavLink>
              </button>
            </>
          )}
        </nav>
      </header>

      <main className='px-3 py-4 font-[Lato] text-[#5C3317] lg:px-20'>
        <Outlet />
      </main>

      <footer>

      </footer>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full">
            <p className="text-lg font-semibold mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-full border border-gray-300 cursor-pointer"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-full bg-[#F0A500] text-white cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Layout