'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'


const Help = () => {


  return (
    <div className='flex flex-row h-screen mt-14'>
      <Sidebar />
      <div className='relative bottom-14 flex flex-col mr-44'>
        <h1 className='heading_text'>Help</h1>
      </div>
    </div>
  )
}

export default Help