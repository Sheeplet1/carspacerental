import { useState } from 'react';
import SearchContext from '@contexts/SearchContext';
import { getNextHour, getDate } from '@utils/utils';
import { testListings } from '@utils/utils';

const SearchProvider = ({ children }) => {
  const [isCasual, setIsCasual] = useState(true);
  const [addressData, setAddressData] = useState(null);
  const [listings, setListings] = useState(testListings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [startTime, setStartTime] = useState(getNextHour());
  const [endTime, setEndTime] = useState(startTime + 1 > 23 ? 0 : startTime + 1);
  const [startDate, setStartDate] = useState(getDate());
  const [endDate, setEndDate] = useState(endTime < startTime ? new Date(new Date().setDate(new Date().getDate() + 1)) : new Date());
  const [minStartTime, setMinStartTime] = useState(getNextHour());
  const [minEndTime, setMinEndTime] = useState(minStartTime + 1 > 23 ? 0 : minStartTime + 1);
  const [sort, setSort] = useState('distance');

  return (
    <SearchContext.Provider value={{
      isCasual, setIsCasual,
      addressData, setAddressData,
      listings, setListings,
      selectedListing, setSelectedListing,
      isBooking, setIsBooking,
      startTime, setStartTime,
      endTime, setEndTime,
      startDate, setStartDate,
      endDate, setEndDate,
      minStartTime, setMinStartTime,
      minEndTime, setMinEndTime,
      sort, setSort
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;