'use client'

import React from 'react'
import { makeRequest } from '@utils/makeRequest';
import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react';
import UserContext from '@contexts/UserContext';

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [oldEmail, setOldEmail] = useState(user.email);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setNewEmail('');
  };

  const handleSaveClick = () => {
    if (newEmail !== '') {
      setOldEmail(newEmail);
      setEditing(false);
      setNewEmail('');
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
              <input
                className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                type='text'
                value={oldEmail}
                readOnly
              />
            </div>
          </label>
          {editing ? (
            <div className='flex ml-4'>
              <button className='blue_btn' onClick={() => handleSaveClick()}>
                Save
              </button>
              <button className='blue_btn' onClick={() => handleCancelClick()}>
                Cancel
              </button>
            </div>
          ) : (
            <button className='blue_btn' onClick={() => handleEditClick()}>
              Edit
            </button>
          )}
        </div>
        {editing && (
          <div className='absolute right-0 top-16 z-10 w-144 bg-background shadow-lg rounded-md p-4' role='menu' aria-orientation='vertical' tabIndex='-1'>
            <label className='mb-2'>
              Enter your new Email:
              <div className='mb-10'>
                <input
                  className='w-96 border-2 border-gray-300 rounded-3xl p-2 mt-2'
                  type='text'
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder='Enter new email'
                />
              </div>
            </label>
            <div className='flex justify-end'>
              <button className='blue_btn' onClick={() => handleSaveClick()}>
                Save
              </button>
              <button className='blue_btn' onClick={() => handleCancelClick()}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { useState, useContext } from 'react';
// import UserContext from '@contexts/UserContext';

// const ProfilePage = () => {
//   const { user, setUser } = useContext(UserContext);
//   const [editingEmail, setEditingEmail] = useState(false);
//   const [newEmail, setNewEmail] = useState('');
//   const [oldEmail, setOldEmail] = useState(user.email);

//   const router = useRouter();

//   const handleEditEmailClick = () => {
//     setEditingEmail(true);
//   };

//   const handleCancelEmailClick = () => {
//     setEditingEmail(false);
//     setNewEmail('');
//   };

//   const handleSaveEmailClick = () => {
//     if (newEmail !== '') {
//       setOldEmail(newEmail);
//       setUser({ ...user, email: newEmail }); // Update the email in the user object
//       setEditingEmail(false);
//       setNewEmail('');
//     }
//   };

//   return (
//     <div className='flex flex-row h-screen mt-14'>
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
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;