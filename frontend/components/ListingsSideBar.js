'use client'

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import SearchBar from '@components/SearchBar';
import TimePicker from '@components/TimePicker';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from "framer-motion"
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi"
import UserContext from "@contexts/UserContext";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const getNextHour = () => {
  const nextHour = new Date().getHours() + 1;
  return nextHour === 24 ? 0 : nextHour;
}

const getDate = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours === 23 ? new Date(date.setDate(date.getDate() + 1)) : date;
}

const calculateTotalPrice = (hourlyPrice, startDate, endDate, startTime, endTime) => {
  const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  let totalHours;
  if (endTime >= startTime) {
    totalHours = (endTime - startTime) + (diffInDays - 1) * 24;
  } else {
    totalHours = ((24 - startTime) + endTime) + (diffInDays - 2) * 24;
  }

  const totalPrice = totalHours * hourlyPrice;

  return totalPrice;
}

const ListingsSideBar = ({ listings, setListings, selectedListing, setSelectedListing }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const searchParams = useSearchParams();
  const [isBooking, setIsBooking] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [startTime, setStartTime] = useState(getNextHour());
  const [endTime, setEndTime] = useState(startTime + 1 > 23 ? 0 : startTime + 1);
  const [startDate, setStartDate] = useState(getDate());
  const [endDate, setEndDate] = useState(endTime < startTime ? new Date(new Date().setDate(new Date().getDate() + 1)) : new Date());
  const [minStartTime, setMinStartTime] = useState(getNextHour());
  const [minEndTime, setMinEndTime] = useState(minStartTime + 1 > 23 ? 0 : minStartTime + 1);
  const [sort, setSort] = useState('distance');
  const [imageIndex, setImageIndex] = useState(0);
  const [isCasual, setIsCasual] = useState(true);

  const calculateDistanceInKm = (lat1, lon1) => {
    const lat2 = addressData.coordinates.lat;
    const lon2 = addressData.coordinates.lng;
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };


  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(new Date(startDate));
    }

    if (startDate.getDate() != new Date().getDate()) {
      setMinStartTime(0);
    } else {
      setMinStartTime(getNextHour());
    }

    if (endDate.getDate() != new Date().getDate()) {
      setMinEndTime(0);
    } else {
      setMinEndTime(getNextHour() + 1 > 23 ? 0 : getNextHour() + 1);
    }

    if (startDate.getDate() == endDate.getDate() && startTime >= endTime) {
      setEndTime(startTime + 1);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startTime >= endTime && startDate.getDate() == endDate.getDate()) {
      if (startTime + 1 > 23) {
        setEndTime(0);
        setMinEndTime(0);
        setEndDate(new Date(endDate.setDate(endDate.getDate() + 1)));
      } else {
        setEndTime(startTime + 1);
        setMinEndTime(startTime + 1);
      }
    }

  }, [startTime, endTime]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await makeRequest('/listings', 'GET');
  //     if (response.error) {
  //       console.log(response.error);
  //     } else {
  //       setListings(response.listings);
  //     }
  //   }

  //   fetchData();
  // }, [addressData, startDate, endDate, startTime, endTime]);

  const searchClick = (data) => {
    if (data) {
      setAddressData(data);
    }
  };

  const clickBook = () => {
    if (user) {
      setIsBooking(true);
    } else {
      router.push('/login');
    }
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col pr-2">
        <div className="flex justify-start space-x-4 mb-4 pr-4">
          <button
            className={`font-black text-xl mb-1 hover:text-custom-orange ${isCasual ? "text-custom-orange underline" : ""}`}
            onClick={() => setIsCasual(true)}>
            Casual
          </button>
          <button
            className={`font-black text-xl mb-1 hover:text-custom-orange ${!isCasual ? "text-custom-orange underline" : ""}`}
            onClick={() => setIsCasual(false)}>
            Monthly
          </button>
        </div>
        <div className="mb-4">
          <h2 className='font-bold text-sm text-gray-500 mb-1'>Find Parking Near</h2>
          <SearchBar
            placeholder="Search Address"
            onSearch={searchClick}
            className="border w-full text-base placeholder-black"
            showSearchButton={false}
            initialValue={searchParams.get('address')}
          />
        </div>
        <div className="flex justify-between space-x-4 mb-4 pr-4">
          <div className="w-1/2">
            <h3 className='font-bold text-sm text-gray-500 mb-1'>Start</h3>
            <input type="date" id="start" name="trip-start"
              value={formatDate(startDate)}
              min={formatDate(new Date())}
              max={formatDate(sixMonthsFromNow)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="border w-full text-base placeholder-black"
            />
          </div>
          <div className="w-1/2">
            <h3 className='font-bold text-sm text-gray-500 mb-1'>End</h3>
            <input type="date" id="end" name="trip-end"
              value={formatDate(endDate)}
              min={formatDate(startDate)}
              max={formatDate(sixMonthsFromNow)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="border w-full text-base placeholder-black"
            />
          </div>
        </div>
        <div className="flex justify-between space-x-4 mb-4 pr-4">
          <div className="w-1/2">
            <TimePicker
              minTime={minStartTime}
              maxTime={24}
              value={startTime}
              onChange={setStartTime}
            />
          </div>
          <div className="w-1/2">
            <TimePicker
              minTime={minEndTime}
              maxTime={24}
              value={endTime}
              onChange={setEndTime}
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className='font-bold text-sm text-gray-500 mb-2'>Sort By</h3>
          <select
            className="border p-2 w-full"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="distance">Sort By Distance</option>
            <option value="price">Sort By Price</option>
          </select>
        </div>

        <hr className="border-t-2 border-gray-300" />

        <div className="mt-4 w-full h-80 overflow-y-auto">
          {listings.length === 0 ? (
            <div className="border border-red-500 text-red-700 bg-red-100 rounded p-2 mb-2">
              <p className='font-bold text-sm mb-2'>No available spaces found.</p>
              <p className='font-bold text-sm mb-2'>Try changing your search location or search date.</p>
            </div>
          ) : (
            listings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => setSelectedListing(listing)}
                className="flex flex-col border border-gray-300 p-4 mb-4 cursor-pointer rounded shadow-md"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex justify-between item-center w-1/4">
                    <Image
                      src={listing.images[0]}
                      alt="Listing Image"
                      width={80}
                      height={80}
                      className="rounded"

                    />
                  </div>
                  <div className="flex flex-col justify-between w-3/4 ml-4">
                    <div className="flex flex-col h-1/2">
                      <h3 className="font-bold text-sm text-gray-700">{listing.address.address}</h3>
                      <p className="text-xs text-gray-500">${listing.price}/hr</p>
                    </div>
                    <div className="flex flex-col h-1/2 pt-3">
                      <p className="text-xs text-gray-500">{listing.distance} miles away</p>
                      <div className="flex flex-row justify-between">
                        <p className="text-xs text-gray-700">Fits a Van</p>
                        <p className="text-xl font-bold text-gray-800 ml-2 mb-4">${calculateTotalPrice(listing.price, startDate, endDate, startTime, endTime)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedListing && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 30, damping: 10 }}
          className="absolute w-1/3 h-full bg-background rounded z-10 left-95 shadow-2xl drop-shadow-2xl"
        >
          <button
            className="left rounded-full p-2 absolute right-4"
            onClick={() => {
              setSelectedListing(null);
              setIsBooking(false);
            }}
          >
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
            />
          </button>
          {
            !isBooking ? (
              <div className="flex flex-col item-center h-full justify-between overflow-auto">
                <div className="flex items-center w-full h-3/5">
                  <button
                    onClick={() => setImageIndex((imageIndex - 1 + selectedListing.images.length) % selectedListing.images.length)}
                    className="absolute left-0 top-50 z-10 bg-gray-200 p-2 rounded-full"
                  >
                    <BiSolidLeftArrow />
                  </button>
                  <Image
                    src={selectedListing.images[imageIndex]}
                    alt="Listing Image"
                    className="rounded"
                    width={500}
                    height={500}
                  />
                  <button
                    onClick={() => setImageIndex((imageIndex + 1) % selectedListing.images.length)}
                    className="absolute right-0 top-50 z-10 bg-gray-200 p-2 rounded-full"
                  >
                    <BiSolidRightArrow />
                  </button>
                </div>
                <div className='p-4 h-full pb-16'>
                  <p className='text-3xl text-gray-500 mb-2'>{selectedListing.address.address}</p>
                  <p className='text-lg font-bold mb-2 text-custom-orange'>DESCRIPTION</p>
                  <p className='text-gray-500 mb-2'>{selectedListing.description}</p>
                  <p className='text-lg font-bold mb-2 text-custom-orange'>MAXIMUM VEHICLE SIZE</p>
                  <p className='text-gray-500 mb-2'>Sedan</p>
                  <p className='text-lg font-bold mb-2 text-custom-orange'>ACCESS METHOD</p>
                  <p className='text-gray-500 mb-2'>Key</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex flex-row justify-between items-center p-4 bg-white">
                  <div className="font-bold text-2xl text-gray-500">${selectedListing.price}/hr</div>
                  <div>
                    <button className="bg-custom-orange w-60 text-white rounded-full p-2" onClick={clickBook}>
                      Book for ${calculateTotalPrice(selectedListing.price, startDate, endDate, startTime, endTime)}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full p-4 overflow-auto">
                <div className="font-bold text-3xl text-gray-500 mb-4">{selectedListing.address.address}</div>
                <div className="flex flex-row justify-between items-center mb-4">
                  <div>Starting Date</div>
                  <div>{startDate.toLocaleDateString()}</div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex flex-row justify-between items-center mb-4">
                  <div>Ending Date</div>
                  <div>{endDate.toLocaleDateString()}</div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="w-full mb-4 bg-gray-300 p-4">
                  Total Payment
                </div>
                <div className="flex flex-row justify-between items-center mb-4">
                  <div>Booking Price</div>
                  <div>${calculateTotalPrice(selectedListing.price, startDate, endDate, startTime, endTime)}</div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex flex-row justify-between items-center mb-4">
                  <div>Promo Code</div>
                  <div className="flex flex-row items-center">
                    <input type="text" className="border border-gray-300 rounded p-2 mr-2" />
                    <button className="bg-custom-orange text-white rounded p-2">Apply</button>
                  </div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex flex-row justify-between items-center mb-4">
                  <div>Transaction fee</div>
                  <div>$0.00</div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex flex-row justify-between items-center mb-4 w-full p-4 bg-gray-200">
                  <div>Total Payment Due Today</div>
                  <div>${calculateTotalPrice(selectedListing.price, startDate, endDate, startTime, endTime)}</div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex flex-row justify-between items-center mb-4">
                  <div>Payment Method</div>
                  <button className="bg-custom-orange text-white rounded p-2">Add Payment Method</button>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex flex-row justify-between items-center p-4 bg-white">
                  <div className="font-bold text-2xl text-gray-500">${selectedListing.price}/hr</div>
                  <div>
                    <button className="bg-custom-orange w-60 text-white rounded-full p-2" onClick={() => setIsBooking(false)}>
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </motion.div>
      )}
    </div >
  );
};

export default ListingsSideBar;