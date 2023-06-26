"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { makeRequest } from "@utils/makeRequest";
import { useRouter } from "next/navigation";

export const Navbar = () => {

  const [user, setUser] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await makeRequest('/user/profile', 'GET');

        if (response.error) {
          console.log(response.error);
        } else {
          setUser(response);
        }
      }
    }
    fetchUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  }

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
                  className='object-contain'
                />
                <p className='text-xs'>+61 234 567 890</p>
              </div>
              <div className='flex gap-2 items-center'>
                <Image
                  src='/assets/icons/Email.svg'
                  alt='email'
                  width={20}
                  height={20}
                  className='object-contain'
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
          {
            user ? (
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 gap-x-2"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setToggleDropdown(!toggleDropdown)}
                  >
                    {user.first_name} {user.last_name}
                    <Image
                      src='/assets/icons/profile.svg'
                      width={20}
                      height={20}
                      alt='profile'
                      className='object-contain'
                    />
                  </button>
                </div>

                {toggleDropdown && (
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                      <Link href='/profile'>
                        <p
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Profile
                        </p>
                      </Link>
                      <Link href='/inbox'>
                        <p
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Inbox
                        </p>
                      </Link>
                      <Link href='/'>
                        <p
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Find a Spot
                        </p>
                      </Link>
                      <Link href='/manage-bookings'>
                        <p
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Manage Bookings
                        </p>
                      </Link>
                      <Link href='/manage-listings'>
                        <p
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Manage Listings
                        </p>
                      </Link>
                      <Link href='/wallet'>
                        <p
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Wallet
                        </p>
                      </Link>
                      <Link href='/help'>
                        <p
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                          onClick={() => setToggleDropdown(false)}
                        >
                          Help
                        </p>
                      </Link>
                      <button
                        type="button"
                        className="text-gray-700 block w-full px-4 py-2 text-sm cursor-pointer"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-3"
                        onClick={() => {
                          setToggleDropdown(false);
                          logOut();
                        }}
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
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
            )
          }
        </div >
      </nav >
    </header >
  )
}