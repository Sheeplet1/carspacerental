import React from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'

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

    return (
        <div className='flex flex-row h-screen'>
            <Sidebar />
            <div className='relative bottom-14 flex flex-col mr-44'>
                <h1 className='heading_text mb-5'>
                Tell us about your parking spot.
                </h1>

                <h6 className='text-lg font-bold dark:text-white'>
                Space Details
                </h6>
                <label className='mb-2 mt-2'>
                Type of Spot
                </label>
                <input className='w-96 border-b border-black p-2 mb-4' type='address' placeholder='Choose your type of spot'/>
                <label className='mb-2'>
                Max. Vehicle Size
                </label>
                <input className='w-96 border-b border-black p-2 mb-14' type='address' placeholder='Choose your type of spot'/>


                <h6 className='text-lg font-bold dark:text-white'>
                How can drivers access this space? (optional)
                </h6>
                <label className='mb-2 mt-2'>
                Type of Spot:
                </label>
                <input className='w-96 border-b border-black p-2 mb-14' type='address' placeholder='Choose your type of spot'/>

                <h6 className='text-lg font-bold dark:text-white'>
                Any other details? (optional)
                </h6>
                <label className='mb-2 mt-2'>
                Type of Spot:
                </label>
                <input className='w-96 border-b border-black p-2 mb-14' type='address' placeholder='Choose your type of spot'/>

                <div className='flex justify-between'>
                    <Link href='/list-your-spot'>
                        <button className='blue_btn'>
                        Back
                        </button>
                    </Link>
                    <Link href='/list-your-spot/parking-spot-details/describe-parking-spot'>
                        <button className='blue_btn'>
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ParkingSpotDetails