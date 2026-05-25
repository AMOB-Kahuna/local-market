// import React from 'react'
import { Outlet } from 'react-router'

const Layout = () => {


  return (
    <>
      <header className='px-3 py-4 border-b border-b-[#F0A500]'>
        <h1 className='text-[#5C3317] font-[Abril_Fatface] font-bold text-2xl'>LocalMarket</h1>
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