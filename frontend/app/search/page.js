'use client'

import ListingsSideBar from "@components/ListingsSideBar"
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const Search = () => {
  const [listings, setListings] = useState([{
    id: 1,
    title: 'Listing 1',
    address: {
      "formatted_address": "Sydney NSW, Australia",
      "streetNumber": "",
      "street": "",
      "city": "",
      "state": "NSW",
      "postcode": "",
      "country": "Australia",
      "lat": -33.8688197,
      "lng": 151.2092955,
      "place_id": "ChIJP3Sa8ziYEmsRUKgyFmh9AQM"
    },
    description: 'This is a description',
    price: 100,
    rating: 4.5,
    distance: 1.2,
    images: ['/assets/images/sport-car.png', '/assets/images/ornament.png', '/assets/images/search.png']
  }]);
  const [selectedListing, setSelectedListing] = useState(null);

  return (
    <div className="relative flex w-full mt-6" style={{ height: "79.8vh" }}>
      <ListingsSideBar listings={listings} setListings={setListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} />
      <div className="flex-grow">
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            height: "100%",
            width: "100%"
          }}
          zoom={10}
          center={{
            lat: -33.865143,
            lng: 151.209900
          }}
          options={{
            styles: [
              {
                "featureType": "poi",
                "stylers": [
                  { "visibility": "off" }
                ]
              },
              {
                "featureType": "transit",
                "stylers": [
                  { "visibility": "off" }
                ]
              },
            ]
          }}
        >
          {
            listings.map((listing, index) => (
              <Marker
                key={index}
                position={{ lat: listing.address.lat, lng: listing.address.lng }}
                onClick={() => setSelectedListing(listing)}
                icon={{
                  url: '/assets/images/marker.png',
                  scaledSize: new window.google.maps.Size(50, 50), // size of the icon
                  fillColor: '#f89c3c',
                }}
                label={{
                  text: `$${listing.price}/hr`,
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}
              />
            ))
          }
        </GoogleMap>
      </div>
    </div>
  )
}

export default Search
