import React, { useContext } from "react";
import BookingContext from "@contexts/BookingContext";
import LoginSideBar from "@components/LoginSideBar";

const ManageBooking = () => {
  const { bookings, finishedBookings, handleEditBooking, handleCancelBooking } =
    useContext(BookingContext);

  return (
    <div className="flex flex-row w-full mt-12">
      <div className="rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div
        className="flex flex-col w-full ml-5 p-5 bg-white shadow-md rounded-lg overflow-y-scroll"
        style={{ height: "78vh" }}
      >
        <div className="my-8">
          <h1 className="text-2xl font-bold mb-4">Current Bookings</h1>
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded p-4 mb-4">
              <div className="flex justify-between">
                <span className="font-bold">Start Time:</span>
                <span>{booking.start_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">End Time:</span>
                <span>{booking.end_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Price:</span>
                <span>{booking.price}</span>
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

        <div className="my-8">
          <h1 className="text-2xl font-bold mb-4">Review Bookings</h1>
          {finishedBookings.map((booking) => (
            <div key={booking.id} className="border rounded p-4 mb-4">
              <div className="flex justify-between">
                <span className="font-bold">Start Time:</span>
                <span>{booking.start_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">End Time:</span>
                <span>{booking.end_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Price:</span>
                <span>{booking.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    // <div>
    //   <div className="my-8">
    //     <h1 className="text-2xl font-bold mb-4">Current Bookings</h1>
    //     {bookings.map((booking) => (
    //       <div key={booking.id} className="border rounded p-4 mb-4">
    //         <div className="flex justify-between">
    //           <span className="font-bold">Start Time:</span>
    //           <span>{booking.start_time}</span>
    //         </div>
    //         <div className="flex justify-between">
    //           <span className="font-bold">End Time:</span>
    //           <span>{booking.end_time}</span>
    //         </div>
    //         <div className="flex justify-between">
    //           <span className="font-bold">Price:</span>
    //           <span>{booking.price}</span>
    //         </div>
    //         <div className="flex mt-4">
    //           <button
    //             className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    //             onClick={() => handleEditBooking(booking)}
    //           >
    //             Edit
    //           </button>
    //           <button
    //             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    //             onClick={() => handleCancelBooking(booking.id)}
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   <div className="my-8">
    //     <h1 className="text-2xl font-bold mb-4">Review Bookings</h1>
    //     {finishedBookings.map((booking) => (
    //       <div key={booking.id} className="border rounded p-4 mb-4">
    //         <div className="flex justify-between">
    //           <span className="font-bold">Start Time:</span>
    //           <span>{booking.start_time}</span>
    //         </div>
    //         <div className="flex justify-between">
    //           <span className="font-bold">End Time:</span>
    //           <span>{booking.end_time}</span>
    //         </div>
    //         <div className="flex justify-between">
    //           <span className="font-bold">Price:</span>
    //           <span>{booking.price}</span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ManageBooking;
