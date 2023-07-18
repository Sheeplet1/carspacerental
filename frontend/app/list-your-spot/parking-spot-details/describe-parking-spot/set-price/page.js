'use client'

import React from 'react'
import LoginSidebar from '@components/LoginSideBar';
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

const SetPrice = () => {
  const [isHourlyActive, setIsHourlyActive] = useState(false);
  const [isMonthlyActive, setIsMonthlyActive] = useState(false);
  const [hourlyPrice, setHourlyPrice] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const hourlyToggle = () => {
    setIsHourlyActive(!isHourlyActive);
  };

  const monthlyToggle = () => {
    setIsMonthlyActive(!isMonthlyActive);
  }

  const handleNextClick = () => {
    const ratePattern = /^\d+(\.\d+)?$/;
    let hourlyExist = !!hourlyPrice;
    let hourlyValid = hourlyExist && ratePattern.test(hourlyPrice);
    let monthlyExist = !!monthlyPrice;
    let monthlyValid = monthlyExist && ratePattern.test(monthlyPrice);

    if (!isHourlyActive && !isMonthlyActive) {
      setErrorMessage('Please select at least hourly or monthly booking.');
    }

    if (isHourlyActive) {
      setErrorMessage(hourlyExist ? (hourlyValid ? '' : 'Please enter digits only.') : 'Please enter an hourly rate.')
    }

    if (isMonthlyActive) {
      setErrorMessage(monthlyExist ? (monthlyValid ? '' : 'Please enter digits only.') : 'Please enter a monthly rate.')
    }

    if ((isHourlyActive && hourlyValid) || (isMonthlyActive && monthlyValid)) {
      router.push('/list-your-spot/parking-spot-details/describe-parking-spot/set-price/confirm-listing');
    }
  }

  return (
    <div className='flex flex-row w-full mt-12'>
      <div className='w-1/3'>
        <LoginSidebar />
      </div>
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
        </div>
        {isHourlyActive && (
          <>
            <label className='mb-2 mt-2'>Hourly</label>
            <div className='relative'>
              <input
                className='text-gray-500 text-left w-96 border-b border-black pl-8 p-2 mb-4'
                placeholder='0.00'
                value={hourlyPrice}
                onChange={(e) => setHourlyPrice(e.target.value)}/>
                <span className='absolute left-3 top-2'>$</span>
            </div>
          </>
        )}

        <h2 className='text-lg font-bold'>Monthly</h2>
        <div className='flex items-center mb-4'>
          <div
            className={`${isMonthlyActive ? 'bg-custom-blue' : 'bg-gray-300'} w-6 h-6 rounded-full p-1 flex items-center cursor-pointer mr-2`}
            onClick={monthlyToggle}>
          </div>
          <span className="text-sm">Allow monthly bookings</span>
        </div>
        {isMonthlyActive && (
          <>
            <label className='mb-2 mt-2'>Monthly</label>
            <div className='relative'>
              <input
                className='text-gray-500 text-left w-96 border-b border-black pl-8 p-2 mb-4'
                placeholder='0.00'
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(e.target.value)}/>
                  <span className='absolute left-3 top-2'>$</span>
            </div>
          </>
        )}

        {errorMessage && <p className='text-red-500 mb-4 bg-red-100 py-2 px-4 text-center'>{errorMessage}</p>}

        <div className='flex justify-between'>
          <Link href='/list-your-spot/parking-spot-details/describe-parking-spot'>
            <button className='blue_btn'>Back</button>
          </Link>
          <button className='blue_btn' onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default SetPrice