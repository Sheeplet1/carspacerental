'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import { useState } from 'react'

const SetPrice = () => {

  const[isHourlyActive, setIsHourlyActive] = useState(false);
  const[isMonthlyActive, setIsMonthlyActive] = useState(false);

  const hourlyToggle = () => {
    setIsHourlyActive(!isHourlyActive);
  };

  const monthlyToggle = () => {
    setIsMonthlyActive(!isMonthlyActive);
  }

  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='relative bottom-14 flex flex-col mr-44'>
        <h1 className='heading_text'>Set your price.</h1>
        <label className='mb-6 mt-4'>You can select either hourly or monthly bookings or both.</label>

        <h2 className='text-lg font-bold'>Hourly</h2>
        <div className='flex items-center mb-4'>
          <div
            className={`${isHourlyActive ? 'bg-custom-blue' : 'bg-gray-300'} w-6 h-6 rounded-full p-1 flex items-center cursor-pointer mr-2`}
            onClick={hourlyToggle}>
          </div>
          <span className="text-sm">Allow hourly bookings</span>

          <div>
            
          </div>
        </div>

        <h2 className='text-lg font-bold'>Monthly</h2>
        <div className='flex items-center mb-4'>
          <div
            className={`${isMonthlyActive ? 'bg-custom-blue' : 'bg-gray-300'} w-6 h-6 rounded-full p-1 flex items-center cursor-pointer mr-2`}
            onClick={monthlyToggle}>
          </div>
          <span className="text-sm">Allow monthly bookings</span>
        </div>

        <div className='flex justify-between'>
          <Link href='/list-your-spot/parking-spot-details/describe-parking-spot'>
            <button className='blue_btn'>Back</button>
          </Link>
          <Link href='/list-your-spot/parking-spot-details/describe-parking-spot/set-price/confirm-listing'>
            <button className='blue_btn'>Next</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SetPrice