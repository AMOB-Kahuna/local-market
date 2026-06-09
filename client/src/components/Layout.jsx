// import React from 'react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Layout = () => {

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const location = useLocation()

  const [showNav, setShowNav] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  // console.log(location.pathname)
  // console.log(searchParams)
  const isListingsPage = location.pathname === '/listings'
  const viewMode = searchParams.get('view') || 'list'

  const handleLogout = () => {
    logout()
    setShowNav(false)
    setShowLogoutConfirm(false)
    navigate('/')
  }

  const toggleView = () => {
    const next = viewMode === 'map' ? 'list' : 'map'
    setSearchParams({ view: next })
  }

  return (
    <>
      <header className='px-3 py-4 border-b border-b-[#F0A500] flex justify-between items-center lg:px-10'>
        <h1 className='text-[#5C3317] font-[Abril_Fatface] font-bold text-2xl'>LocalMarket</h1>

        <div className='flex justify-center gap-7'>
          {isListingsPage &&
            <button
              className='w-8 sm:hidden cursor-pointer'
              onClick={toggleView}
            >
              {
                viewMode === 'map' ?
                <img src="/map-on.png" alt="" className='w-full' /> :
                <img src="/map-off.png" alt="" className='w-full' />
              }
            </button>
          }

          <button
            className='w-10 sm:hidden cursor-pointer'
            onClick={() => setShowNav(prev => !prev)}
          >
            <img src="/menu.png" alt="" className='w-full' />
          </button>
        </div>
        
        <nav
          className={`
            absolute top-16 right-3 z-40 flex-col gap-4 rounded-xl bg-[#FFFDF5] p-5 shadow-md
            ${showNav ? 'flex' : 'hidden'}
            sm:static sm:flex sm:flex-row sm:items-center sm:gap-5 sm:p-0 sm:shadow-none text-xl
          `}
        >
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
              <button className="cursor-pointer" onClick={() => setShowLogoutConfirm(true)}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setShowNav(false)}>
                <NavLink to="/login" state={{ from: location }}>Login</NavLink>
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