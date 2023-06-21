'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'

import { useState } from 'react';

const Register = () => {

  const [showFurtherRegistration, setShowFurtherRegistration] = useState(false);

  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      {
        showFurtherRegistration ? (
          <div className='flex flex-col mr-44'>
            <p className='heading_text'>Further Register</p>

            <label className='mb-2'>First-Name:</label>
            <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='text' placeholder='Email' />

            <label className='mb-2'>Last-Name:</label>
            <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='text' placeholder='Confirm Email' />

            <label className='mb-2'>Postcode:</label>
            <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='number' placeholder='Password' />

            <label className='mb-2'>Phone number:</label>
            <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='number' placeholder='Password' />

            <div className='flex justify-between'>
              <button className='blue_btn'>
                Back
              </button>
              <button className='blue_btn'>
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col mr-44'>
            <p className='heading_text'>Register</p>

            <label className='mb-2'>Email-Address:</label>
            <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='email' placeholder='Email' />

            <label className='mb-2'>Confirm your Email-Address:</label>
            <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='email' placeholder='Confirm Email' />

            <label className='mb-2'>Password:</label>
            <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='password' placeholder='Password' />

            <div className='flex justify-between'>
              <button className='blue_btn' onClick={() => setShowFurtherRegistration(false)}>
                Back
              </button>
              <button className='blue_btn' onClick={() => setShowFurtherRegistration(true)}>
                Next
              </button>
            </div>
          </div >
        )
      }
    </div >
  )
}

export default Register