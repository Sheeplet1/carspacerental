'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import { useState, useContext } from 'react';
import { makeRequest } from '@utils/makeRequest';
import { useRouter } from 'next/navigation'
import UserContext from '@contexts/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();
  const { setToken } = useContext(UserContext);

  const validateLogin = async () => {
    let isEmailExist = !!email;
    setEmailError(isEmailExist ? '' : 'This field is required');

    let isPasswordExist = !!password;
    setPasswordError(isPasswordExist ? '' : 'This field is required');

    if (isEmailExist && isPasswordExist) {
      const body = {
        "email": email,
        "password": password,
      }
      const response = await makeRequest('/auth/login', 'POST', body);
      if (response.error) {
        setEmailError(response.error);
      } else {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        router.push('/');
      }
    }
  }

  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='relative bottom-14 flex flex-col mr-44'>
        <h1 className='heading_text'>Login</h1>

        <label htmlFor='email' className='mb-2'>
          Email-Address:
          <div className='mb-10'>
            <input id='email' className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='jane.doe@email.com' />
            <p className='error_text'>{emailError}</p>
          </div>
        </label>

        <label htmlFor='password' className='mb-2'>
          Password:
          <div className='mb-2'>
            <input id='password' className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Janedoe@123' />
            <p className='error_text'>{passwordError}</p>
          </div>
        </label>

        <Link id='forgotPassword' className='mb-20 text-teal-400 text-xs align-content: flex-start' href='/login/forgotpassword'>
          Forgot password?
        </Link>

        <div className='flex justify-between'>
          {/* <Link href='/'> */}
          <button className='blue_btn'>
            Back
          </button>
          {/* </Link>
          <Link> */}
          <button className='blue_btn' onClick={() => validateLogin()}>
            Login
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Login