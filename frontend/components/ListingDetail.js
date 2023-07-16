import { useState, useContext } from 'react';
import Image from 'next/image';
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi"
import { calculateTotalPrice } from '@utils/utils';
import UserContext from "@contexts/UserContext";
import { useRouter } from 'next/navigation';

const ListingDetail = ({ selectedListing, startDate, endDate, startTime, endTime, setIsBooking, isCasual }) => {
  const { user } = useContext(UserContext);
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();

  return (
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