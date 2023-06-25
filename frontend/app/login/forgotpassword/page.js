'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import { useState } from 'react';
import { makeRequest } from '@utils/makeRequest';
import { useRouter } from 'next/navigation'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const router = useRouter();

  const sendEmail = async () => {
    let isEmailExist = !!email;
    setEmailError(isEmailExist ? '' : 'This field is required');

    if (isEmailExist) {
      const body = {
        "email": email,
      }
      // const response = await makeRequest('/auth/forgotpassword', 'POST', body);
      if (response.error) {
        setEmailError(response.error);
      } else {
        router.push('/login');
      }
    }
  }

  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='relative bottom-14 flex flex-col mr-44'>
        <h1 className='heading_text'>
          Forgotten you password?
        </h1>
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          Let's search for your account!
        </p>

        <label htmlFor='email' className='mb-2 mt-4'>
          Please enter your e-mail address:
          <div className='mb-10'>
            <input id='email' className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='jane.doe@email.com' />
            <p className='error_text'>{emailError}</p>
          </div>
        </label>

        <div className='flex justify-between'>
          <Link href='/login'>
            <button className='blue_btn'>
              Back
            </button>
          </Link>
          {/* <Link> */}
          <button className='blue_btn' onClick={() => sendEmail()}>
            Send Email
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword