"use client";

import React from "react";
import LoginSidebar from "@components/LoginSideBar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DescribeParkingSpot = () => {
  const router = useRouter();
  const [describeParkingSpace, setDescribeParkingSpace] = useState("");
  const [driverInstructions, setDriverInstructions] = useState("");
  const [describeParkingSpaceError, setDescribeParkingSpaceError] =
    useState("");
  const [driverInstructionsError, setDriverInstructionsError] = useState("");

  const handleNextClick = () => {
    if (describeParkingSpace === "") {
      setDescribeParkingSpaceError("Please describe your parking space.");
    } else {
      setDescribeParkingSpaceError("");
    }

    if (driverInstructions === "") {
      setDriverInstructionsError("Please provide instructions for the driver.");
    } else {
      setDriverInstructionsError("");
    }

    if (describeParkingSpace && driverInstructions) {
      router.push(
        "/list-your-spot/parking-spot-details/describe-parking-spot/set-price"
      );
    }
  };

  return (
    <div className="flex flex-row w-full mt-12">
      <div className="w-1/3">
        <LoginSidebar />
      </div>
      <div className="relative bottom-14 flex flex-col mr-44">
        <h1 className="heading_text">Describe your parking spot.</h1>

        <label className="mb-2 mt-4">Describe your parking space:</label>
        <textarea
          className={`w-96 h-32 border-2 border-gray-300 rounded-3xl p-2 resize-none text-xs ${
            describeParkingSpaceError ? "border-red-500" : ""
          }`}
          placeholder="Describe what makes your spot special (e.g. nearby locations, convenience)."
          value={describeParkingSpace}
          onChange={(e) => setDescribeParkingSpace(e.target.value)}
        />
        {describeParkingSpaceError && (
          <p className="text-red-500 mt-2">{describeParkingSpaceError}</p>
        )}

        <label className="mb-2 mt-4">Instructions for drivers:</label>
        <textarea
          className={`w-96 h-32 border-2 border-gray-300 rounded-3xl p-2 resize-none text-xs ${
            driverInstructionsError ? "border-red-500" : ""
          }`}
          placeholder="Describe how to access your spot. This will be hidden until a booking is made."
          value={driverInstructions}
          onChange={(e) => setDriverInstructions(e.target.value)}
        />
        {driverInstructionsError && (
          <p className="text-red-500 mt-2">{driverInstructionsError}</p>
        )}

        <div className="flex justify-between mt-14">
          <Link href="/list-your-spot/parking-spot-details">
            <button className="blue_btn">Back</button>
          </Link>
          <button className="blue_btn" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescribeParkingSpot;
