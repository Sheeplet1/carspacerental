'use client'

import React, { useContext, useState } from 'react';
import BookingContext from '@contexts/BookingContext';

const ManageBookingPage = () => {
  const { bookings, finishedBookings } = useContext(BookingContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState();

  // Function to handle editing the booking
//   const handleEditBooking = (booking) => {
//     setSelectedBooking(booking);
//     setShowEditModal(true);
//   };

//   // Function to handle canceling the booking
//   const handleCancelBooking = (bookingId) => {
//     // Implement your API call or state update to cancel the booking with the provided bookingId
//   };

  return (
    <div className="flex flex-col">
      {/* Manage Booking Section */}
      <div className="my-8">
        <h1 className="text-2xl font-bold mb-4">Manage Booking</h1>
        {bookings.map((booking) => (
          <div key={booking.id} className="border rounded p-4 mb-4">
            <div className="flex justify-between">
              <span className="font-bold">Booking Date:</span>
              <span>{booking.bookingDate}</span>
            </div>
            {/* Display other relevant booking information */}
            <div className="flex justify-between">
              {/* Display other relevant booking information */}
            </div>
            <div className="flex mt-4">
              <button
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleEditBooking(booking)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleCancelBooking(booking.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Finished Bookings Section */}
      <div className="my-8">
        <h1 className="text-2xl font-bold mb-4">Review Finished Bookings</h1>
        {finishedBookings.map((booking) => (
          <div key={booking.id} className="border rounded p-4 mb-4">
            <div className="flex justify-between">
              <span className="font-bold">Booking Date:</span>
              <span>{booking.bookingDate}</span>
            </div>
            {/* Display other relevant booking information */}
            <div className="flex justify-between">
              {/* Display other relevant booking information */}
            </div>
            <div className="flex mt-4">
              {/* You can add buttons or actions related to reviewing finished bookings */}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Booking Modal */}
      {showEditModal && selectedBooking && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6">
            <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
            {/* Implement your edit booking form here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookingPage;
