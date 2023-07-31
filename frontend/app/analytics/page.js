"use client";

import LoginSideBar from "@components/LoginSideBar";
import { useUser } from "@contexts/UserProvider";
import { AuthRequiredError } from "@errors/exceptions";

const Analytics = () => {
  const { user } = useUser();

  if (!user) {
    throw new AuthRequiredError();
  }

  return (
    <div className="flex flex-row w-full mt-12 bg-gray-100">
      <div className="w-1/3rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div className="flex flex-col w-full justify-between ml-5 p-5 bg-white shadow-md rounded-lg">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="heading_text text-3xl text-gray-700">Analytics</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
