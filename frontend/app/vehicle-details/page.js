"use client";

import { useState, useContext } from "react";
import UserContext from "@contexts/UserContext";
import LoginSideBar from "@components/LoginSideBar";
import VehicleDetailsModal from "@components/VehicleDetailsModal";
import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { makeRequest } from "@utils/utils";

const VehicleDetails = () => {
  const router = useRouter();
  const { user, updateUser } = useContext(UserContext);
  const [showVehicleDetailsModal, setShowVehicleDetailsModal] = useState(false);

  const handleDeleteVehicle = async (vehicle) => {
    const body = {
      vehicle_details: user.vehicle_details.filter(
        (v) => v.registration_number !== vehicle.registration_number
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
    <div className="flex flex-row w-full mt-12 bg-gray-100">
      <div className="rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div
        className="flex flex-col w-2/3 justify-between ml-5 p-5 bg-white shadow-md rounded-lg overflow-auto"
        style={{ maxHeight: "600px" }}
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="heading_text text-3xl text-gray-700">My Vehicles</h1>
            <div className="flex flex-row gap-4 ">
              <Button
                className="bg-custom-orange"
                onClick={() => router.push("/profile")}
              >
                Back to Profile
              </Button>
              <VehicleDetailsModal
                showVehicleDetailsModal={showVehicleDetailsModal}
                setShowVehicleDetailsModal={setShowVehicleDetailsModal}
                btnTitle={"Add Vehicle"}
                modalHeader={"Add Vehicle Details"}
                registration={""}
                type={""}
                make={""}
                model={""}
              />
            </div>
          </div>
          {user.vehicle_details.map((vehicle, index) => (
            <Card key={index} className="max-w-full mb-5">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {vehicle.vehicle_make} {vehicle.vehicle_model}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Registration Number: {vehicle.registration_number}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Vehicle Type: {vehicle.vehicle_type}
              </p>

              <div className="flex gap-4 flex-end">
                <VehicleDetailsModal
                  showVehicleDetailsModal={showVehicleDetailsModal}
                  setShowVehicleDetailsModal={setShowVehicleDetailsModal}
                  btnTitle={"Edit"}
                  modalHeader={"Edit Vehicle Details"}
                  registration={vehicle.registration_number}
                  type={vehicle.vehicle_type}
                  make={vehicle.vehicle_make}
                  model={vehicle.vehicle_model}
                />
                <Button
                  className="bg-custom-orange"
                  onClick={() => handleDeleteVehicle(vehicle)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
