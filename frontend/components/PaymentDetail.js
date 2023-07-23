import { calculateTotalPrice, makeRequest } from '@utils/utils';
import { use, useContext, useState } from 'react';
import SearchContext from '@contexts/SearchContext';
import UserContext from '@contexts/UserContext';
import VehicleDetailsModal from '@components/VehicleDetailsModal';
import PaymentDetailsModal from '@components/PaymentDetailsModal';
import Select from "react-select";

const PaymentDetail = () => {
  const { user } = useContext(UserContext);
  const { selectedListing, startDate, endDate, startTime, endTime, isCasual, setIsBooking, setSelectedListing } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoCodeError, setPromoCodeError] = useState('');
  const [showVehicleDetailsModal, setShowVehicleDetailsModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);

  const formatDateTime = (date, time) => {
    const formattedDate = date.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

    const formattedTime = time === 0 ? '12 AM' :
      time === 12 ? '12 PM' :
        time > 12 ? `${time - 12} PM` : `${time} AM`;

    return `${formattedDate}, ${formattedTime}`;
  }

  const vehicleOptions = user.vehicle_details.map((vehicle, index) => ({
    value: vehicle.registration_number,
    label: `${vehicle.vehicle_make} ${vehicle.vehicle_model} - (${vehicle.registration_number})`,
  }));

  const paymentMethodOptions = user.payment_details.map((payment, index) => ({
    value: payment.card_number,
    label: `**** **** **** ${payment.card_number.slice(-4)}`,
  }));

  const handlePromoCode = () => {
    if (promoCode) {
      setPromoCodeError('Invalid promo code');
    }
  }

  const clickPay = async () => {
    // startDate and startTime must be formated like 2022-01-01T00:00:00
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedStartTime = `${startTime}:00:00`

    const formattedEndDate = endDate.toISOString().split('T')[0];
    const formattedEndTime = `${endTime}:00:00`

    const body = {
      consumer: user._id,
      listing_id: selectedListing.listing_id,
      start_time: `${formattedStartDate}T${formattedStartTime}`,
      end_time: `${formattedEndDate}T${formattedEndTime}`,
      price: `${isCasual ? calculateTotalPrice(selectedListing.pricing.hourly_rate, startDate, endDate, startTime, endTime) : selectedListing.pricing.monthly_rate}`
    };

    const response = await makeRequest('/listings/book', 'POST', body);
      if (response.error) {
        console.log(response.error);
      } else {
        setIsBooking(false);
        setSelectedListing(null);
      }
  }

  return (
    <div className="flex flex-col h-full mt-4">
      <div className="flex flex-col h-full overflow-y-auto p-4">
        <div className="font-bold text-3xl text-gray-500 mb-4">{selectedListing.address.address}</div>
        <div className="flex flex-row justify-between items-center mb-4">
          <div>Starting Date</div>
          <div>{formatDateTime(startDate, startTime)}</div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="flex flex-row justify-between items-center mb-4">
          <div>Ending Date</div>
          <div>{isCasual ? formatDateTime(endDate, endTime) : formatDateTime(new Date(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()), startTime)}</div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="flex flex-row justify-between items-center mb-4">
          <div>Vehicle</div>
          <div>
            {
              user.vehicle_details.length !== 0 ? (
                <Select
                  defaultValue={vehicleOptions[0]}
                  options={vehicleOptions}
                />
              ) : (
                <VehicleDetailsModal showVehicleDetailsModal={showVehicleDetailsModal} setShowVehicleDetailsModal={setShowVehicleDetailsModal} />
              )
            }
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="w-full mb-4 bg-gray-300 pt-4 pb-4 p-1">
          Total Payment
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <div>Booking Price</div>
          <div>{isCasual ? `$${calculateTotalPrice(selectedListing.pricing.hourly_rate, startDate, endDate, startTime, endTime)}` : `$${selectedListing.pricing.monthly_rate}/mth`}</div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="flex flex-row justify-between items-center mb-4">
          <div>Promo Code</div>
          <div className="flex flex-row items-center">
            <div className='flex flex-col'>
              <div className='flex'>
                <input type="text" className="border border-gray-300 rounded p-2 mr-2" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                <button className="bg-custom-orange text-white rounded p-2" onClick={handlePromoCode}>Apply</button>
              </div>
              <p className='error_text'>{promoCodeError}</p>
            </div>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="flex flex-row justify-between items-center mb-4">
          <div>Less Balance or Free Credits</div>
          <div>-$0.00</div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="flex flex-row justify-between items-center mb-4">
          <div>Transaction fee</div>
          <div>$0.00</div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="flex flex-row justify-between items-center mb-4 w-full pt-4 pb-4 p-1 bg-gray-200">
          <div>Total Payment Due Today</div>
          <div>{isCasual ? `$${calculateTotalPrice(selectedListing.pricing.hourly_rate, startDate, endDate, startTime, endTime)}` : `$${selectedListing.pricing.monthly_rate}/mth`}</div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="flex flex-row justify-between items-center mb-4">
          <div>Payment Method</div>
          <div>
            {
              user.payment_details.length !== 0 ? (
                <Select
                  defaultValue={paymentMethodOptions[0]}
                  options={paymentMethodOptions}
                />
              ) : (
                <PaymentDetailsModal showPaymentDetailsModal={showPaymentDetailsModal} setShowPaymentDetailsModal={setShowPaymentDetailsModal} />
              )
            }
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 flex flex-row justify-between items-center p-4 bg-white">
        <div className="font-bold text-2xl text-gray-500">{isCasual ? `$${calculateTotalPrice(selectedListing.pricing.hourly_rate, startDate, endDate, startTime, endTime)}` : `$${selectedListing.pricing.monthly_rate}/mth`}</div>
        <div>
          <button
            className={`w-60 text-white rounded-full p-2 ${(!user.vehicle_details.length && !user.payment_details.length) ? 'bg-gray-600' : 'bg-custom-orange'}`}
            disabled={!user.vehicle_details.length && !user.payment_details.length}
            onClick={clickPay}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetail