import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import icon from "../assets/icon.png";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import { BackendURI } from "../utils/BackendUrl";
const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const navigate = useNavigate();
  const {id}=useParams();


  const handleRegister = async () => {
    console.log("hittt 1");

    let url;
    let RegisteredRole = localStorage.getItem("role");

    if (!password) {
      toast.error("Please fill in all fields!");
      return;
    }

    const data = {
      password,
    };
      if(localStorage.getItem("role")==="jobSeeker")
      {
        
        try {
          console.log("hittt");
          const response = await axios.put(`${BackendURI}/seeker/resetpassword/${id}`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          });
          console.log("Forget Password response:", response);
          setPassword("");
          toast.success(response.data.message);
           navigate("/login");
        } catch (error) {
          toast.error("Something went wrong!");
          console.log("Error:", error);
        }
      }   
      else{
        try {
          console.log("hittt");
          const response = await axios.put(`${BackendURI}/provider/resetpassword/${id}`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          });
          console.log("Forget Password response:", response);
          setPassword("");
          toast.success(response.data.message);
           navigate("/login");
        } catch (error) {
          toast.error("Something went wrong!");
          console.log("Error:", error);
        }
      } 
      


  

 
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex justify-center py-2">
        <img src={icon} />
      </div>
      <div className="w-full max-w-xs">
        <div className="flex  justify-center py-4">
          <p className="text-2xl font-semibold">Set New Password</p>
        </div>
        <form className=" shadow-lg rounded px-6 pt-6 pb-8 mb-4">
          <div className="mb-4">
        
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder=" Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         

          <div className="flex items-center justify-center pt-4">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
