import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    return <Navigate to={"/"} />;
  }
  return children;
}

export default ProtectedRoute;
