'use client'

import { useState, useCallback, useRef } from 'react';
import { Autocomplete, GoogleMap, LoadScript } from '@react-google-maps/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const libraries = ["places"];

function SearchBar() {
  const [autocomplete, setAutocomplete] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const autocompleteRef = useRef(null);

  const router = useRouter();

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
          className="border border-transparent w-full h-12 px-3 rounded-full shadow-md text-base outline-none overflow-ellipsis overflow-hidden whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 placeholder-black-400"
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
  );
}

export default SearchBar;
