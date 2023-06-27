import React from 'react';
import Image from 'next/image';
import SearchBar from '@components/SearchBar';

const Home = () => {
  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <div className="flex justify-around items-center w-full" style={{height: '40vh'}}>
        <div className="flex flex-col items-start gap-4 mr-44 w-full">
          <p className="landing_page_text">ACCOMPANY YOUR</p>
          <p className="landing_page_text">JOURNEY WITH COMFORT</p>
          <label className="text-xs text-gray-400">Car rent services for various terrain with guaranteed quality</label>
          <div className="w-full mt-4 relative">
            <SearchBar />
          </div>
        </div>

        <div className="flex flex-col image-container">
          <Image
            src='/assets/images/sport-car.png'
            alt='sport-car'
            width={500}
            height={500}
            className="object-contain ml-24 mb-16"
          />
        </div>

        <div className="flex flex-col mr-24">
          <Image
            src='/assets/images/ornament.png'
            alt='ornament'
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  )
}

export default Home;
