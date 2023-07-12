'use client'

// import React, { useState, useContext, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import UserContext from '@contexts/UserContext';

// const ProfilePage = () => {
//   const { user, setUser } = useContext(UserContext);
//   const [editingEmail, setEditingEmail] = useState(false);
//   const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
//   const [editingName, setEditingName] = useState(false);
//   const [newEmail, setNewEmail] = useState('');
//   const [newPhoneNumber, setNewPhoneNumber] = useState('');
//   const [newName, setNewName] = useState('');
//   const [oldEmail, setOldEmail] = useState(user.email);
//   const [oldPhoneNumber, setOldPhoneNumber] = useState(user.phone_number[0]);
//   const [oldName, setOldName] = useState(user.first_name);
//   const [showChangePhotoButton, setShowChangePhotoButton] = useState(false);
//   const fileInputRef = useRef(null);

//   const router = useRouter();

//   const handleEditEmailClick = () => {
//     setEditingEmail(true);
//   };

//   const handleEditPhoneNumberClick = () => {
//     setEditingPhoneNumber(true);
//   };

//   const handleEditNameClick = () => {
//     setEditingName(true);
//   };

//   const handleCancelEmailClick = () => {
//     setEditingEmail(false);
//     setNewEmail('');
//   };

//   const handleCancelPhoneNumberClick = () => {
//     setEditingPhoneNumber(false);
//     setNewPhoneNumber('');
//   };

//   const handleCancelNameClick = () => {
//     setEditingName(false);
//     setNewName('');
//   };

//   const handleSaveEmailClick = () => {
//     if (newEmail !== '') {
//       setOldEmail(newEmail);
//       setUser({ ...user, email: newEmail }); // Update the email in the user object
//       setEditingEmail(false);
//       setNewEmail('');
//     }
//   };

//   const handleSavePhoneNumberClick = () => {
//     if (newPhoneNumber !== '') {
//       setOldPhoneNumber(newPhoneNumber);
//       setUser({ ...user, phoneNumber: newPhoneNumber }); // Update the phone number in the user object
//       setEditingPhoneNumber(false);
//       setNewPhoneNumber('');
//     }
//   };

//   const handleSaveNameClick = () => {
//     if (newName !== '') {
//       setOldName(newName);
//       setUser({ ...user, name: newName }); // Update the name in the user object
//       setEditingName(false);
//       setNewName('');
//     }
//   };

//   const handlePhotoMouseEnter = () => {
//     setShowChangePhotoButton(true);
//   };

//   const handlePhotoMouseLeave = () => {
//     setShowChangePhotoButton(false);
//   };

