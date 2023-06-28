'use client'

import React, { useState, useEffect } from 'react';
import UserContext from '@contexts/UserContext';
import { makeRequest } from '@utils/makeRequest';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    typeof window !== 'undefined' && window.localStorage 
      ? localStorage.getItem('token') 
      : ''
  );

  const updateUser = async (token) => {
    const response = await makeRequest('/user/profile', 'GET');

    if (response.error) {
      console.log(response.error);
    } else {
      setUser(response);
    }
  };

  useEffect(() => {
    if (token) {
      updateUser(token);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;