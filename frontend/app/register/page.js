'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'
import { useRouter } from 'next/router';
import { checkPasswordValidation, makeRequest } from '@utils/validatePassword';

import { useState } from 'react';

const Register = () => {
  const [showFurtherRegistration, setShowFurtherRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const validateRegister = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let isEmailExist = !!email;
    let isEmailValid = isEmailExist && emailPattern.test(email);
    setEmailError(isEmailExist ? (isEmailValid ? '' : 'Enter a valid email address') : 'This field is required');

    let isConfirmEmailExist = !!confirmEmail;
    let areEmailsSame = isConfirmEmailExist && email === confirmEmail;
    setConfirmEmailError(isConfirmEmailExist ? (areEmailsSame ? '' : 'Email addresses do not match') : 'This field is required');

    let isPasswordExist = !!password;
    const passwordErrorString = isPasswordExist && checkPasswordValidation(password);
    let isPasswordValid = isPasswordExist && !passwordErrorString;
    setPasswordError(isPasswordExist ? (isPasswordValid ? '' : passwordErrorString) : 'This field is required');

    if (isEmailValid && areEmailsSame && isPasswordValid) {
      setShowFurtherRegistration(true);
    }
  }

  const validateFurtherRegistration = async () => {
    let isFirstNameValid = !!firstName;
    setFirstNameError(isFirstNameValid ? '' : 'This field is required');

    let isLastNameValid = !!lastName;
    setLastNameError(isLastNameValid ? '' : 'This field is required');

    let isPhoneNumberExist = !!phoneNumber;
    let isPhoneNumberValid = isPhoneNumberExist && phoneNumber.length === 10 && phoneNumber.startsWith('04');
    setPhoneNumberError(isPhoneNumberExist ? (isPhoneNumberValid ? '' : 'Enter a valid phone number') : 'This field is required');

    if (isFirstNameValid && isLastNameValid && isPhoneNumberValid) {
      const response = await makeRequest('/register', 'POST', { email, password, firstName, lastName, phoneNumber });
      if (response.error) {
        setEmailError(response.error);
        setShowFurtherRegistration(false);
      } else {
        localStorage.setItem('token', response.token);
        localStorage.setItem('u_id', response.u_id);
        router.push('/');
      }
    }
  }

  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      {
        showFurtherRegistration ? (
          <div className='relative bottom-14 flex flex-col mr-44'>
            <p className='heading_text'>Further Registration</p>

            <label className='mb-2'>First-Name:</label>
            <div className='mb-10'>
              <input className='w-96 border-2 border-gray-300 rounded-3xl p-2' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Jane' />
              <p className='error_text'>{firstNameError}</p>
            </div>

            <label className='mb-2'>Last-Name:</label>
            <div className='mb-10'>
              <input className='w-96 border-2 border-gray-300 rounded-3xl p-2' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Doe' />
              <p className='error_text'>{lastNameError}</p>
            </div>

            <label className='mb-2'>Phone number:</label>
            <div className='mb-10'>
              <input className='w-96 border-2 border-gray-300 rounded-3xl p-2' type='number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='0412345678' />
              <p className='error_text'>{phoneNumberError}</p>
            </div>

            <div className='flex justify-between'>
              <button className='blue_btn' onClick={() => setShowFurtherRegistration(false)}>
                Back
              </button>
              <button className='blue_btn' onClick={() => validateFurtherRegistration()}>
                Register
              </button>
            </div>
          </div>
        ) : (
          <div className='relative bottom-14 flex flex-col mr-44 '>
            <p className='heading_text'>Register</p>

            <label className='mb-2'>Email-Address:</label>
            <div className='mb-10'>
              <input className='w-96 border-2 border-gray-300 rounded-3xl p-2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='jane.doe@email.com' />
              <p className='error_text'>{emailError}</p>
            </div>

            <label className='mb-2'>Confirm your Email-Address:</label>
            <div className='mb-10'>
              <input className='w-96 border-2 border-gray-300 rounded-3xl p-2' type='email' value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} placeholder='jane.doe@email.com' />
              <p className='error_text'>{confirmEmailError}</p>
            </div>

            <label className='mb-2'>Password:</label>
            <div className='mb-10'>
              <input className='w-96 border-2 border-gray-300 rounded-3xl p-2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='janedoe123' />
              <p className='error_text'>{passwordError}</p>
            </div>

            <div className='flex justify-between'>
              <button className='blue_btn' onClick={() => setShowFurtherRegistration(false)}>
                Back
              </button>
              <button className='blue_btn' onClick={() => validateRegister()}>
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
