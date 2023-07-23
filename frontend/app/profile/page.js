"use client";

import { useContext, useState } from "react";
import UserContext from "@contexts/UserContext";
import LoginSideBar from "@components/LoginSideBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditProfileModal from "@components/EditProfileModal";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const handleVehicleDetails = () => {
    router.push("/vehicle-details");
  };

  const handlePaymentDetails = () => {
    router.push("/payment-details");
  };

  return (
    <div className="flex flex-row w-full mt-12 bg-gray-100">
      <div className="w-1/3rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div className="flex flex-col w-full justify-between ml-5 p-5 bg-white shadow-md rounded-lg">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="heading_text text-3xl text-gray-700">Profile</h1>
            <EditProfileModal
              showEditProfileModal={showEditProfileModal}
              setShowEditProfileModal={setShowEditProfileModal}
            />
          </div>
          <div className="flex flex-row gap-20">
            <div className="w-1/5">
              <Image
                src="/assets/icons/profile.svg"
                alt="Profile"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-between w-4/5">
              <div>
                <span className="text-2xl font-bold text-gray-700">Name:</span>{" "}
                <span className="text-2xl text-gray-500">
                  {user.first_name + " " + user.last_name}
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-700">Email:</span>{" "}
                <span className="text-2xl text-gray-500">{user.email}</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-700">
                  Phone Number:
                </span>{" "}
                <span className="text-2xl text-gray-500">
                  {user.phone_number}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-between gap-6 mt-10">
          <div
            onClick={handleVehicleDetails}
            className="cursor-pointer flex flex-row w-full gap-4 p-5 bg-blue-100 rounded-lg shadow-inner"
          >
            <div>
              <Image
                src="/assets/images/vehicle.png"
                alt="Vehicle"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-lg font-bold text-blue-600">
                Vehicle Details
              </div>
              <div className="text-sm text-blue-500">
                Add the details of the vehicles you want to park
              </div>
            </div>
          </div>
          <div
            onClick={handlePaymentDetails}
            className="cursor-pointer flex flex-row w-full gap-4 p-5 bg-green-100 rounded-lg shadow-inner"
          >
            <div>
              <Image
                src="/assets/images/payment.png"
                alt="Payment"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-lg font-bold text-green-600">
                Payment Details
              </div>
              <div className="text-sm text-green-500">
                Add the details of the payment method you want to use
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
