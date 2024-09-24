import React from 'react'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'
import SubtitleConverter from '../components/SubtitleConverter'

export const MainLayout = () => {
  return (
    <div className='flex flex-col dark:bg-black min-h-screen'>
        <Navbar />
        <div className="flex-grow dark:bg-black bg-slate-100">
            <SubtitleConverter />
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}
