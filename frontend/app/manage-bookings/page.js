"use client";

import { useState, useEffect } from "react";
import LoginSideBar from "@components/LoginSideBar";
import { Card } from "flowbite-react";
import CancelBookingModal from "@components/CancelBookingModal";
import EditBookingModal from "@components/EditBookingModal";
import ReviewModal from "@components/ReviewModal";
import { makeRequest } from "@utils/utils";

const ManageBooking = () => {
  const user = {
    bookings: [
      {
        _id: "60fdb79d8a32fe168d8a63f3",
        consumer: "60fdb79d8a32fe168d8a63f4",
        listing_id: "60fdb79d8a32fe168d8a63f5",
        start_time: "2023-08-03T01:00:00",
        end_time: "2023-08-03T03:00:00",
        price: 100.0,
        parent: "60fdb79d8a32fe168d8a63f6",
        child: "60fdb79d8a32fe168d8a63f7",
        exclusions: ["60fdb79d8a32fe168d8a63f8", "60fdb79d8a32fe168d8a63f9"],
      },
      {
        _id: "60fdb79d8a32fe168d8a63fa",
        consumer: "60fdb79d8a32fe168d8a63fb",
        listing_id: "60fdb79d8a32fe168d8a63fc",
        start_time: "2023-08-03T01:00:00",
        end_time: "2023-08-03T03:00:00",
        price: 100.0,
        parent: "60fdb79d8a32fe168d8a63fd",
        child: "60fdb79d8a32fe168d8a63fe",
        exclusions: ["60fdb79d8a32fe168d8a63ff", "60fdb79d8a32fe168d8a6400"],
      },
    ],
  };
  const [finishedBookings, setFinishedBookings] = useState([
    {
      _id: "60fdb79d8a32fe168d8a63f3",
      consumer: "60fdb79d8a32fe168d8a63f4",
      listing_id: "60fdb79d8a32fe168d8a63f5",
      start_time: "2022-01-01T00:00:00",
      end_time: "2022-01-23T00:00:00",
      price: 100.0,
      parent: "60fdb79d8a32fe168d8a63f6",
      child: "60fdb79d8a32fe168d8a63f7",
      exclusions: ["60fdb79d8a32fe168d8a63f8", "60fdb79d8a32fe168d8a63f9"],
    },
    {
      _id: "60fdb79d8a32fe168d8a63fa",
      consumer: "60fdb79d8a32fe168d8a63fb",
      listing_id: "60fdb79d8a32fe168d8a63fc",
      start_time: "2022-01-01T00:00:00",
      end_time: "2022-01-23T00:00:00",
      price: 100.0,
      parent: "60fdb79d8a32fe168d8a63fd",
      child: "60fdb79d8a32fe168d8a63fe",
      exclusions: ["60fdb79d8a32fe168d8a63ff", "60fdb79d8a32fe168d8a6400"],
    },
  ]);
  const [showCancelBookingModal, setShowCancelBookingModal] = useState(
    user.bookings.map(() => false)
  );
  const [showEditBookingModal, setShowEditBookingModal] = useState(
    user.bookings.map(() => false)
  );
  const [showReviewModal, setShowReviewModal] = useState([false, false]);

  useEffect(() => {
    setShowEditBookingModal(user.bookings.map(() => false));
  }, [user.bookings.length]);

  useEffect(() => {
    setShowCancelBookingModal(user.bookings.map(() => false));
  }, [user.bookings.length]);

  useEffect(() => {
    const fetchFinishedBookings = async () => {
      const response = await makeRequest("/profile/completed-bookings", "GET");
      if (response.error) {
        throw new Error(response.error);
      } else {
        if (response.length > 0) {
          setFinishedBookings(response);
          setShowReviewModal(response.map(() => false));
        }
      }
    };
    fetchFinishedBookings();
  }, []);

  const formatTime = (time) => {
    const date = new Date(time);
    const weekday = date.toLocaleString("default", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    let hour = date.getHours();
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    const minute = date.getMinutes();
    const paddedMinute = minute < 10 ? "0" + minute : minute;

    return `${weekday}, ${day} ${month} ${year}, ${hour}:${paddedMinute} ${ampm}`;
  };

  return (
    <div className="flex flex-row w-full mt-12">
      <div className="rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div
        className="flex flex-row w-full ml-5 p-5 bg-white shadow-md rounded-lg"
        style={{ height: "70vh" }}
      >
        <div className="w-1/2 pr-2 my-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Current Bookings</h1>
          {user.bookings.length > 0 ? (
            user.bookings.map((booking, index) => (
              <Card key={index} className="border rounded p-4 mb-4">
                <div className="flex justify-between">
                  <span className="font-bold">Start Time:</span>
                  <span>{formatTime(booking.start_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">End Time:</span>
                  <span>{formatTime(booking.end_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Price:</span>
                  <span>${booking.price}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <EditBookingModal
                    showEditBookingModal={showEditBookingModal[index]}
                    setShowEditBookingModal={(value) => {
                      const newShowEditBookingModal = [...showEditBookingModal];
                      newShowEditBookingModal[index] = value;
                      setShowEditBookingModal(newShowEditBookingModal);
                    }}
                    booking={booking}
                  />
                  <CancelBookingModal
                    showCancelBookingModal={showCancelBookingModal[index]}
                    setShowCancelBookingModal={(value) => {
                      const newShowCancelBookingModal = [
                        ...showCancelBookingModal,
                      ];
                      newShowCancelBookingModal[index] = value;
                      setShowCancelBookingModal(newShowCancelBookingModal);
                    }}
                    booking={booking}
                  />
                </div>
              </Card>
            ))
          ) : (
            <div className="text-xl text-gray-500">
              You have no current bookings.
            </div>
          )}
        </div>

        <div className="w-1/2 pl-2 my-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Finished Bookings</h1>
          {finishedBookings.length > 0 ? (
            finishedBookings.map((booking, index) => (
              <Card key={index} className="border rounded p-4 mb-4">
                <div className="flex justify-between">
                  <span className="font-bold">Start Time:</span>
                  <span>{formatTime(booking.start_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">End Time:</span>
                  <span>{formatTime(booking.end_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Price:</span>
                  <span>${booking.price}</span>
                </div>
                <ReviewModal
                  showReviewModal={showReviewModal[index]}
                  setShowReviewModal={(value) => {
                    const newShowReviewModal = [...showReviewModal];
                    newShowReviewModal[index] = value;
                    setShowReviewModal(newShowReviewModal);
                  }}
                  booking={booking}
                />
              </Card>
            ))
          ) : (
            <div className="text-xl text-gray-500">
              You have no finished bookings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
