"use client"


import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const PaymentForm = () => {
  const [carNumber, setCarNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const router = useRouter();

  const handleConfirm = () => {
    // Handle form submission or validation
    console.log('Paymentdetail Confirmed');
    router.push('/booking');
  };

  return (
    <div className='flex flex-col h-screen mt-14'>
      <h1 className='heading_text'>Payment Method</h1>

      <div className="payment-form__card">
        <div className="payment-form__card-image">
        </div>
        <div className='mb-10'>
          </div>
          
        <div className="payment-form__card-details">
        <h3 className='font-bold text-sm text-gray-500 mb-2'>Car Number:</h3>
          <input
            id="carNumber"
            className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            placeholder="Enter car number"
          />
          
          <div className='mb-10'>
          </div>
          <h3 className='font-bold text-sm text-gray-500 mb-2'>Expire Date:</h3>
          {/* </label> */}
          <input
            id="expiryDate"
            className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />

          <div className='mb-10'>
          </div>
          <h3 className='font-bold text-sm text-gray-500 mb-2'>CVV:</h3>

          <input
            id="cvv"
            className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
            type="text"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            placeholder="Enter CVV"
          />
        </div>
        
      </div>

      <div className='mb-10'>
      </div>
      <div className='flex justify-between'>
            <button className='blue_btn' onClick={() => handleConfirm()}>
            Confirm Payment
            </button>
      </div>
    </div>
  );
};

export default PaymentForm;
