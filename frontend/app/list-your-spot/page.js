'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import { useState } from 'react';
import SearchBar from '@components/SearchBar';

const ListYourSpot = () => {

  const [showParkingSpotDetails, setShowParkingSpotDetails] = useState(false);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const validateAddress = async () => {
    let isAddressExist = !!address;
    setAddressError(isAddressExist ? '' : 'This field is required');

    if (isAddressExist) {
      const body = {
        "address": address,
      }
    }
  }

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
            <SearchBar type='address' value={address} onChange={(a) => setAddress(a.target.value)} />
            <p className='error_text'>{addressError}</p>
          </div>
        </label>

        <div className='flex justify-between'>
          <Link href='/login'>
            <button className='blue_btn'>
              Back
            </button>
          </Link>
          <Link href='/list-your-spot/parking-spot-details'>
            <button className='blue_btn' onClick={() => validateAddress()}>
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ListYourSpot
