import { FaCar, FaClock, FaMoneyBillWave, FaTrash } from "react-icons/fa";
import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useUser } from "@contexts/UserProvider";
import PropTypes from "prop-types";
import { makeRequest } from "@utils/utils";
import { useEffect, useState } from "react";

const DisplayMyListings = ({ nextStep, handleEditListing }) => {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [listings, setListings] = useState([]);

  const formatTime = (time) => {
    if (time === 0) return "12:00 AM";
    if (time === 12) return "12:00 PM";
    return time < 12 ? `${time}:00 AM` : `${time - 12}:00 PM`;
  };

  const handleDeleteListing = async (listing) => {
    const body = {
      listings: user.listings.filter(
        (v) => v.listing_id !== listing.listing_id
      ),
    };
    updateUser(body);
  };

  useEffect(() => {
    const fetchListings = async () => {
      const listingsData = [];
      for (const listing of user.listings) {
        const response = await makeRequest(`/listings/${listing}`, "GET");
        if (response.error) {
          console.log(response.error);
        } else {
          listingsData.push(response);
        }
      }
      setListings(listingsData);
    };
    fetchListings();
  }, [user.listings]);

  return (
    <div
      className="flex flex-col w-full h-full justify-between ml-5 p-5 bg-white shadow-md rounded-lg overflow-auto"
      style={{ maxHeight: "600px" }}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between w-full mb-5">
          <h1 className="heading_text text-3xl text-gray-700">My Carspaces</h1>
          <div className="flex flex-row gap-4 ">
            <Button
              className="bg-custom-orange"
              onClick={() => router.push("/profile")}
            >
              Back to Profile
            </Button>
            <Button className="bg-custom-orange" onClick={nextStep}>
              Add New Carspace
            </Button>
          </div>
        </div>
        {listings.map((listing, index) => (
          <Card
            key={index}
            className="max-w-full mb-5 p-4 shadow-lg rounded-lg flex flex-col justify-between"
          >
            <div>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                <FaCar className="inline-block mr-2" />
                {listing.listing_type} - {listing.address.formatted_address}
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-200 mb-2">
                {listing.description}
              </p>
            </div>

            <div className="flex flex-row justify-between text-sm text-gray-600 dark:text-gray-200 mb-2">
              <p>Max vehicle size: {listing.max_vehicle_size}</p>
              <p>
                <FaClock className="inline-block mr-2" />
                {listing.availability.is_24_7
                  ? "24/7"
                  : `${formatTime(
                      listing.availability.start_time
                    )} - ${formatTime(listing.availability.end_time)}`}
              </p>
            </div>

            <div className="flex flex-row justify-between text-sm text-gray-600 dark:text-gray-200 mb-2">
              {listing.casual_booking && (
                <p>
                  <FaMoneyBillWave className="inline-block mr-2" /> Hourly rate:
                  ${listing.pricing.hourly_rate}
                </p>
              )}
              {listing.monthly_booking && (
                <p>
                  <FaMoneyBillWave className="inline-block mr-2" /> Monthly
                  rate: ${listing.pricing.monthly_rate}
                </p>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                className="bg-custom-orange"
                onClick={() => handleDeleteListing(listing)}
              >
                <FaTrash className="inline-block mr-2" />
                Delete
              </Button>
              <Button
                className="bg-custom-orange"
                onClick={() => handleEditListing(listing)}
              >
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DisplayMyListings;

DisplayMyListings.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleEditListing: PropTypes.func.isRequired,
};