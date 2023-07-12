'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import UserContext from '@contexts/UserContext';

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [oldEmail, setOldEmail] = useState(user.email);
  const [oldPhoneNumber, setOldPhoneNumber] = useState(user.phoneNumber);
  const [oldName, setOldName] = useState(user.name);

  const router = useRouter();

  const handleEditEmailClick = () => {
    setEditingEmail(true);
  };

  const handleEditPhoneNumberClick = () => {
    setEditingPhoneNumber(true);
  };

  const handleEditNameClick = () => {
    setEditingName(true);
  };

  const handleCancelEmailClick = () => {
    setEditingEmail(false);
    setNewEmail('');
  };

  const handleCancelPhoneNumberClick = () => {
    setEditingPhoneNumber(false);
    setNewPhoneNumber('');
  };

  const handleCancelNameClick = () => {
    setEditingName(false);
    setNewName('');
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

  const handleSaveNameClick = () => {
    if (newName !== '') {
      setOldName(newName);
      setUser({ ...user, name: newName }); // Update the name in the user object
      setEditingName(false);
      setNewName('');
    }
  };

  return (
    <div className='flex flex-row h-screen mt-14'>
      <div className='relative bottom-14 flex flex-col mr-44'>
        <h1 className='heading_text'>Profile</h1>
        <div className='flex items-center mb-10'>
          <label className='mb-2'>
            Email:
            <div className='mb-10'>
              {editingEmail ? (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder='Enter new email'
                />
              ) : (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={oldEmail}
                  readOnly
                />
              )}
            </div>
          </label>
          {editingEmail ? (
            <div className='flex ml-4'>
              <button className='blue_btn' onClick={handleSaveEmailClick}>
                Save
              </button>
              <button className='blue_btn' onClick={handleCancelEmailClick}>
                Cancel
              </button>
            </div>
          ) : (
            <button className='blue_btn' onClick={handleEditEmailClick}>
              Edit
            </button>
          )}
        </div>
        <div className='flex items-center mb-10'>
          <label className='mb-2'>
            Phone Number:
            <div className='mb-10'>
              {editingPhoneNumber ? (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  placeholder='Enter new phone number'
                />
              ) : (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={oldPhoneNumber}
                  readOnly
                />
              )}
            </div>
          </label>
          {editingPhoneNumber ? (
            <div className='flex ml-4'>
              <button className='blue_btn' onClick={handleSavePhoneNumberClick}>
                Save
              </button>
              <button className='blue_btn' onClick={handleCancelPhoneNumberClick}>
                Cancel
              </button>
            </div>
          ) : (
            <button className='blue_btn' onClick={handleEditPhoneNumberClick}>
              Edit
            </button>
          )}
        </div>
        <div className='flex items-center mb-10'>
          <label className='mb-2'>
            Name:
            <div className='mb-10'>
              {editingName ? (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder='Enter new name'
                />
              ) : (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={oldName}
                  readOnly
                />
              )}
            </div>
          </label>
          {editingName ? (
            <div className='flex ml-4'>
              <button className='blue_btn' onClick={handleSaveNameClick}>
                Save
              </button>
              <button className='blue_btn' onClick={handleCancelNameClick}>
                Cancel
              </button>
            </div>
          ) : (
            <button className='blue_btn' onClick={handleEditNameClick}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
