"use client";

import BookingProvider from "@contexts/BookingProvider";
import ManageBookings from "@components/MangeBookings";

const ManageBookingPage = () => {
  return (
    <BookingProvider>
      <ManageBookings />
    </BookingProvider>
  );
};

export default ManageBookingPage;
