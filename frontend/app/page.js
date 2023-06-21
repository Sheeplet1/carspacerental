import React from 'react'
import Selectbar from '@components/Selectbar'

const Home = () => {
return (
  <div className="flex flex-row h-screen">
    <Selectbar />
    <div className="flex flex-col mr-44 gap-16">
      <p className="logo_text">ACCONPANY YOUR</p>
      <p className="logo_text">JOURNEY WITH COMFORT</p>
      <label className="text-xs text-gray-400">Car rent services for various terrain with guaranteed qualitys</label>

      <div className="flex justify-start">
        <button className="blue_btn">
          Learn More
        </button>
      </div>
    </div>
  </div>
   )
 }

export default Home
