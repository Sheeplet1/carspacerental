"use client";

import LoginSideBar from "@components/LoginSideBar";
import { useUser } from "@contexts/UserProvider";
import { AuthRequiredError } from "@errors/exceptions";
import { makeRequest } from "@utils/utils";
import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Analytics = () => {
  const { user } = useUser();
  const [Analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await makeRequest("/user/analytics", "GET");
      if (response.error) {
        throw new Error(response.error);
      } else {
        setAnalytics(response);
      }
    }
    fetchAnalytics();
  }, []);

  if (!user) {
    throw new AuthRequiredError();
  }

  return (
    <div className="flex flex-row w-full mt-12">
      <div className="w-1/3rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div
        className="flex flex-col w-full justify-between ml-5 p-5 bg-white shadow-md rounded-lg"
        style={{ height: "70vh" }}
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="heading_text text-3xl text-gray-700">Analytics</h1>
          </div>
          <div>
            {
              Analytics && Analytics.monthly_revenue && 
              <LineChart width={500} height={300} data={Analytics.monthly_revenue}>
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
