import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './components/nav/Navbar'

const Root = () => {
  return (
    <div className='flex h-[100%]'>
        <Sidebar/>
        <div className='p-3 w-5/6 absolute right-0 overflow-x-hidden'>
            <Navbar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Root