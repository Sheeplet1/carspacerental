'use client';

import { Button, Modal, Label } from 'flowbite-react';
import { useState, useRef, useEffect, useContext } from 'react';
import { makeRequest } from '@utils/utils';
import UserContext from '@contexts/UserContext';

const PaymentDetailsModal = ({ showPaymentDetailsModal, setShowPaymentDetailsModal }) => {
  const [cardNo, setCardNo] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardNoError, setCardNoError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const { user, updateUser } = useContext(UserContext);

  const ref = useRef(null);

  useEffect(() => {
    ref.current = document.body;
  }, [])

  const clickSave = async () => {
    const isCardNoExist = !!cardNo;
    const isCardNoValid = isCardNoExist && cardNo.length === 19;
    setCardNoError(isCardNoExist ? (isCardNoValid ? '' : 'Please enter a valid card number') : 'This field is required');

    const isExpiryDateExist = !!expiryDate;
    let isExpiryDateValid = false;
    if (isExpiryDateExist) {
      const expiryDateComponents = expiryDate.split("/");
      const expiryMonth = parseInt(expiryDateComponents[0]);
      const expiryYear = parseInt(expiryDateComponents[1]);
      const currentYear = (new Date()).getFullYear() % 100; // get last 2 digits of year
      const currentMonth = (new Date()).getMonth() + 1; // months are 0-based in JS
      isExpiryDateValid = expiryYear > currentYear || (expiryYear === currentYear && expiryMonth >= currentMonth);
    }
    setExpiryDateError(isExpiryDateExist ? (isExpiryDateValid ? '' : 'Please enter a valid expiry date') : 'This field is required')

    const isCvvValid = !!cvv;
    setCvvError(isCvvValid ? '' : 'This field is required');

    if (isCardNoValid && isExpiryDateValid && isCvvValid) {
      const newPaymentDetail = {
        card_number: cardNo,
        expiry_date: expiryDate,
        cvv: cvv,
      };

      const body = {
        "payment_details": [
          ...user.payment_details,
          newPaymentDetail,
        ],
      }

      const response = await makeRequest('/user/profile', 'PUT', body);
      if (response.error) {
        console.log(response.error);
      } else {
        updateUser();
        closeModal();
      }
    }
  };

  const handleCardNoChange = ({ target }) => {
    let val = target.value.replace(/[^\d]/g, '');

    if (/^\d*$/.test(val)) {
      let match = val.match(/.{1,4}/g);
      val = match ? match.join(' ') : '';
      setCardNo(val);
    }
  };

  const handleExpiryDateChange = ({ target }) => {
    let val = target.value;

    if (/^[0-9/]*$/.test(val)) {
      if (val.length === 2 && expiryDate.length === 1 && !val.includes('/')) {
        val += '/';
      }
      setExpiryDate(val);
    }
  };

  const closeModal = () => {
    setCardNo('');
    setExpiryDate('');
    setCvv('');
    setCardNoError('');
    setExpiryDateError('');
    setCvvError('');
    setShowPaymentDetailsModal(false);
  }


  return (
    <div>
      <Button className='bg-custom-orange hover:bg-custom-orange-dark text-white' onClick={() => setShowPaymentDetailsModal(true)}>Add Payment Details</Button>
      <Modal show={showPaymentDetailsModal} onClose={closeModal} root={ref.current}>
        <Modal.Header className='bg-custom-orange text-white'>Payment Details</Modal.Header>
        <Modal.Body>
          <div className='flex flex-col'>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="small"
                  value="Card Number"
                />
              </div>
              <input
                id='cardNo'
                className='w-full border-2 border-gray-300 rounded-3xl p-2 mt-2 mb-4'
                type='text'
                placeholder='1234 5678 9012 3456'
                value={cardNo}
                onChange={handleCardNoChange}
                maxLength={19}
              />
              <p className='error_text'>{cardNoError}</p>
            </div>
            <div className='flex justify-between'>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="small"
                    value="Expiry Date"
                  />
                </div>
                <input
                  id='expiryDate'
                  className='w-full border-2 border-gray-300 rounded-3xl p-2 mt-2 mb-4'
                  type='text' placeholder='MM/YY'
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={5}
                />
                <p className='error_text'>{expiryDateError}</p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="small"
                    value="CVC"
                  />
                </div>
                <input
                  id='cvc'
                  className='w-full border-2 border-gray-300 rounded-3xl p-2 mt-2 mb-4'
                  type='text'
                  placeholder='123'
                  value={cvv}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setCvv(val);
                    }
                  }}
                  maxLength={3}
                />
                <p className='error_text'>{cvvError}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row justify-end space-x-4">
            <Button className='bg-custom-orange hover:bg-custom-orange-dark text-white' onClick={closeModal}>
              Cancel
            </Button>
            <Button className='bg-custom-orange hover:bg-custom-orange-dark text-white' onClick={clickSave} >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal >
    </div>
  )
}

export default PaymentDetailsModal;