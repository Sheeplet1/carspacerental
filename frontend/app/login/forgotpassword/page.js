import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'

const ForgotPassword = () => {
  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='flex flex-col mr-44'>
        <p className='heading_text'>
          Forgotten you password?
        </p>
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          Let's search for your account!
        </p>

        <label className='mb-2 mt-4'>
          Please enter your e-mail address:
        </label>
        <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='email' placeholder='E-mail' />

        <div className='flex justify-between'>
          <Link href='/login'>
            <button className='blue_btn'>
              Back
            </button>
          </Link>
          {/* <Link> */}
            <button className='blue_btn'>
              Search Account
            </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword