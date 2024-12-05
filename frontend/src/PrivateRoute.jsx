import React from "react";
import { Navigate } from "react-router-dom";

export const UserPrivateRoute = ({ children }) => {
  const userToken = localStorage.getItem("usertoken");

  return userToken ? children : <Navigate to="/login" />;
};

export const AdminPrivateRoute = ({ children }) => {
  const adminToken = localStorage.getItem("admintoken");

  return adminToken ? children : <Navigate to="/admin-login" />;
};
