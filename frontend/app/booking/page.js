"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BookingPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [editingPromoCode, setEditingPromoCode] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState("");

  const router = useRouter();

  const handleEditPromoClick = () => {
    setEditingPromoCode(true);
  };

  const handleSavePromoClick = () => {
    setPromoCode(newPromoCode);
    setEditingPromoCode(false);
    setNewPromoCode("");
  };

  const handleCancelPromoClick = () => {
    setEditingPromoCode(false);
    setNewPromoCode("");
  };

  const handlePaymentDetails = () => {
    router.push("/paymentdetail");
  };

  const handleVehicleDetails = () => {
    router.push("/vehicledetails");
  };

  // Assume the start and end dates are fetched from the car space listing
  const carSpaceListing = {
    startDate: "2023-07-19",
    endDate: "2023-07-21",
    price: "2000",
  };

  const handleConfirmBooking = () => {
    // to handle confirming the booking
  };

  return (
    <div className="flex flex-col h-screen mt-14">
      <h1 className="heading_text">Booking</h1>

      <label htmlFor="startTime" className="mb-2">
        Start Time:
        <div className="mb-10">
          <input
            id="startTime"
            className="w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2"
            type="text"
            value={carSpaceListing.startDate}
            disabled
          />
        </div>
      </label>

      <label htmlFor="endTime" className="mb-2">
        End Time:
        <div className="mb-10">
          <input
            id="endTime"
            className="w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2"
            type="text"
            value={carSpaceListing.endDate}
            disabled
          />
        </div>
      </label>

      <label htmlFor="vehicleDetails" className="mb-2">
        Vehicle Details:
        <div className="mb-10">
          <div className="mb-10">
            <button className="blue_btn" onClick={() => handleVehicleDetails()}>
              Enter Your Vehicle Details
            </button>
          </div>
        </div>
      </label>

      <label htmlFor="price" className="mb-2">
        Price:
        <div className="mb-10">
          <input
            id="price"
            className="w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2"
            type="text"
            value={carSpaceListing.price}
            disabled
          />
        </div>
      </label>

      <label htmlFor="promoCode" className="mb-2">
        Promo Code:
        <div className="mb-10">
          {editingPromoCode ? (
            <>
              <input
                id="promoCode"
                className="w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
              />
              <div className="flex">
                <button className="blue_btn" onClick={handleSavePromoClick}>
                  Save
                </button>
                <button
                  className="blue_btn ml-2"
                  onClick={handleCancelPromoClick}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                id="promoCode"
                className="w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2"
                type="text"
                value={promoCode}
                readOnly
              />
              <button className="blue_btn" onClick={handleEditPromoClick}>
                Add
              </button>
            </>
          )}
        </div>
      </label>

      <label htmlFor="paymentDetails" className="mb-2">
        Payment Details:
        <div className="mb-10">
          <div className="mb-10">
            <button className="blue_btn" onClick={handlePaymentDetails}>
              Enter Your Payment Details
            </button>
          </div>
        </div>
      </label>

      <label htmlFor="finalPrice" className="mb-2">
        FinalPrice:
        <div className="mb-10">
          <input
            id="finalprice"
            className="w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2"
            type="text"
            value={carSpaceListing.price}
            disabled
          />
        </div>
      </label>

      <div className="flex justify-between">
        <button className="blue_btn" onClick={handleConfirmBooking}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
