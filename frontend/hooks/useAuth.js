import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const fetchUser = async (token) => {
    // TODO: Fetch user data from backend
    return { name: "John Doe", image: "profile.jpg" };
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      fetchUser(token).then((user) => {
        setUser(user);
      });
    }
  }, []);

  const login = async (username, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      const user = await fetchUser(data.token);
      setUser(user);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return { user, token, login, logout };
};