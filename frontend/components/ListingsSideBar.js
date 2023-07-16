'use client'

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion"
import BookingInputs from '@components/BookingInputs';
import Listings from '@components/Listings';
import ListingDetail from '@components/ListingDetail';
import PaymentDetail from '@components/PaymentDetail';
import { getNextHour, getDate, calculateDistanceInKm, makeRequest } from '@utils/utils';

const ListingsSideBar = ({ listings, setListings, selectedListing, setSelectedListing, addressData, setAddressData, isCasual, setIsCasual }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [startTime, setStartTime] = useState(getNextHour());
  const [endTime, setEndTime] = useState(startTime + 1 > 23 ? 0 : startTime + 1);
  const [startDate, setStartDate] = useState(getDate());
  const [endDate, setEndDate] = useState(endTime < startTime ? new Date(new Date().setDate(new Date().getDate() + 1)) : new Date());
  const [minStartTime, setMinStartTime] = useState(getNextHour());
  const [minEndTime, setMinEndTime] = useState(minStartTime + 1 > 23 ? 0 : minStartTime + 1);
  const [sort, setSort] = useState('distance');

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(new Date(startDate));
    }

    if (startDate.getDate() != new Date().getDate()) {
      setMinStartTime(0);
    } else {
      setMinStartTime(getNextHour());
    }

    if (endDate.getDate() != new Date().getDate()) {
      setMinEndTime(0);
    } else {
      setMinEndTime(getNextHour() + 1 > 23 ? 0 : getNextHour() + 1);
    }

    if (startDate.getDate() == endDate.getDate() && startTime >= endTime) {
      setEndTime(startTime + 1);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startTime >= endTime && startDate.getDate() == endDate.getDate()) {
      if (startTime + 1 > 23) {
        setEndTime(0);
        setMinEndTime(0);
        setEndDate(new Date(endDate.setDate(endDate.getDate() + 1)));
      } else {
        setEndTime(startTime + 1);
        setMinEndTime(startTime + 1);
      }
    }

  }, [startTime, endTime]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await makeRequest('/listings', 'GET');
  //     if (response.error) {
  //       console.log(response.error);
  //     } else {
  //       setListings(response.listings);
  //     }
  //   }

  //   fetchData();
  // }, [addressData, startDate, endDate, startTime, endTime]);

  useEffect(() => {
    const sortedListings = [...listings].sort((a, b) => {
      switch (sort) {
        case 'distance':
          return calculateDistanceInKm(a.address.lat, a.address.lng, addressData.lat, addressData.lng) - calculateDistanceInKm(b.address.lat, b.address.lng, addressData.lat, addressData.lng)
        case 'price':
          return isCasual ? a.pricing.hourly_rate - b.pricing.hourly_rate : a.pricing.monthly_rate - b.pricing.monthly_rate;
        default:
          return 0;
      }
    });

    setListings(sortedListings);
  }, [sort, isCasual, addressData]);

  useEffect(() => {
    const filterListings = () => {
      let filteredListings = [...listings];

      if (isCasual) {
        filteredListings = filteredListings.filter(listing => {
          if (!listing.casual_booking) return false;

          if (listing.availability.is_24_7) return true;

          const selectedDays = getDaysArray(new Date(startDate), new Date(endDate)).map(date => date.toLocaleString('en-us', { weekday: 'long' }));

          const listingDays = listing.availability.available_days;

          const dateIsValid = selectedDays.every(day => listingDays.includes(day));

          const startTimeIsValid = startTime >= getTime(listing.availability.start_time) && startTime < getTime(listing.availability.end_time);
          const endTimeIsValid = endTime > getTime(listing.availability.start_time) && endTime <= getTime(listing.availability.end_time);

          return dateIsValid && startTimeIsValid && endTimeIsValid;
        });
      } else {
        filteredListings = filteredListings.filter(listing => listing.monthly_booking);
      }
      return filteredListings;
    };

    setListings(filterListings());
  }, [isCasual, startDate, endDate, startTime, endTime, listings]);

  function getTime(timeString) {
    const time = timeString.split(':');
    return parseInt(time[0]) + parseInt(time[1]) / 60;
  }



  return (
    <div className="flex flex-row">
      <div className="flex flex-col pr-2">
        <div className="flex justify-start space-x-4 mb-4 pr-4">
          <button
            className={`font-black text-xl mb-1 hover:text-custom-orange ${isCasual ? "text-custom-orange underline" : ""}`}
            onClick={() => setIsCasual(true)}>
            Casual
          </button>
          <button
            className={`font-black text-xl mb-1 hover:text-custom-orange ${!isCasual ? "text-custom-orange underline" : ""}`}
            onClick={() => setIsCasual(false)}>
            Monthly
          </button>
        </div>
        <BookingInputs searchClick={(data) => data && setAddressData(data)} isCasual={isCasual} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} minStartTime={minStartTime} startTime={startTime} setStartTime={setStartTime} minEndTime={minEndTime} endTime={endTime} setEndTime={setEndTime} setSort={setSort} />

        <hr className="border-t-2 border-gray-300" />
        <Listings listings={listings} setSelectedListing={setSelectedListing} startDate={startDate} endDate={endDate} startTime={startTime} endTime={endTime} isCasual={isCasual} addressData={addressData} />
      </div>

      {selectedListing && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 30, damping: 10 }}
          className="absolute w-1/3 h-full bg-background rounded z-10 left-95 shadow-2xl drop-shadow-2xl"
        >
          <button
            className="left rounded-full p-2 absolute right-4"
            onClick={() => {
              setSelectedListing(null);
              setIsBooking(false);
            }}
          >
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
            />
          </button>
          {
            !isBooking ? (
              <ListingDetail selectedListing={selectedListing} startDate={startDate} endDate={endDate} startTime={startTime} endTime={endTime} setIsBooking={setIsBooking} isCasual={isCasual} />
            ) : (
              <PaymentDetail selectedListing={selectedListing} startDate={startDate} endDate={endDate} startTime={startTime} endTime={endTime} setIsBooking={setIsBooking} isCasual={isCasual} />
            )
          }
        </motion.div>
      )}
    </div >
  );
};

export default ListingsSideBar;