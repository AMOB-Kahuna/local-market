// import React from 'react'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Layout = () => {

  const [showNav, setShowNav] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setShowNav(false)
    navigate('/')
  }

  return (
    <>
      <header className='px-3 py-4 border-b border-b-[#F0A500] flex justify-between items-center'>
        <h1 className='text-[#5C3317] font-[Abril_Fatface] font-bold text-2xl'>LocalMarket</h1>

        <button
          className='w-10'
          onClick={() => setShowNav(prev => !prev)}
        >
          <img src="/menu.png" alt="" className='w-full' />
        </button>
        
        {showNav &&
          <nav className='absolute top-0 right-0 mt-20 bg-[#FFFDF5] py-5 px-10 text-xl flex flex-col gap-5 shadow-md'>
            <button onClick={() => setShowNav(false)}>
              <NavLink to="/">Home</NavLink>
            </button>
            <button onClick={() => setShowNav(false)}>
              <NavLink to="/listings">Listings</NavLink>
            </button>
            <button onClick={() => setShowNav(false)}>
              <NavLink to="/registerbusiness">Register Business</NavLink>
            </button>

            {user ? (
              <>
                <button onClick={() => setShowNav(false)}>
                    <NavLink to="/mybusiness">Dashboard</NavLink>
                  </button>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => setShowNav(false)}>
                  <NavLink to="/login">Login</NavLink>
                </button>
                <button onClick={() => setShowNav(false)}>
                  <NavLink to="/signup">Sign Up</NavLink>
                </button>
              </>
            )}
          </nav>
        }
      </header>

      <main className='px-3 py-4 font-[Lato] text-[#1F1F1F]'>
        <Outlet />
      </main>

      <footer>

      </footer>
    </>
  )
}

export default Layout