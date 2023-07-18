import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'

const ConfirmListing = () => {
  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='relative bottom-14 flex flex-col mr-44'>
        <h1 className='heading_text'>Listing Confirmed!</h1>

        <label className='mb-10 mt-4'>Congratulations! Your spot has been listed successfully.</label>

        <div className='flex justify-between'>
          <Link href='/list-your-spot/parking-spot-details/describe-parking-spot/set-price'>
            <button className='blue_btn'>Back</button>
          </Link>
          <Link href='/'>
            <button className='blue_btn'>Home</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmListing