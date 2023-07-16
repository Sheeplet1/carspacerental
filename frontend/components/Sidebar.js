import React from 'react';
import Link from "next/link";

export const Sidebar = () => {
    return (
      <div className="w-64 h-96 bg-white p-6 rounded-3xl shadow-md">
        <ul className="flex flex-col gap-4">
          <li>
            <Link href='/login'>
              <p className='block py-1 text-gray-800 hover:underline text-2xl'>Login</p>
            </Link>
          </li>
          <li>
            <Link href='/register'>
              <p className='block py-1 text-gray-800 hover:underline text-2xl'>Sign Up</p>
            </Link>
          </li>
          <li>
            <Link href='/help'>
              <p className='block py-1 text-gray-800 hover:underline text-2xl'>Help</p>
            </Link>
          </li>
        </ul>
      </div>
    )
  }

export default Sidebar