import { Tooltip, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi"
import { calculateTotalPrice, makeRequest } from '@utils/utils';
import UserContext from "@contexts/UserContext";
import SearchContext from '@contexts/SearchContext';
import { useRouter } from 'next/navigation';

const ListingDetail = () => {
  const { user } = useContext(UserContext);
  const { selectedListing, startDate, endDate, startTime, endTime, setIsBooking, isCasual } = useContext(SearchContext);
  const [listingUser, setListingUser] = useState({
    "_id": "6496e8e2876de3535cf3aa02",
    "bookings": [],
    "email": "example@gmail.com",
    "first_name": "John",
    "last_name": "Doe",
    "image": "/assets/icons/profile.svg",
    "listings": [],
    "phone_number": [
      "0412345678"
    ],
    "reviews": [],
    "revenue": 0
  });

  // useEffect(() => {
  //   const fetchListingUser = async () => {
  //     const response = await makeRequest(`/users/${selectedListing.user_id}`, 'GET');
  //     if (response.error) {
  //       console.log(response.error);
  //     } else {
  //       setListingUser(response.data);
  //     }
  //   }

  //   fetchListingUser();
  // }, [selectedListing]);

  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();


  return (
    <div className="flex flex-col item-center h-full justify-between overflow-auto">
      <div className="relative flex items-center w-full h-3/5">
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className='text-3xl text-gray-500'>{selectedListing.type} on {selectedListing.address.street}</h1>
          </div>
        </div>
        <div className="rounded-lg">
          <h2 className='text-lg font-bold mb-2 text-custom-orange'>Details</h2>
          <div className="flex items-center space-x-2 mb-2">
            {selectedListing.description}
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <AccessTimeIcon />
            <p className='text-gray-500'>Maximum Vehicle Size: {selectedListing.max_vehicle_size}</p>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <VpnKeyIcon />
            <p className='text-gray-500'>Access Method: {selectedListing.access_type}</p>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <LocalParkingIcon />
            <p className='text-gray-500'>Parking Type: {selectedListing.type}</p>
          </div>
        </div>
        <div className="my-4">
          <h2 className='text-lg font-bold mb-2 text-custom-orange'>Safety Features</h2>
          <div className="flex flex-wrap">
            {selectedListing.safety_features.map((feature, index) => (
              <Chip key={index} label={feature} variant="outlined" className="m-1" />
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-lg font-bold mb-2 text-custom-orange'>Amenities</h2>
          <div className="flex flex-wrap">
            {selectedListing.amenities.map((amenity, index) => (
              <Tooltip key={index} title={amenity} placement="top">
                <Chip label={amenity} variant="outlined" className="m-1" />
              </Tooltip>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-wrap">
            {listingUser &&
              <div className="flex items-center space-x-6 my-4">
                <Image
                  src={listingUser.image}
                  alt="Listing Image"
                  className="rounded-full"
                  width={70}
                  height={70}
                />
                <h2 className='text-2xl font-bold'>{listingUser.first_name}</h2>
              </div>
            }
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-row justify-between items-center p-4 bg-white">
        <div className="font-bold text-2xl text-gray-500">
          ${isCasual ? `${selectedListing.pricing.hourly_rate}/hr` : `${selectedListing.pricing.monthly_rate}/mth`}
        </div>
        <div>
          <button className="bg-custom-orange w-60 text-white rounded-full p-2" onClick={() => user ? setIsBooking(true) : router.push('/login')}>
            Book for ${isCasual ? calculateTotalPrice(selectedListing.pricing.hourly_rate, startDate, endDate, startTime, endTime) : selectedListing.pricing.monthly_rate}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail