"use client";

import { Button, Modal, Label } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@contexts/UserProvider";
import PaymentDetailsModal from "@components/PaymentDetailsModal";
import PropTypes from "prop-types";

const WithdrawModal = ({
  showWithdrawModal,
  setShowWithdrawModal,
  btnTitle,
  modalHeader,
  withdraw_payment_details,
  withdraw_amount,
}) => {
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [withdrawPaymentDetails, setWithdrawPaymentDetails] = useState(withdraw_payment_details);
  const [withdrawAmount, setWithdrawAmount] = useState(withdraw_amount);
  const [withdrawAmountError, setWithdrawAmountError] = useState("");
  const { user, updateUser } = useUser();

  const paymentMethodOptions = user.payment_details.map((payment) => ({
    value: payment.card_number,
    label: `**** **** **** ${payment.card_number.slice(-4)}`,
  }));

  useEffect(() => {
    setWithdrawPaymentDetails(withdraw_payment_details);
    setWithdrawAmount(withdraw_amount);
  }, [withdraw_payment_details, amount, showWithdrawModal]);

  const ref = useRef(null);

  useEffect(() => {
    ref.current = document.body;
  }, []);

  const clickNext = async () => {

    const isAmountExist = !!withdrawAmount;
    setWithdrawAmountError(isAmountExist ? "" : "This field is required");

    if (isAmountExist) {
        const newWithdrawDetail = {
          withdraw_payment_details: withdrawPaymentDetails,
          withdraw_amount: withdrawAmount,
        };
    }
  };

  const closeModal = () => {

  }

  return (
    <div>
      <Button
        className='bg-custom-orange hover:bg-custom-orange-dark text-white'
        onClick={() => setShowWithdrawModal(true)}>
          {btnTitle}
      </Button>

      <Modal
        show={showWithdrawModal}
        onClose={closeModal}
        root={ref.current}>
        <Modal.Header className="bg-custom-orange text-white">{modalHeader}</Modal.Header>

        <Modal.Body>
          <div>
            <div className="flex flex-col">
              <Label htmlFor="small" value="Payment Method"/>
              <div>
                {user.payment_details.length !== 0 ? (
                  <Select
                    defaultValue={paymentMethodOptions[0]}
                    options={paymentMethodOptions}
                  />
                ) : (
                  <PaymentDetailsModal
                    showPaymentDetailsModal={showPaymentDetailsModal}
                    setShowPaymentDetailsModal={setShowPaymentDetailsModal}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Withdraw Amount" />
              </div>
              <input
                className="w-full border-2 border-gray-300 rounded-3xl p-2 mt-2 mb-4"
                type="text"
                placeholder="$xx"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <p className="error_text">{setWithdrawAmountError}</p>
            </div>
        </Modal.Body>

        <Modal.Footer>
        <div className="flex flex-row justify-end space-x-4">
            <Button
              className="bg-custom-orange hover:bg-custom-orange-dark text-white"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              className="bg-custom-orange hover:bg-custom-orange-dark text-white"
              onClick={clickNext}
            >
              Next
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WithdrawModal

WithdrawModal.PropTypes = {
  showWithdrawModal: PropTypes.bool.isRequired,
  setShowWithdrawModal: PropTypes.func.isRequired,
  btnTitle: PropTypes.string.isRequired,
  modalHeader: PropTypes.string.isRequired,
  withdraw_payment_details: PropTypes.string.isRequired,
  withdraw_amount: PropTypes.number.isRequired,
};