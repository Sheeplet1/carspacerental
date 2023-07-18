"use client"


import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const VehicleForm = () => {
  const [vehicleRegistration, setvehicleRegistration] = useState('');
  const [vehicleMake, setvehicleMake] = useState('');
  const [vehicleModel, setvehicleMode] = useState('');
  const [isOn, setIsOn] = useState(false);

  const handleButtonClick = () => {
    setIsOn(!isOn); // Toggle the state between Yes and No
  };

  const router = useRouter();

  const handleConfirm = () => {
    // Handle form submission or validation
    console.log('VehicleDetail Confirmed');
    router.push('/booking');
  };

  return (
    <div className='flex flex-col h-screen mt-14'>
      <h1 className='heading_text'>Vehicle Detail</h1>

      <div className='mb-10'>
          </div>
          <label htmlFor="vehicleModel" className='mb-2'></label>
      <div className="payment-form__card">
        <div className="payment-form__card-image">
        </div>

        <div className="payment-form__card-details">
        <h3 className='font-bold text-sm text-gray-500 mb-2'>Vehicle Registration:</h3>
          <input
            id="vehicleRegistrationr"
            className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
            type="text"
            value={vehicleRegistration}
            onChange={(e) => setvehicleRegistration(e.target.value)}
            placeholder="eg.QW89BV"
          />

        <div className='mb-10'>
          </div>
          <label htmlFor="vehicleModel" className='mb-2'></label>
        <div className="mb-4">
          <h3 className='font-bold text-sm text-gray-500 mb-2'>Vehicle Type:</h3>
          <select
            className="border rounded p-2 w-full"
            onChange={(e) => setSort(e.target.value)}
          >
            <option >Select your vehicle type</option>
            <option >Bike</option>
            <option >Hatchback</option>
            <option >Sedan</option>
            <option >4WD/SUV</option>
            <option >Van</option>
          </select>
        </div>
          
          <div className='mb-10'>
          </div>
          <h3 className='font-bold text-sm text-gray-500 mb-2'>Vehicle Make:</h3>
          <label htmlFor="vehicleMake" className='mb-2'>
          <input
            id="vehicleMake"
            className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
            type="text"
            value={vehicleMake}
            onChange={(e) => setvehicleMake(e.target.value)}
            placeholder="eg.Toyota"
          />
          </label>

          <div className='mb-10'>
          </div>
          <h3 className='font-bold text-sm text-gray-500 mb-2'>Vehicle Mode:</h3>
          <input
            id="vehicleModel"
            className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
            type="text"
            value={vehicleModel}
            onChange={(e) => setvehicleModel(e.target.value)}
            placeholder="eg.Corolla"
          />
        </div>

        <div className='mb-10'>
          </div>
          <h3 className='font-bold text-sm text-gray-500 mb-2'>Make this my default vehicle:</h3>

          <button
            className={`choose-button ${isOn ? 'yes' : 'no'}`}
            onClick={handleButtonClick}
            >
            {isOn ? 'YES' : 'NO'}
            </button>
                
        </div>

      <div className='mb-10'>
      </div>
      <div className='flex justify-between'>
            <button className='blue_btn' onClick={() => handleConfirm()}>
            Confirm
            </button>
      </div>

    </div>
  );
};

export default VehicleForm;
