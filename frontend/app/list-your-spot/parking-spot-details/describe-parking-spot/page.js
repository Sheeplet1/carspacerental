import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'

const DescribeParkingSpot = () => {
  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='relative bottom-14 flex flex-col mr-44'>
        <h1 className='heading_text'>Describe your parking spot.</h1>

        <label className='mb-2 mt-4'>Describe your parking space:</label>
        <textarea
          className='w-96 h-32 border-2 border-gray-300 rounded-3xl p-2 resize-none mb-14 text-xs'
          placeholder='Describe what makes your spot special (e.g. nearby locations, convenience).'/>

        <label className='mb-2 mt-4'>Instructions for drivers:</label>
        <textarea
          className='w-96 h-32 border-2 border-gray-300 rounded-3xl p-2 resize-none mb-14 text-xs'
          placeholder='Describe how to access your spot. This will be hidden until a booking is made.'/>

        <div className='flex justify-between'>
          <Link href='/list-your-spot/parking-spot-details'>
            <button className='blue_btn'>Back</button>
          </Link>
          <Link href='/list-your-spot/parking-spot-details/describe-parking-spot/set-price'>
            <button className='blue_btn'>Next</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DescribeParkingSpot