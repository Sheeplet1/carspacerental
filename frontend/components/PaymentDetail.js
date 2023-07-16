import { calculateTotalPrice } from '@utils/utils';

const PaymentDetail = ({selectedListing, startDate, endDate, startTime, endTime, setIsBooking}) => {  
  return (
    <div className="flex flex-col h-full p-4 overflow-auto">
      <div className="font-bold text-3xl text-gray-500 mb-4">{selectedListing.address.address}</div>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>Starting Date</div>
        <div>{startDate.toLocaleDateString()}</div>
      </div>
      <hr className="border-t-2 border-gray-300 mb-4" />
      <div className="flex flex-row justify-between items-center mb-4">
        <div>Ending Date</div>
        <div>{endDate.toLocaleDateString()}</div>
      </div>
      <hr className="border-t-2 border-gray-300 mb-4" />
      <div className="w-full mb-4 bg-gray-300 p-4">
        Total Payment
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>Booking Price</div>
        <div>${calculateTotalPrice(selectedListing.price, startDate, endDate, startTime, endTime)}</div>
      </div>
      <hr className="border-t-2 border-gray-300 mb-4" />
      <div className="flex flex-row justify-between items-center mb-4">
        <div>Promo Code</div>
        <div className="flex flex-row items-center">
          <input type="text" className="border border-gray-300 rounded p-2 mr-2" />
          <button className="bg-custom-orange text-white rounded p-2">Apply</button>
        </div>
      </div>
      <hr className="border-t-2 border-gray-300 mb-4" />
      <div className="flex flex-row justify-between items-center mb-4">
        <div>Transaction fee</div>
        <div>$0.00</div>
      </div>
      <hr className="border-t-2 border-gray-300 mb-4" />
      <div className="flex flex-row justify-between items-center mb-4 w-full p-4 bg-gray-200">
        <div>Total Payment Due Today</div>
        <div>${calculateTotalPrice(selectedListing.price, startDate, endDate, startTime, endTime)}</div>
      </div>
      <hr className="border-t-2 border-gray-300 mb-4" />
      <div className="flex flex-row justify-between items-center mb-4">
        <div>Payment Method</div>
        <button className="bg-custom-orange text-white rounded p-2">Add Payment Method</button>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-row justify-between items-center p-4 bg-white">
        <div className="font-bold text-2xl text-gray-500">${selectedListing.price}/hr</div>
        <div>
          <button className="bg-custom-orange w-60 text-white rounded-full p-2">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetail