import { useState, useEffect } from 'react';
import { makeRequest } from '@utils/makeRequest';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();

  const fetchUser = async (token) => {
    const response = await makeRequest('/user/profile', 'GET');
    if (response.error) {
      console.log(response.error);
      setUser(null);
    } else {
      setUser(response);
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
      fetchUser(localToken);
    }
  }, []);

  const register = async (email, password, firstName, lastName, phoneNumber) => {
    const body = {
      "email": email,
      "password": password,
      "first_name": firstName,
      "last_name": lastName,
      "phone_number": phoneNumber
    }

    const response = await makeRequest('/auth/register', 'POST', body);
    if (response.error) {
      console.log(response.error);
      setUser(null);
      setToken(null);
    } else {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      fetchUser(response.token);
      router.push('/');
    }
  }

  const login = async (email, password) => {
    const response = await makeRequest('/auth/login', 'POST', { email, password });
    if (response.error) {
      console.log(response.error);
      setUser(null);
      setToken(null);
    } else {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      fetchUser(response.token);
      router.push('/');
    }
  };

  const profile = async (email) => {
    const response = await makeRequest('/auth/updateEmail', 'POST', { email });
    if (response.error) {
      console.log(response.error);
      setUser(null);
      setToken(null);
    } else {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      fetchUser(response.token);
      router.push('/');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    router.push('/');
  };

  return { user, token, register, login, logout };
};