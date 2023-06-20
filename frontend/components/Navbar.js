"use client"

import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {

  return (
    <header className='w-full mb-16 pt-3'>
      <nav>
        <div className='border-b border-gray-300 pb-2'>
          <div className='flex justify-between'>
            <div className='flex gap-8'>
              <div className='flex gap-1 items-center'>
                <Image
                  src='/assets/icons/Call.svg'
                  alt='call'
                  width={20}
                  height={20}
                  className='object-contain outline border-orange-400'
                />
                <p className='text-xs'>+61 234 567 890</p>
              </div>
              <div className='flex gap-2 items-center'>
                <Image
                  src='/assets/icons/Email.svg'
                  alt='email'
                  width={20}
                  height={20}
                  className='object-contain outline border-orange-400'
                />
                <p className='text-xs'>support@homie.com</p>
              </div>
            </div>
            <div className='flex gap-8'>
              <Link href='/about'>
                <p className='cursor-pointer hover:underline hover:text-orange-500'>About</p>
              </Link>
              <Link href='/list-your-spot'>
                <p className='cursor-pointer hover:underline hover:text-orange-500'>List Your Spot</p>
              </Link>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <Link href='/'>
            <div className='flex gap-2 flex-center cursor-pointer'>
              <Image
                src='/assets/icons/Logo.svg'
                alt='logo'
                width={30}
                height={30}
                className='object-contain'
              />
              <p className='logo_text'>SFCars</p>
            </div>
          </Link>
          <div className='flex gap-4'>
            <Link href='/login'>
              <button className='orange_btn'>
                Login
              </button>
            </Link>
            <Link href='/register'>
              <button className='orange_btn'>
                Register
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
