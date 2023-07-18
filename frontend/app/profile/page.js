'use client'

import React, { useState, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '@contexts/UserContext';

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [editingFirstName, setEditingFirstName] = useState(false);
  const [editingLastName, setEditingLastName] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [oldEmail, setOldEmail] = useState(user.email);
  const [oldPhoneNumber, setOldPhoneNumber] = useState(user.phone_number[0]);
  const [oldFirstName, setOldFirstName] = useState(user.first_name);
  const [oldLastName, setOldLastName] = useState(user.last_name);
  const [showChangePhotoButton, setShowChangePhotoButton] = useState(false);
  const fileInputRef = useRef(null);

  const router = useRouter();

  const handleEditEmailClick = () => {
    setEditingEmail(true);
  };

  const handleEditPhoneNumberClick = () => {
    setEditingPhoneNumber(true);
  };

  const handleEditFirstNameClick = () => {
    setEditingFirstName(true);
  };

  const handleEditLastNameClick = () => {
    setEditingLastName(true);
  };

  const handleCancelEmailClick = () => {
    setEditingEmail(false);
    setNewEmail('');
  };

  const handleCancelPhoneNumberClick = () => {
    setEditingPhoneNumber(false);
    setNewPhoneNumber('');
  };

  const handleCancelFirstNameClick = () => {
    setEditingFirstName(false);
    setNewFirstName('');
  };

  const handleCancelLastNameClick = () => {
    setEditingLastName(false);
    setNewLastName('');
  };

  const handleSaveEmailClick = () => {
    if (newEmail !== '') {
      setOldEmail(newEmail);
      setUser({ ...user, email: newEmail }); // Update the email in the user object
      setEditingEmail(false);
      setNewEmail('');
    }
  };

  const handleSavePhoneNumberClick = () => {
    if (newPhoneNumber !== '') {
      setOldPhoneNumber(newPhoneNumber);
      setUser({ ...user, phoneNumber: newPhoneNumber }); // Update the phone number in the user object
      setEditingPhoneNumber(false);
      setNewPhoneNumber('');
    }
  };

  const handleSaveFirstNameClick = () => {
    if (newFirstName !== '') {
      setOldFirstName(newFirstName);
      setUser({ ...user, first_name: newFirstName }); // Update the first name in the user object
      setEditingFirstName(false);
      setNewFirstName('');
    }
  };

  const handleSaveLastNameClick = () => {
    if (newLastName !== '') {
      setOldLastName(newLastName);
      setUser({ ...user, last_name: newLastName }); // Update the last name in the user object
      setEditingLastName(false);
      setNewLastName('');
    }
  };

  const handlePhotoMouseEnter = () => {
    setShowChangePhotoButton(true);
  };

  const handlePhotoMouseLeave = () => {
    setShowChangePhotoButton(false);
  };

  const handlePhotoChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Update the profile photo in the user object and save it to the server
        setUser({ ...user, profilePhoto: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaymentDetailsClick = () => {
    // Redirect to payment page
    router.push('/payment');
  };

  const handleVehicleDetailsClick = () => {
    // Redirect to vehicle details page
    router.push('/vehicle-details');
  };

  return (
    <div className='flex flex-col h-screen mt-2'>
     <div className='w-8/5 mx-auto left-0 ml-2 pl-4'>
        <h1 className='heading_text mb-4'>Profile</h1>
        <div className='flex'>
          <div className='w-8/5'>
            <div
              className='w-40 h-40 rounded-full bg-gray-300 cursor-pointer relative'
              onMouseEnter={handlePhotoMouseEnter}
              onMouseLeave={handlePhotoMouseLeave}
              onClick={handlePhotoChangeClick}
            >
              <img src={user.profilePhoto || '/assets/icons/profile.svg'} alt='Profile' className='w-40 h-40 rounded-full' />
              {showChangePhotoButton && (
                <button className='absolute bg-blue-500 text-white py-1 px-2 rounded-md transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
                  Change Photo
                </button>
              )}
              <input type='file' accept='image/*' className='hidden' ref={fileInputRef} onChange={handleFileInputChange} />
            </div>
          </div>
          <div className='w-1/3 pl-6'>
            <div className='mt-2'>
              <label className='block mb-2'>
                Email:
                {editingEmail ? (
                  <input className='border-2 border-gray-300 rounded-3xl p-2 mt-2' type='text' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder='Enter new email' />
                ) : (
                  <input className='border-2 border-gray-300 rounded-3xl p-2 mt-2' type='text' value={oldEmail} readOnly />
                )}
              </label>
              {editingEmail ? (
                <div className='flex'>
                  <button className='blue_btn' onClick={handleSaveEmailClick}>
                    Save
                  </button>
                  <button className='blue_btn ml-2' onClick={handleCancelEmailClick}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className='blue_btn' onClick={handleEditEmailClick}>
                  Edit
                </button>
              )}
            </div>
            <div className='mt-4'>
              <label className='block mb-2'>
                Phone Number:
                {editingPhoneNumber ? (
                  <input className='border-2 border-gray-300 rounded-3xl p-2 mt-2' type='text' value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} placeholder='Enter new phone number' />
                ) : (
                  <input className='border-2 border-gray-300 rounded-3xl p-2 mt-2' type='text' value={oldPhoneNumber} readOnly />
                )}
              </label>
              {editingPhoneNumber ? (
                <div className='flex'>
                  <button className='blue_btn' onClick={handleSavePhoneNumberClick}>
                    Save
                  </button>
                  <button className='blue_btn ml-2' onClick={handleCancelPhoneNumberClick}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className='blue_btn' onClick={handleEditPhoneNumberClick}>
                  Edit
                </button>
              )}
            </div>
            <div className='mt-4'>
              <label className='block mb-2'>
                First Name:
                {editingFirstName ? (
                  <input className='border-2 border-gray-300 rounded-3xl p-2 mt-2' type='text' value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} placeholder='Enter new first name' />
                ) : (
                  <input className='border-2 border-gray-300 rounded-3xl p-2 mt-2' type='text' value={oldFirstName} readOnly />
                )}
              </label>
              {editingFirstName ? (
                <div className='flex'>
                  <button className='blue_btn' onClick={handleSaveFirstNameClick}>
                    Save
                  </button>
                  <button className='blue_btn ml-2' onClick={handleCancelFirstNameClick}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className='blue_btn' onClick={handleEditFirstNameClick}>
                  Edit
                </button>
              )}
            </div>
            <div className='mt-4'>
              <label className='block mb-2'>
                Last Name:
                {editingLastName ? (
                  <input className='border-2 border-gray-300 rounded-3xl p-2 mt-2' type='text' value={newLastName} onChange={(e) => setNewLastName(e.target.value)} placeholder='Enter new last name' />
                ) : (
                  <input className='border-2 border-gray-300 rounded-3xl p-2 mt-2' type='text' value={oldLastName} readOnly />
                )}
              </label>
              {editingLastName ? (
                <div className='flex'>
                  <button className='blue_btn' onClick={handleSaveLastNameClick}>
                    Save
                  </button>
                  <button className='blue_btn ml-2' onClick={handleCancelLastNameClick}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className='blue_btn' onClick={handleEditLastNameClick}>
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-6'>
        <button className='blue_btn' onClick={handlePaymentDetailsClick}>
          Payment Details
        </button>
        <button className='blue_btn ml-4' onClick={handleVehicleDetailsClick}>
          Vehicle Details
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
