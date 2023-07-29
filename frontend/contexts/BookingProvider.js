import { useState } from 'react';
import BookingContext from '@contexts/BookingContext';
import { getNextHour, getDate } from '@utils/utils';
import { createContext } from 'react';

const BookingProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(getNextHour());
  const [endTime, setEndTime] = useState(startTime + 1 > 23 ? 0 : startTime + 1);
  const [startDate, setStartDate] = useState(getDate());
  const [endDate, setEndDate] = useState(endTime < startTime ? new Date(new Date().setDate(new Date().getDate() + 1)) : new Date());
  const [price, setPrice] = useState(0); 
  const [bookings, setBookings] = useState([]); 
  const [finishedBookings, setFinishedBookings] = useState([]); 

  const handleEditBooking = (booking) => {
   
  };

  const handleCancelBooking = (bookingId) => {
    
  };

  return (
    <BookingContext.Provider value={{
      startTime, setStartTime,
      endTime, setEndTime,
      startDate, setStartDate,
      endDate, setEndDate,
      price, setPrice,
      bookings, setBookings,
      finishedBookings, setFinishedBookings,
      handleEditBooking,
      handleCancelBooking,
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
