'use client'

import ListingsSideBar from "@components/ListingsSideBar"
import { useState } from 'react';
import GoogleMaps from '@components/GoogleMaps';

const Search = () => {
  const [isCasual, setIsCasual] = useState(true);
  const [addressData, setAddressData] = useState(null);
  const [listings, setListings] = useState([
    {
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
      type: 'Carport',
      max_vehicle_size: 'Bike',
      access_type: 'Key',
      ev_charging: true,
      description: 'This is a description',
      instructions: 'This is the instructions',
      casual_booking: true,
      monthly_booking: true,
      pricing: {
        "hourly_rate": 100,
        "monthly_rate": 1000,
      },
      images: ['/assets/images/sport-car.png', '/assets/images/ornament.png', '/assets/images/marker.png'],
      "availability": {
        "is_24_7": true,
        "start_time": "08:00",
        "end_time": "17:00",
        "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      "safety_features": ["CCTV", "On-site security", "Well lit"],
      "amenities": ["Restrooms", "Nearby shopping", "Charging station"],
    }
  ]);
  const [selectedListing, setSelectedListing] = useState(null);

  return (
    <div className="relative flex w-full mt-6" style={{ height: "79.8vh" }}>
      <ListingsSideBar listings={listings} setListings={setListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} addressData={addressData} setAddressData={setAddressData} isCasual={isCasual} setIsCasual={setIsCasual} />
      <GoogleMaps listings={listings} setSelectedListing={setSelectedListing} addressData={addressData} isCasual={isCasual} />
    </div>
  )
}

export default Search