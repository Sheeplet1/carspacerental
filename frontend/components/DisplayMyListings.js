import { FaCar, FaClock, FaMoneyBillWave, FaTrash } from "react-icons/fa";
import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import UserContext from "@contexts/UserContext";
import { useContext } from "react";
import { makeRequest, testListings } from "@utils/utils";
import PropTypes from "prop-types";

const DisplayMyListings = ({ nextStep }) => {
  const router = useRouter();
  const { updateUser } = useContext(UserContext);

  const user = {
    listings: testListings,
  };

  const handleDeleteListing = async (listing) => {
    const body = {
      listings: user.listings.filter(
        (v) => v.listing_id !== listing.listing_id
      ),
    };
    const response = await makeRequest("/user/profile", "PUT", body);
    if (response.error) {
      console.log(response.error);
    } else {
      updateUser();
    }
  };
  return (
    <div
      className="flex flex-col w-full justify-between ml-5 p-5 bg-white shadow-md rounded-lg overflow-auto"
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
        {user.listings.map((listing, index) => (
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
                  : `${listing.availability.start_time} - ${listing.availability.end_time}`}
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
              <Button className="bg-custom-orange">Edit</Button>
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
};
