"use client";

import Sidebar from "@components/Sidebar";
import { useState } from "react";
import LoginSidebar from "@components/LoginSideBar";
import { useUser } from "@contexts/UserProvider";
import WithdrawModal from "@components/WithdrawModal";
import ConfirmModal from "@components/ConfirmModal";

const Wallet = () => {
  const { user } = useUser();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const setConfirmModalHandler = () => {
    setShowConfirmModal(true);
  };

  return (
    <div className='flex flex-row w-full justify-between mt-12'>
      <div className='w-1/3'>{user ? <LoginSidebar /> : <Sidebar />}</div>
      <div className='flex flex-col w-2/3'>
        <h1 className='heading_text'>Wallet</h1>

        <div className='border bg-custom-blue rounded p-4 mt-2'>
          <p className='text-gray-500 text-xs'>Current balance:</p>
          <p>$xxx.xx</p>
        </div>

        <WithdrawModal
          showWithdrawModal={showWithdrawModal}
          setShowWithdrawModal={setShowWithdrawModal}
          setConfirmModalHandler={setConfirmModalHandler}
        />
        <ConfirmModal
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
        />

        <h1 className='heading_text mt-20'>Recent transactions</h1>
        <hr className='border-t-2 border-gray-300 my-4'/>
        <a className='flex justify-center text-gray-400 hover:underline'>Show all transactions</a>
      </div>
    </div>
  );
};

export default Wallet
