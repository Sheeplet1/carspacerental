'use client'

import { useState, useCallback, useRef, useEffect } from 'react';
import { Autocomplete, GoogleMap, LoadScript } from '@react-google-maps/api';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import { makeRequest } from '@utils/makeRequest';

const libraries = ["places"];

const ListingsSideBar = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [listings, setListings] = useState([]);
  const now = new Date().toISOString().substring(0, 16); // Get current time in proper format
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await makeRequest('/listings', 'GET');

      if (response.error) {
        console.log(response.error);
      } else {
        setListings(response.listings);
      }
    }

    // Call the fetch function
    fetchData();
  }, [addressData, dateRange]); // Run this useEffect when addressData or dateRange changes

  const onLoad = useCallback((autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setAddressData({
        address: place.formatted_address,
        place_id: place.place_id,
        coordinates: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const searchClick = () => {
    if (addressData) {
      router.push('/search');
    }
  };

  return (
    <div className="flex flex-row w-2/3 h-full">

      <div className="flex flex-col w-1/2 pr-2 overflow-y-auto h-screen">
        <div className="mb-4">
          <h2 className='font-bold text-sm text-gray-500 mb-1'>Find Parking Near</h2>
          <LoadScript
            googleMapsApiKey="AIzaSyDLObtS4lYXqrA_Y_kF6VGxy-ogZFP5-lU"
            libraries={libraries}
          >
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                ref={autocompleteRef}
                type="text"
                placeholder="Search Address"
                className="border w-full h-10 px-2 text-base outline-none overflow-ellipsis overflow-hidden whitespace-nowrap placeholder-black-400"
              />
            </Autocomplete>
            <button
              type="submit"
              className="absolute -right-4 top-6 transform -translate-y-1/2 -translate-x-1/2 rounded-full bg-custom-orange w-10 h-10 flex items-center justify-center"
              onClick={searchClick}
            >
              <Image
                src="/assets/images/search.png"
                alt="search"
                width={20}
                height={20}
              />
            </button>
          </LoadScript>
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

        {/* Dropdown input */}
        <div className="mb-4">
          <h3 className='font-bold text-sm text-gray-500 mb-2'>Sort By</h3>
          <select
            className="border rounded p-2 w-full"
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="distance">Sort By Distance</option>
            <option value="price">Sort By Price</option>
          </select>
        </div>

        <hr className="border-t-2 border-gray-300" />
        {/* Listings */}
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
                className="border rounded p-2 mb-2 cursor-pointer"
              >
                {listing.title}
              </div>
            ))
          )}
        </div>

      </div>

      <CSSTransition
        in={selectedListing !== null}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        {selectedListing && (
          <div className="mt-4 w-1/2 pl-2 bg-gray-200 p-4 rounded">
            <h2>{selectedListing.title}</h2>
            <p>{selectedListing.description}</p>
          </div>
        )}
      </CSSTransition>
    </div >
  );
};

export default ListingsSideBar;