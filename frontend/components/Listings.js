import { calculateTotalPrice, calculateDistanceInKm } from "@utils/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import SearchContext from "@contexts/SearchContext";

const Listings = () => {
  const { listings, setSelectedListing, startDate, endDate, startTime, endTime, isCasual, addressData } = useContext(SearchContext);
  const searchParams = useSearchParams();

  return (
    <div className="mt-4 w-full h-80 overflow-y-auto">
      {listings.length === 0 ? (
        <div className="border border-red-500 text-red-700 bg-red-100 rounded p-2 mb-2">
          <p className='font-bold text-sm mb-2'>No available spaces found.</p>
          <p className='font-bold text-sm mb-2'>Try changing your search location or search date.</p>
        </div>
      ) : (
        listings.map((listing, index) => (
          <div
            key={index}
            onClick={() => setSelectedListing(listing)}
            className="flex flex-col border border-gray-300 p-4 mb-4 cursor-pointer rounded shadow-md"
          >
            <div className="flex flex-row justify-between">
              <div className="flex justify-between item-center w-1/4">
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
                  <h3 className="font-bold text-sm text-gray-700">{listing.address.street}, {listing.address.city}</h3>
                  <p className="text-xs text-gray-500">{isCasual && `$${listing.pricing.hourly_rate}/hr`}</p>
                </div>
                <div className="flex flex-col h-1/2 pt-3">
                  <p className="text-xs text-gray-500">{addressData ? calculateDistanceInKm(addressData.lat, addressData.lng, listing.address.lat, listing.address.lng) : calculateDistanceInKm(searchParams.get('lat'), searchParams.get('lng'), listing.address.lat, listing.address.lng)} kms</p>
                  <div className="flex flex-row justify-between">
                    <p className="text-xs text-gray-700">Fits a {listing.max_vehicle_size}</p>
                    <p className="text-xl font-bold text-gray-800 ml-2 mb-4">
                      {isCasual
                        ? `$${calculateTotalPrice(listing.pricing.hourly_rate, startDate, endDate, startTime, endTime)}`
                        : `$${listing.pricing.monthly_rate}/mth`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Listings