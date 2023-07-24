"use client";

import { useState, useEffect } from "react";
import LoginSideBar from "@components/LoginSideBar";
import PaymentDetailsModal from "@components/PaymentDetailsModal";
import { Button, Card } from "flowbite-react";
import { FaRegCreditCard } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUser } from "@contexts/UserProvider";

const PaymentDetails = () => {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(
    user.payment_details.map(() => false)
  );

  useEffect(() => {
    setShowPaymentDetailsModal(user.payment_details.map(() => false));
  }, [user.payment_details]);

  const formatCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  const handleDeletePayment = async (payment) => {
    const body = {
      payment_details: user.payment_details.filter(
        (p) => p.card_number !== payment.card_number
      ),
    };
    updateUser(body);
  };
  return (
    <div className="flex flex-row w-full mt-12 bg-gray-100">
      <div className="rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div
        className="flex flex-col w-full justify-between ml-5 p-5 bg-white shadow-md rounded-lg overflow-auto"
        style={{ maxHeight: "600px" }}
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="heading_text text-3xl text-gray-700">
              Payment Details
            </h1>
            <div className="flex flex-row gap-4 ">
              <Button
                className="bg-custom-orange"
                onClick={() => router.push("/profile")}
              >
                Back to Profile
              </Button>
              <PaymentDetailsModal
                showPaymentDetailsModal={showAddPaymentModal}
                setShowPaymentDetailsModal={setShowAddPaymentModal}
                btnTitle="Add Payment"
                modalHeader="Add Payment Details"
                number={""}
                date={""}
                cvvNo={0}
                isEdit={false}
              />
            </div>
          </div>
          {user.payment_details.map((payment, index) => (
            <Card key={index} className="max-w-full mb-5">
              <div className="flex text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <FaRegCreditCard size={50} />{" "}
                <div className="mt-3 ml-5">
                  {formatCardNumber(payment.card_number)}
                </div>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Expiry Date: {payment.expiry_date}
              </p>
              <div className="flex gap-4 flex-end">
                <PaymentDetailsModal
                  showPaymentDetailsModal={showPaymentDetailsModal[index]}
                  setShowPaymentDetailsModal={(value) => {
                    const newShowPaymentDetailsModal = [
                      ...showPaymentDetailsModal,
                    ];
                    newShowPaymentDetailsModal[index] = value;
                    setShowPaymentDetailsModal(newShowPaymentDetailsModal);
                  }}
                  btnTitle="Edit"
                  modalHeader="Edit Payment Details"
                  number={payment.card_number}
                  date={payment.expiry_date}
                  cvvNo={payment.cvv}
                  isEdit={true}
                />
                <Button
                  className="bg-custom-orange"
                  onClick={() => handleDeletePayment(payment)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
