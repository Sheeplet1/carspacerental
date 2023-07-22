"use client";

import React from "react";
import LoginSidebar from "@components/LoginSideBar";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "@components/SearchBar";
import { useRouter } from "next/navigation";

const ListYourSpot = () => {
  const [address, setAddress] = useState(null);
  const [addressError, setAddressError] = useState("");
  const router = useRouter();

  const validateAddress = () => {
    if (address) {
      router.push("/list-your-spot/parking-spot-details");
    } else {
      setAddressError("Please enter address.");
    }
  };

  const searchClick = (data) => {
    if (data) {
      setAddress(data);
    }
  };

  return (
    <div className="flex flex-row w-full justify-between mt-12">
      <div className="w-1/3">
        <LoginSidebar />
      </div>
      <div className="flex flex-col w-2/3">
        <h1 className="heading_text">List your spot!</h1>

        <div className="mb-2 mt-4">
          <label htmlFor="address" className="mb-2 mt-4">
            Enter your address:
          </label>
          <div className="w-96 mb-14">
            <SearchBar
              placeholder="Search Address"
              className="border border-transparent w-full h-12 px-3 rounded-full shadow-md text-base outline-none overflow-ellipsis overflow-hidden whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 placeholder-black-400"
              onSearch={searchClick}
            />
          </div>
          <p className="error_text">{addressError}</p>
        </div>

        <div className="flex justify-between w-96">
          <Link href="/">
            <button className="blue_btn">Back</button>
          </Link>
          <button className="blue_btn" onClick={validateAddress}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListYourSpot;
