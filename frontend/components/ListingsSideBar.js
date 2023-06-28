'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import { makeRequest } from '@utils/makeRequest';
import SearchBar from '@components/SearchBar';

const ListingsSideBar = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sort, setSort] = useState('distance');
  const [listings, setListings] = useState([]);
  const now = new Date().toISOString().substring(0, 16);

  useEffect(() => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const now = (new Date(Date.now() - tzoffset));
    const now1 = (new Date(Date.now() - tzoffset));

    const startDate = new Date(now.setHours(now.getHours() + 1));
    const endDate = new Date(now1.setHours(now1.getHours() + 2));

    const formatDateTime = (date) => date.toISOString().substring(0, 16);

    setDateRange({
      start: formatDateTime(startDate),
      end: formatDateTime(endDate),
    });

  }, []);

  const calculateDistanceInKm = (lat1, lon1) => {
    const lat2 = addressData.coordinates.lat;
    const lon2 = addressData.coordinates.lng;
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
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
    const fetchData = async () => {
      const response = await makeRequest('/listings', 'GET');

      if (response.error) {
        console.log(response.error);
      } else {
        setListings(response.listings);
      }
    }

    fetchData();
  }, [addressData, dateRange, sort]);

  const searchClick = (data) => {
    if (data) {
      setAddressData(data);
    }
  };

  return (
    <div className="flex flex-row w-4/5 h-full">

      <div className="flex flex-col w-1/2 pr-2 overflow-y-auto h-screen">
        <div className="mb-4">
          <h2 className='font-bold text-sm text-gray-500 mb-1'>Find Parking Near</h2>
          <SearchBar
            placeholder="Search Address"
            onSearch={searchClick}
            className="border w-full h-10 px-2 text-base outline-none overflow-ellipsis overflow-hidden whitespace-nowrap placeholder-black-400"
            showSearchButton={false}
          />
        </div>
        <div className="flex justify-between space-x-4 mb-4 pr-4">
          <div className="w-1/2">
            <h3 className='font-bold text-sm text-gray-500 mb-1'>Start</h3>
            <input
              type="datetime-local"
              min={now}
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
          <div className="w-1/2">
            <h3 className='font-bold text-sm text-gray-500 mb-1'>End</h3>
            <input
              type="datetime-local"
              value={dateRange.end}
              min={dateRange.start || now}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className='font-bold text-sm text-gray-500 mb-2'>Sort By</h3>
          <select
            className="border rounded p-2 w-full"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="distance">Sort By Distance</option>
            <option value="price">Sort By Price</option>
          </select>
        </div>

        <hr className="border-t-2 border-gray-300" />

        <div className="mt-4 w-full">
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
                  <div className="w-1/4">
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
                      <p className="text-xs text-gray-500">${listing.price}/day</p>
                    </div>
                    <div className="flex flex-col h-1/2 pt-3">
                      <p className="text-xs text-gray-500">{calculateDistanceInKm(listing.address.coordinates.lat, listing.address.coordinates.lng).toFixed(2)} kms</p>
                      <div className="flex flex-row justify-between">
                        <p className="text-xs text-gray-700">Fits a Van</p>
                        <p className="text-xl font-bold text-gray-800 ml-2">${listing.price}</p>
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
        <CSSTransition
          in={selectedListing !== null}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <div className="mt-4 w-1/2 pl-2 bg-gray-200 p-4 rounded">
            <button
              className="right-4 top-4 rounded-full p-2"
              onClick={() => setSelectedListing(null)}
            >
              <Image
                src="/assets/icons/close.svg" // your close icon image path
                alt="close"
                width={20}
                height={20}
              />
            </button>

            <h2>{selectedListing.title}</h2>
            <p>{selectedListing.description}</p>
          </div>
        </CSSTransition>
      )}
    </div >
  );
};

export default ListingsSideBar;