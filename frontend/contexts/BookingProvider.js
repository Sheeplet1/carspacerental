import { useState } from "react";
import BookingContext from "@contexts/BookingContext";
import { getNextHour, getDate } from "@utils/utils";
import PropTypes from "prop-types";

const BookingProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(getNextHour());
  const [endTime, setEndTime] = useState(
    startTime + 1 > 23 ? 0 : startTime + 1
  );
  const [startDate, setStartDate] = useState(getDate());
  const [endDate, setEndDate] = useState(
    endTime < startTime
      ? new Date(new Date().setDate(new Date().getDate() + 1))
      : new Date()
  );
  const [price, setPrice] = useState(0);
  const [bookings, setBookings] = useState([
    {
        "_id": "60fdb79d8a32fe168d8a63f3",
        "consumer": "60fdb79d8a32fe168d8a63f4",
        "listing_id": "60fdb79d8a32fe168d8a63f5",
        "start_time": "2022-01-01T00:00:00",
        "end_time": "2022-01-23T00:00:00",
        "price": 100.0,
        "parent": "60fdb79d8a32fe168d8a63f6",
        "child": "60fdb79d8a32fe168d8a63f7",
        "exclusions": ["60fdb79d8a32fe168d8a63f8", "60fdb79d8a32fe168d8a63f9"]
    },
    {
        "_id": "60fdb79d8a32fe168d8a63fa",
        "consumer": "60fdb79d8a32fe168d8a63fb",
        "listing_id": "60fdb79d8a32fe168d8a63fc",
        "start_time": "2022-01-01T00:00:00",
        "end_time": "2022-01-23T00:00:00",
        "price": 100.0,
        "parent": "60fdb79d8a32fe168d8a63fd",
        "child": "60fdb79d8a32fe168d8a63fe",
        "exclusions": ["60fdb79d8a32fe168d8a63ff", "60fdb79d8a32fe168d8a6400"]
    },
    {
        "_id": "60fdb79d8a32fe168d8a6401",
        "consumer": "60fdb79d8a32fe168d8a6402",
        "listing_id": "60fdb79d8a32fe168d8a6403",
        "start_time": "2022-01-01T00:00:00",
        "end_time": "2022-01-23T00:00:00",
        "price": 100.0,
        "parent": "60fdb79d8a32fe168d8a6404",
        "child": "60fdb79d8a32fe168d8a6405",
        "exclusions": ["60fdb79d8a32fe168d8a6406", "60fdb79d8a32fe168d8a6407"]
    },
    {
        "_id": "60fdb79d8a32fe168d8a6408",
        "consumer": "60fdb79d8a32fe168d8a6409",
        "listing_id": "60fdb79d8a32fe168d8a640a",
        "start_time": "2022-01-01T00:00:00",
        "end_time": "2022-01-23T00:00:00",
        "price": 100.0,
        "parent": "60fdb79d8a32fe168d8a640b",
        "child": "60fdb79d8a32fe168d8a640c",
        "exclusions": ["60fdb79d8a32fe168d8a640d", "60fdb79d8a32fe168d8a640e"]
    },
    {
        "_id": "60fdb79d8a32fe168d8a640f",
        "consumer": "60fdb79d8a32fe168d8a6410",
        "listing_id": "60fdb79d8a32fe168d8a6411",
        "start_time": "2022-01-01T00:00:00",
        "end_time": "2022-01-23T00:00:00",
        "price": 100.0,
        "parent": "60fdb79d8a32fe168d8a6412",
        "child": "60fdb79d8a32fe168d8a6413",
        "exclusions": ["60fdb79d8a32fe168d8a6414", "60fdb79d8a32fe168d8a6415"]
    }
]);
  const [finishedBookings, setFinishedBookings] = useState([
    {
      "_id": "60fdb79d8a32fe168d8a63f3",
      "consumer": "60fdb79d8a32fe168d8a63f4",
      "listing_id": "60fdb79d8a32fe168d8a63f5",
      "start_time": "2022-01-01T00:00:00",
      "end_time": "2022-01-23T00:00:00",
      "price": 100.0,
      "parent": "60fdb79d8a32fe168d8a63f6",
      "child": "60fdb79d8a32fe168d8a63f7",
      "exclusions": ["60fdb79d8a32fe168d8a63f8", "60fdb79d8a32fe168d8a63f9"]
    },
    {
      "_id": "60fdb79d8a32fe168d8a63fa",
      "consumer": "60fdb79d8a32fe168d8a63fb",
      "listing_id": "60fdb79d8a32fe168d8a63fc",
      "start_time": "2022-01-01T00:00:00",
      "end_time": "2022-01-23T00:00:00",
      "price": 100.0,
      "parent": "60fdb79d8a32fe168d8a63fd",
      "child": "60fdb79d8a32fe168d8a63fe",
      "exclusions": ["60fdb79d8a32fe168d8a63ff", "60fdb79d8a32fe168d8a6400"]
    },
    {
      "_id": "60fdb79d8a32fe168d8a6401",
      "consumer": "60fdb79d8a32fe168d8a6402",
      "listing_id": "60fdb79d8a32fe168d8a6403",
      "start_time": "2022-01-01T00:00:00",
      "end_time": "2022-01-23T00:00:00",
      "price": 100.0,
      "parent": "60fdb79d8a32fe168d8a6404",
      "child": "60fdb79d8a32fe168d8a6405",
      "exclusions": ["60fdb79d8a32fe168d8a6406", "60fdb79d8a32fe168d8a6407"]
    },
    {
      "_id": "60fdb79d8a32fe168d8a6408",
      "consumer": "60fdb79d8a32fe168d8a6409",
      "listing_id": "60fdb79d8a32fe168d8a640a",
      "start_time": "2022-01-01T00:00:00",
      "end_time": "2022-01-23T00:00:00",
      "price": 100.0,
      "parent": "60fdb79d8a32fe168d8a640b",
      "child": "60fdb79d8a32fe168d8a640c",
      "exclusions": ["60fdb79d8a32fe168d8a640d", "60fdb79d8a32fe168d8a640e"]
    },
    {
      "_id": "60fdb79d8a32fe168d8a640f",
      "consumer": "60fdb79d8a32fe168d8a6410",
      "listing_id": "60fdb79d8a32fe168d8a6411",
      "start_time": "2022-01-01T00:00:00",
      "end_time": "2022-01-23T00:00:00",
      "price": 100.0,
      "parent": "60fdb79d8a32fe168d8a6412",
      "child": "60fdb79d8a32fe168d8a6413",
      "exclusions": ["60fdb79d8a32fe168d8a6414", "60fdb79d8a32fe168d8a6415"]
    }
  ]
  );

  const handleEditBooking = (booking) => {};

  const handleCancelBooking = (bookingId) => {};

  return (
    <BookingContext.Provider
      value={{
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        price,
        setPrice,
        bookings,
        setBookings,
        finishedBookings,
        setFinishedBookings,
        handleEditBooking,
        handleCancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
