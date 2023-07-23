"use client";

import { useState, useEffect, useCallback } from "react";
import UserContext from "@contexts/UserContext";
import { makeRequest } from "@utils/makeRequest";
import PropTypes from "prop-types";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken =
      typeof window !== "undefined" &&
      window.localStorage &&
      localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";

    setToken(localToken);

    if (localToken) {
      updateUser();
    } else {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async () => {
    const response = await makeRequest("/user/profile", "GET");

    if (response.error) {
      console.log(response.error);
    } else {
      setUser(response);
    }
    setLoading(false);
  }, [token]);

  const handleSetToken = useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, setToken: handleSetToken, updateUser }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
