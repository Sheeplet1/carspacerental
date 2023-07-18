'use client'

import React, { useState } from 'react'
import Sidebar from '@components/Sidebar'


const Help = () => {
  return (
    <div className='flex flex-row w-full justify-between mt-12'>
      <div className='w-1/3'>
        <Sidebar />
      </div>
      <div className='flex flex-col w-full'>
        <h1 className='heading_text'>Frequently Asked Questions</h1>

        <h2 className='text-lg font-bold mt-2'>I'm looking for parking.</h2>
        <div className='mt-2 space-y-4'>
          <details className='border border-gray-300 rounded p-4'>
            <summary className='font-bold cursor-pointer'>Why do I need to provide my vehicle details?</summary>
            <div className='mt-4 mb-2 leading-[1.5em] pl-4'>
                There are two main reasons we require your vehicle details.
                <br/>
                <br/>
                Firstly, by adding your vehicle details, we automatically filter and recommend parking spaces that are suitable. For instance, if you have a larger vehicle such as a 4WD, you may require a large spot.
                <br/>
                <br/>
                Secondly, we also ask for your details so we can provide Hosts with peace of mind that the right user has parked in their driveway or garage.
                <br/>
                <br/>
                Add your vehicle’s details by clicking on your profile &gt; ‘Vehicle Details’ &gt; ‘Add A Vehicle‘. If you have more than one vehicle, add your additional vehicles as well and set the one your use most frequently as your default vehicle.
            </div>
          </details>

          <details className='border border-gray-300 rounded p-4'>
            <summary className='font-bold cursor-pointer'>What is the difference between the payment options?</summary>
            <div className='mt-4 mb-2 leading-[1.5em] pl-4'>
              Once you have added your credit or debit card details, you can choose either the ‘Pay As You Go’ or ‘Automatic Top Up’.
              <br/>
              <br/>
              If you select to the ‘Pay As You Go’, you will incur a 50 cent transaction fee if the transaction is below $25. Meanwhile, the ‘Automatic Top Up’ option does not come with any transaction fees and will automatically top up your account when your balance falls below $10.
            </div>
          </details>

          <details className='border border-gray-300 rounded p-4'>
            <summary className='font-bold cursor-pointer'>How long can I book parking for?</summary>
            <div className='mt-4 mb-2 leading-[1.5em] pl-4 z-10'>You can book parking for as little as 15 minutes, for several days or even on a monthly basis.</div>
          </details>
        </div>

        <h2 className='text-lg font-bold mt-2'>I rent out my car space.</h2>
        <div className='mt-2 space-y-4'>
          <details className='border border-gray-300 rounded p-4'>
            <summary className='font-bold cursor-pointer'>How can I list my availability in advance?</summary>
            <div className='mt-4 mb-2 leading-[1.5em] pl-4 z-10'>
            For our hosts that are listed their spot already – thank you for listing with SFCars!
            <br/>
            <br/>
            Once you sign into your account, go to ‘Calendar’ &gt; select your Calendar &gt; ‘Edit Availabilities’ &gt; ‘Add Another Availability’ and select the type of availability you’d like to add. This function will be particularly helpful if you are planning on going away or know what your plans are for the week(s) ahead.
            </div>
          </details>

          <details className='border border-gray-300 rounded p-4'>
            <summary className='font-bold cursor-pointer'>What if a driver overstays their booking?</summary>
            <div className='mt-4 mb-2 leading-[1.5em] pl-4 z-10'>
            If someone has overstayed their booking, we ask you go into your ‘Calendar‘, ‘Bookings‘, select the last booking and ‘Lodge an Incident‘. The SFCars team will then assess the situation. You could receive $10 compensation for every hour the booking has been exceeded.
            <br/>
            <br/>
            In the background, SFCars is working on a technology solution that will help better track check ins and check outs. In the meantime, if you have any questions or feedback please contact the SFCars team on support@homie.com or +61-234-567-890.
            </div>
          </details>

          <details className='border border-gray-300 rounded p-4'>
            <summary className='font-bold cursor-pointer'>How much does it cost to get started?</summary>
            <div className='mt-4 mb-2 leading-[1.5em] pl-4 z-10'>It costs nothing to create your listing on SFCars. So really... what are you waiting for?</div>
          </details>
        </div>

        <h2 className='text-lg font-bold mt-2'>My question is not on the FAQ. What do I do?</h2>
        <div className='mt-2 space-y-4'>
          <details className="border border-gray-300 rounded p-4">
            <summary className="font-bold cursor-pointer">Contact us here!</summary>
            <div className="mt-4">
              <p className="mb-2">
                <strong>Email:</strong> support@homie.com
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> +61 234 567 890
              </p>
              <p className="mb-2">
                <strong>Address:</strong> 123 Main St, City, State, ZIP
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default Help
