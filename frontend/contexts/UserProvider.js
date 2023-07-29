"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { makeRequest } from "@utils/utils";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [loading, setLoading] = useState(true);

  const register = async (body, setEmailError, setShowFurtherRegistration) => {
    const response = await makeRequest("/auth/register", "POST", body);
    if (response.error) {
      setEmailError(response.error);
      setShowFurtherRegistration(false);
    } else {
      localStorage.setItem("token", response.token);
      setToken(response.token);
      router.push("/");
      setLoading(false);
    }
  };

  const login = async (body, setEmailError) => {
    const response = await makeRequest("/auth/login", "POST", body);
    if (response.error) {
      setEmailError(response.error);
    } else {
      localStorage.setItem("token", response.token);
      setToken(response.token);
      router.push("/");
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  const fetchUser = async () => {
    if (token && !user) {
      const response = await makeRequest("/user/profile", "GET");
      if (response.error) {
        console.log(response.error);
      } else {
        setUser(response);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const updateUser = async (body) => {
    const result = await makeRequest("/user/profile", "PUT", body);
    if (result.error) {
      console.log(result.error);
    } else {
      fetchUser();
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider
      value={{ user, register, login, logout, updateUser, fetchUser }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
