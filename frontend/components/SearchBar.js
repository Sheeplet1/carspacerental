'use client'

import { useState, useCallback, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import Image from 'next/image';

function SearchBar({ placeholder, onSearch, className, showSearchButton }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const autocompleteRef = useRef(null);

  const onLoad = useCallback((autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const getPlaceData = () => {
    if (autocomplete !== null) {
      return autocomplete.getPlace();
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onPlaceChanged = () => {
    if (!showSearchButton) {
      const place = getPlaceData();
      if (place && onSearch) {
        onSearch({
          address: place.formatted_address,
          place_id: place.place_id,
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        });
      }
    }
  };

  const searchClick = () => {
    if (showSearchButton) {
      const place = getPlaceData();
      if (place && onSearch) {
        onSearch({
          address: place.formatted_address,
          place_id: place.place_id,
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        });
      }
    }
  };

  return (
    <div className="relative">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          ref={autocompleteRef}
          type="text"
          placeholder={placeholder}
          className={className}
        />
      </Autocomplete>
      {showSearchButton &&
        <button
          type="submit"
          className="absolute inset-y-0 -right-3 top-6 transform -translate-y-1/2 -translate-x-1/2 rounded-full bg-custom-orange w-10 h-10 flex items-center justify-center"
          onClick={searchClick}
        >
          <Image
            src="/assets/images/search.png"
            alt="search"
            width={20}
            height={20}
          />
        </button>
      }
    </div>
  );
}

export default SearchBar;