//   const handlePhotoChangeClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         // Update the profile photo in the user object and save it to the server
//         setUser({ ...user, profilePhoto: base64String });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className='flex flex-row h-screen mt-2 bottom-44'>
//       <div className='relative w-1/3'>
//         <div
//           className='w-40 h-40 rounded-full bg-gray-300 cursor-pointer relative'
//           onMouseEnter={handlePhotoMouseEnter}
//           onMouseLeave={handlePhotoMouseLeave}
//           onClick={handlePhotoChangeClick}
//         >
//           <img src={user.profilePhoto || '/assets/icons/profile.svg'} alt='Profile' className='w-40 h-40 rounded-full' />
//           {showChangePhotoButton && (
//             <button className='absolute bg-blue-500 text-white py-1 px-2 rounded-md transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
//               Change Photo
//             </button>
//           )}
//           <input
//             type='file'
//             accept='image/*'
//             className='hidden'
//             ref={fileInputRef}
//             onChange={handleFileInputChange}
//           />
//         </div>
//       </div>
//       <div className='relative bottom-14 flex flex-col mr-44'>
//         <h1 className='heading_text'>Profile</h1>
//         <div className='flex items-center mb-10'>
//           <label className='mb-2'>
//             Email:
//             <div className='mb-10'>
//               {editingEmail ? (
//                 <input
//                   className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
//                   type='text'
//                   value={newEmail}
//                   onChange={(e) => setNewEmail(e.target.value)}
//                   placeholder='Enter new email'
//                 />
//               ) : (
//                 <input
//                   className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
//                   type='text'
//                   value={oldEmail}
//                   readOnly
//                 />
//               )}
//             </div>
//           </label>
//           {editingEmail ? (
//             <div className='flex ml-4'>
//               <button className='blue_btn' onClick={handleSaveEmailClick}>
//                 Save
//               </button>
//               <button className='blue_btn' onClick={handleCancelEmailClick}>
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <button className='blue_btn' onClick={handleEditEmailClick}>
//               Edit
//             </button>
//           )}
//         </div>
//         <div className='flex items-center mb-10'>
//           <label className='mb-2'>
//             Phone Number:
//             <div className='mb-10'>
//               {editingPhoneNumber ? (
//                 <input
//                   className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
//                   type='text'
//                   value={newPhoneNumber}
//                   onChange={(e) => setNewPhoneNumber(e.target.value)}
//                   placeholder='Enter new phone number'
//                 />
//               ) : (
//                 <input
//                   className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
//                   type='text'
//                   value={oldPhoneNumber}
//                   readOnly
//                 />
//               )}
//             </div>
//           </label>
//           {editingPhoneNumber ? (
//             <div className='flex ml-4'>
//               <button className='blue_btn' onClick={handleSavePhoneNumberClick}>
//                 Save
//               </button>
//               <button className='blue_btn' onClick={handleCancelPhoneNumberClick}>
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <button className='blue_btn' onClick={handleEditPhoneNumberClick}>
//               Edit
//             </button>
//           )}
//         </div>
//         <div className='flex items-center mb-10'>
//           <label className='mb-2'>
//             Name:
//             <div className='mb-10'>
//               {editingName ? (
//                 <input
//                   className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
//                   type='text'
//                   value={newName}
//                   onChange={(e) => setNewName(e.target.value)}
//                   placeholder='Enter new name'
//                 />
//               ) : (
//                 <input
//                   className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
//                   type='text'
//                   value={oldName}
//                   readOnly
//                 />
//               )}
//             </div>
//           </label>
//           {editingName ? (
//             <div className='flex ml-4'>
//               <button className='blue_btn' onClick={handleSaveNameClick}>
//                 Save
//               </button>
//               <button className='blue_btn' onClick={handleCancelNameClick}>
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <button className='blue_btn' onClick={handleEditNameClick}>
//               Edit
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

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

  return (
    <div className='flex flex-row h-screen mt-2 bottom-44'>
      <div className='relative w-1/3'>
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
          <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
        </div>
      </div>
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
            First Name:
            <div className='mb-10'>
              {editingFirstName ? (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  placeholder='Enter new first name'
                />
              ) : (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={oldFirstName}
                  readOnly
                />
              )}
            </div>
          </label>
          {editingFirstName ? (
            <div className='flex ml-4'>
              <button className='blue_btn' onClick={handleSaveFirstNameClick}>
                Save
              </button>
              <button className='blue_btn' onClick={handleCancelFirstNameClick}>
                Cancel
              </button>
            </div>
          ) : (
            <button className='blue_btn' onClick={handleEditFirstNameClick}>
              Edit
            </button>
          )}
        </div>
        <div className='flex items-center mb-10'>
          <label className='mb-2'>
            Last Name:
            <div className='mb-10'>
              {editingLastName ? (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  placeholder='Enter new last name'
                />
              ) : (
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={oldLastName}
                  readOnly
                />
              )}
            </div>
          </label>
          {editingLastName ? (
            <div className='flex ml-4'>
              <button className='blue_btn' onClick={handleSaveLastNameClick}>
                Save
              </button>
              <button className='blue_btn' onClick={handleCancelLastNameClick}>
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
  );
};

export default ProfilePage;

