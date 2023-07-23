"use strict";

import React, { useState, useEffect, useCallback } from "react";
import UserContext from "@contexts/UserContext";
import { makeRequest } from "@utils/makeRequest";
import PropTypes from "prop-types";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    typeof window !== "undefined" &&
      window.localStorage &&
      localStorage.getItem("token")
      ? localStorage.getItem("token")
      : ""
  );

  const updateUser = useCallback(async () => {
    const response = await makeRequest("/user/profile", "GET");

    if (response.error) {
      console.log(response.error);
    } else {
      setUser(response);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      updateUser();
    } else {
      setLoading(false); // In case there is no token in local storage, we should also set loading to false
    }
  }, [token, updateUser]);

  return (
    <UserContext.Provider value={{ user, setUser, setToken, updateUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
