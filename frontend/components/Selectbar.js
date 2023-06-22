import React from 'react'
import Link from "next/link";
import Image from "next/image";

export const Searchbar = () => {
    return (
      <div className="absolute bottom-48 left-96 ml-144 transform -translate-y-1/2 w-144 h-24 bg-white p-4 rounded-3xl shadow-md">
        <div className='flex justify-between'>
            <div className='flex gap-8'>
                <ul className="flex flex-col gap-4">
                    <p className='text-xs text-gray-300'>Location</p>
                    <div className='flex gap-1 items-center'>
                        <Image
                        src='/assets/icons/Vector.svg'
                        alt='vector'
                        width={20}
                        height={20}
                        className='object-contain outline border-orange-400'
                        />
                        <Link href='/choose your location'>
                            <p className='text-xs cursor-pointer hover:underline hover:text-orange-500'>choose your location</p>
                        </Link>
                    </div>
                </ul>
                <ul className="flex flex-col gap-4">
                    <p className='text-xs text-gray-300'>Car Type</p>
                    <div className='flex gap-1 items-center'>
                        <Image
                            src='/assets/icons/Car.svg'
                            alt='car'
                            width={20}
                            height={20}
                            className='object-contain outline border-orange-400'
                        />
                        <Link href='/city car'>
                            <p className='text-xs cursor-pointer hover:underline hover:text-orange-500'>city car</p>
                        </Link>
                    </div>
                </ul>
                <ul className="flex flex-col gap-4">
                    <p className='text-xs text-gray-300'>Pick up</p>
                    <div className='flex gap-1 items-center'>
                        <Image
                            src='/assets/icons/Calendar.svg'
                            alt='calander'
                            width={20}
                            height={20}
                            className='object-contain outline border-orange-400'
                        />
                        <Link href='/17 July 2021'>
                            <p className='text-xs cursor-pointer hover:underline hover:text-orange-500'>17 July 2021</p>
                        </Link>
                    </div>
                </ul>
                <ul className="flex flex-col gap-4">
                    <p className='text-xs text-gray-300'>Return</p>
                    <div className='flex gap-1 items-center'>
                        <Image
                            src='/assets/icons/Calendar.svg'
                            alt='calendar'
                            width={20}
                            height={20}
                            className='object-contain outline border-orange-400'
                        />
                        <Link href='/17 July 2021'>
                            <p className='text-xs cursor-pointer hover:underline hover:text-orange-500'>17 July 2021</p>
                        </Link>
                    </div>
                </ul>
                <div className='flex justify-between'>
                    <button className='blue_btn'>
                        Search
                    </button>
                </div>
            </div>
            
          </div>
      </div>
    )
  }

export default Searchbar