'use client'

import ListingsSideBar from "@components/ListingsSideBar"
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Search = () => {
  return (
    <div className="flex w-full h-full">
      <ListingsSideBar />
      <div className="flex-grow">
        <LoadScript
          googleMapsApiKey="AIzaSyDLObtS4lYXqrA_Y_kF6VGxy-ogZFP5-lU"
        >
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: "81%",
              width: "100%"
            }}
            zoom={7}
            center={{
              lat: -3.745,
              lng: -38.523
            }}
          />
        </LoadScript>
      </div>
    </div>
  )
}

export default Search