import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance, { setAuthHeader } from "./axiosConfig";
// import axiosInstance, { setAuthHeader } from "./axiosConfig";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("client");

  const fetchData = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      const response = await axiosInstance.get("/project");
      const roleResponse = await axiosInstance.get("/user/role");

      setRole(roleResponse.data.role);
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = async () => {
    setLoading(true);
    await fetchData();
  };
  return (
    <DataContext.Provider
      value={{ projects, loading, setLoading, error, refreshData, role }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
