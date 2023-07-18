"use client"

import { useState, useContext } from 'react';
import UserContext from '@contexts/UserContext';
import LoginSideBar from '@components/LoginSideBar';
import VehicleDetailsModal from '@components/VehicleDetailsModal';
import { Button, Card } from 'flowbite-react';
import { useRouter } from 'next/navigation';

const VehicleDetails = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [showVehicleDetailsModal, setShowVehicleDetailsModal] = useState(false);
  return (
    <div className='flex flex-row w-full mt-12 bg-gray-100'>
      <div className='rounded-lg p-5'>
        <LoginSideBar />
      </div>
      <div className='flex flex-col w-2/3 justify-between ml-5 p-5 bg-white shadow-md rounded-lg overflow-auto' style={{ maxHeight: '600px' }}>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between w-full mb-5'>
            <h1 className='heading_text text-3xl text-gray-700'>My Vehicles</h1>
            <div className='flex flex-row gap-4 '>
              <Button className='bg-custom-orange' onClick={() => router.push('/profile')}>
                Back to Profile
              </Button>
              <VehicleDetailsModal showVehicleDetailsModal={showVehicleDetailsModal} setShowVehicleDetailsModal={setShowVehicleDetailsModal} />
            </div>
          </div>
            {user.vehicle_details.map((vehicle, index) => (
              <Card key={index} className="max-w-full mb-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {vehicle.vehicle_make} {vehicle.vehicle_model}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Registration Number: {vehicle.registration_number}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Vehicle Type: {vehicle.vehicle_type}
                </p>
                <Button className='bg-custom-orange' onClick={() => handleEditVehicle(vehicle)}>
                  Edit
                </Button>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;