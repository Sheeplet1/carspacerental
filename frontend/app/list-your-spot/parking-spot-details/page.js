'use client'

import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import { useState } from 'react';

const ParkingSpotDetails = () => {
  const typeOfSpot = [
    'Carport',
    'Driveway',
    'Garage',
    'Parking Lot'
  ];

  const maxVehicleSize = [
    'Bike',
    'Hatchback',
    'Sedan',
    '4WD/SUV',
    'Van'
  ];

  const accessType = [
    'None',
    'Boom Gate',
    'Key',
    'Passcode',
    'Permit',
    'Remote',
    'Ticket',
    'Swipe Card'
  ];

  const electricCharging = [
    'Wall (AU/NZ)',
    'Type 1 (SAE J-1772)',
    'Type 2',
    'CHAdeMO'
  ];

  const [isTypeOfSpotOpen, setIsTypeOfSpotOpen] = useState(false);
  const [isMaxVehicleSizeOpen, setIsMaxVehicleSizeOpen] = useState(false);
  const [isAccessTypeOpen, setIsAccessTypeOpen] = useState(false);
  const [isElectricChargingOpen, setIsElectricChargingOpen] = useState(false);

  const[selectedTypeOfSpot, setSelectedTypeOfSpot] = useState('');
  const[selectedMaxVehicleSize, setSelectedMaxVehicleSize] = useState('');
  const[selectedAccessType, setSelectedAccessType] = useState('');
  const[selectedElectricCharging, setSelectedElectricCharging] = useState('');

  const[typeOfSpotError, setTypeOfSpotError] = useState('');
  const[maxVehicleSizeError, setMaxVehicleSizeError] = useState('');

  const toggleDropdown = (dropdownName) => {
    switch (dropdownName) {
      case 'typeOfSpot':
        setIsTypeOfSpotOpen(!isTypeOfSpotOpen);
        setIsMaxVehicleSizeOpen(false);
        setIsAccessTypeOpen(false);
        setIsElectricChargingOpen(false);
        break;
      case 'maxVehicleSize':
        setIsTypeOfSpotOpen(false);
        setIsMaxVehicleSizeOpen(!isMaxVehicleSizeOpen);
        setIsAccessTypeOpen(false);
        setIsElectricChargingOpen(false);
        break;
      case 'accessType':
        setIsTypeOfSpotOpen(false);
        setIsMaxVehicleSizeOpen(false);
        setIsAccessTypeOpen(!isAccessTypeOpen);
        setIsElectricChargingOpen(false);
        break;
      case 'electricCharging':
        setIsTypeOfSpotOpen(false);
        setIsMaxVehicleSizeOpen(false);
        setIsAccessTypeOpen(false);
        setIsElectricChargingOpen(!isElectricChargingOpen);
        break;
      default:
        break;
    }
  };

  const selectTypeOfSpot = (spot) => {
    setSelectedTypeOfSpot(spot);
    setIsTypeOfSpotOpen(false);
    setTypeOfSpotError(false);
  };

  const selectMaxVehicleSize = (size) => {
    setSelectedMaxVehicleSize(size);
    setIsMaxVehicleSizeOpen(false);
    setMaxVehicleSizeError(false);
  }

  const selectAccessType = (access) => {
    setSelectedAccessType(access);
    setIsAccessTypeOpen(false);
  };

  const selectElectricCharging = (charging) => {
    setSelectedElectricCharging(charging);
    setIsElectricChargingOpen(false);
  };

  const handleNextClick = () => {
    if(selectedTypeOfSpot === '') {
      setTypeOfSpotError('Type of Spot is required');
    } else {
      setTypeOfSpotError('');
    }
    if (!selectedMaxVehicleSize === '') {
      setMaxVehicleSizeError('Max. Vehicle Size is required');
    } else {
      setMaxVehicleSizeError('');
    }
  }

  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
        <div className='relative bottom-14 flex flex-col mr-44'>
          <h1 className='heading_text mb-5'>Tell us about your parking spot.</h1>

          <h2 className='text-lg font-bold'>Space Details</h2>

          <label className='mb-2 mt-2'>Type of Spot</label>
          <div className='relative'>
            <button
                id='dropdownDefaultButton-spotType'
                data-dropdown-toggle='typeOfSpot'
                className={`text-gray-500 text-left bg-white w-96 border-b border-black p-2 mb-4 ${typeOfSpotError ? 'border-red-500' : ''}`}
                type='button'
                onClick={() => toggleDropdown('typeOfSpot')}>
                {selectedTypeOfSpot || 'Choose your type of spot'}
            </button>
            {isTypeOfSpotOpen && (
            <div
              id='typeOfSpot'
              className={`absolute z-10 ${isTypeOfSpotOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul
                className='py-2 text-sm text-gray-700 dark:text-gray-20'
                aria-labelledby='dropdownDefaultButton-spotType'>
                {typeOfSpot.map((spot, index) => (
                  <li key={index}>
                    <button
                      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      onClick={() => selectTypeOfSpot(spot)}>
                    {spot}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
          {typeOfSpotError && (
            <p className='text-red-500 text-xs mt-1'>{typeOfSpotError}</p>
          )}

          <label className='mb-2'>Max. Vehicle Size</label>
          <div className='relative'>
            <button
              id='dropdownDefaultButton-vehicleSize'
              data-dropdown-toggle='maxVehicleSize'
              className={`text-gray-500 text-left bg-white w-96 border-b border-black p-2 mb-4 ${maxVehicleSizeError ? 'border-red-500' : ''}`}
              type='button'
              onClick={() => toggleDropdown('maxVehicleSize')}>
              {selectedMaxVehicleSize || 'Select max vehicle size'}
            </button>
            {isMaxVehicleSizeOpen && (
              <div
                id='maxVehicleSize'
                className={`absolute z-10 ${isMaxVehicleSizeOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul
                  className='py-2 text-sm text-gray-700 dark:text-gray-20'
                  aria-labelledby='dropdownDefaultButton-vehicleSize'>
                  {maxVehicleSize.map((size, index) => (
                    <li key={index}>
                      <button
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        onClick={() => selectMaxVehicleSize(size)}>
                      {size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {maxVehicleSizeError && (
            <p className='text-red-500 text-xs mt-1'>{maxVehicleSizeError}</p>
          )}

          <h6 className='text-lg font-bold'>How can drivers access this space? (optional)</h6>
          <label className='mb-2 mt-2'>Access Details:</label>
          <div className='relative'>
            <button
              id='dropdownDefaultButton-accessType'
              data-dropdown-toggle='accessType'
              className='text-gray-500 text-left bg-white w-96 border-b border-black p-2 mb-4'
              type='button'
              onClick={() => toggleDropdown('accessType')}>
              {selectedAccessType || 'Select access type'}
            </button>
            {isAccessTypeOpen && (
              <div
                id='accessType'
                className={`absolute z-10 ${isAccessTypeOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul
                  className='py-2 text-sm text-gray-700 dark:text-gray-20'
                  aria-labelledby='dropdownDefaultButton-accessType'>
                  {accessType.map((accType, index) => (
                    <li key={index}>
                      <button
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        onClick={() => selectAccessType(accType)}>
                      {accType}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <h6 className='text-lg font-bold'>Any other details? (optional)</h6>
          <label className='mb-2 mt-2'>Other Features:</label>
          <div className='relative'>
            <button
              id='dropdownDefaultButton-elecCharging'
              data-dropdown-toggle='electricCharging'
              className='text-gray-500 text-left bg-white w-96 border-b border-black p-2 mb-4'
              type='button'
              onClick={() => toggleDropdown('electricCharging')}>
              {selectedElectricCharging || 'Select electric charging'}
            </button>
            {isElectricChargingOpen && (
              <div
                id='elecCharging'
                className={`absolute z-10 ${isElectricChargingOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul
                  className='py-2 text-sm text-gray-700 dark:text-gray-20'
                  aria-labelledby='dropdownDefaultButton-elecCharging'>
                  {electricCharging.map((elecCharge, index) => (
                    <li key={index}>
                      <button
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        onClick={() => selectElectricCharging(elecCharge)}>
                      {elecCharge}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className='flex justify-between'>
            <Link href='/list-your-spot'>
              <button className='blue_btn'>Back</button>
            </Link>
            <Link href='/list-your-spot/parking-spot-details/describe-parking-spot'>
              <button className='blue_btn' onClick={handleNextClick}>Next</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default ParkingSpotDetails
