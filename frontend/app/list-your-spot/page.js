'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import { useState } from 'react';
import SearchBar from '@components/SearchBar';
import { useRouter } from 'next/navigation';

const ListYourSpot = () => {
  const [address, setAddress] = useState(null);
  const [addressError, setAddressError] = useState('');
  const router = useRouter();

  const validateAddress = () => {
    console.log(address);
    if (address) {
      router.push('/list-your-spot/parking-spot-details');
    } else {
      setAddressError('Please enter address.');
    }
  }

  const searchClick = (data) => {
    if (data) {
      setAddress(data);
    }
  };

  return (
    <div className='flex flex-row h-screen mt-14'>
      <Sidebar />
      <div className='relative bottom-14 flex flex-col mr-44'>
        <h1 className='heading_text'>
          List your spot!
        </h1>

        <label htmlFor='address' className='mb-2 mt-4'>
          Enter your address:
          <div className='w-96 mb-14'>
            <SearchBar
              placeholder="Search Address"
              className="border border-transparent w-full h-12 px-3 rounded-full shadow-md text-base outline-none overflow-ellipsis overflow-hidden whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 placeholder-black-400"
              onSearch={searchClick}/>
              {addressError && <p className='error_text'>{addressError}</p>}
          </div>
        </label>

        <div className='flex justify-between'>
          <Link href='/login'>
            <button className='blue_btn'>
              Back
            </button>
          </Link>
          <Link href='/list-your-spot/parking-spot-details'>
            <button className='blue_btn' onClick={validateAddress}>
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ListYourSpot
