import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'

const Login = () => {
  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='flex flex-col mr-44'>
        <p className='heading_text'>Login</p>

        <label className='mb-2 mt-4'>Email-Address:</label>
        <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='email' placeholder='Email' />

        <label className='mb-2'>Password:</label>
        <input className='w-96 border-2 border-gray-300 rounded-3xl p-2 mb-14' type='password' placeholder='Password' />

        <Link href='/login/forgotpassword'>
        <button className='mb-8 text-teal-400 text-xs align-content: flex-start'>Forgot password?</button>
        </Link>

        <div className='flex justify-between'>
          {/* <Link href='/'> */}
            <button className='blue_btn'>
              Back
            </button>
          {/* </Link>
          <Link> */}
            <button className='blue_btn'>
              Next
            </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Login