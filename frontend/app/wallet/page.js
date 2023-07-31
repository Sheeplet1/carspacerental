'use client'

import React from 'react'
import LoginSidebar from '@components/LoginSideBar';
import Link from 'next/link'
import { useState } from 'react';
import SearchBar from '@components/SearchBar';
import { useRouter } from 'next/navigation';

const Wallet = () => {

  return (
    <div className='flex flex-row w-full justify-between mt-12'>
      <div className='w-1/3'>
        <LoginSidebar />
      </div>
      <div className='flex flex-col w-2/3'>
        <h1 className='heading_text'>
          Wallet
        </h1>

        <div className="border border-blue-300 rounded p-4">

        </div>

        <h1 href='#' className='heading_text hover:underline'>
          Recent transactions
        </h1>
      </div>
    </div>
  )
}

export default Wallet
