import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  let loginToken = localStorage.getItem("AuthToken");

  return (
    <>
      {loginToken ? <Component /> : <Navigate to="/login" />}
      {/* <Component/> */}
    </>
  );
};

export default ProtectedRoute;
