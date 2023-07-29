"use client";

import React, { useContext, useState } from "react";
import BookingContext from "@contexts/BookingContext";
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
