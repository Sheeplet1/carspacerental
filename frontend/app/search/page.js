'use client'

import ListingsSideBar from "@components/ListingsSideBar"
import { GoogleMap } from '@react-google-maps/api';

const Search = () => {
  return (
    <div className="flex w-full h-full">
      <ListingsSideBar />
      <div className="flex-grow">
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: "81%",
              width: "100%"
            }}
            zoom={9}
            center={{
              lat: -3.745,
              lng: -38.523
            }}
          />
      </div>
    </div>
  )
}

export default Search