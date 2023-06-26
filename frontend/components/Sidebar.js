import React from 'react';
import Link from "next/link";

export const Sidebar = () => {
    return (
      <div className="absolute top-80 left-0 ml-12 transform -translate-y-1/2 w-64 h-80 bg-white p-4 rounded-3xl shadow-md">
        <ul className="flex flex-col gap-4">
          <li>
            <Link href='/login'>
              <p className='block py-1 text-gray-800 hover:underline'>Login</p>
            </Link>
          </li>
          <li>
            <Link href='/register'>
              <p className='block py-1 text-gray-800 hover:underline'>Sign Up</p>
            </Link>
          </li>
          <li>
            <Link href='/help'>
              <p className='block py-1 text-gray-800 hover:underline'>Help</p>
            </Link>
          </li>
        </ul>
      </div>
    )
  }

export default Sidebar