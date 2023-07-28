import React, { useState } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import icon from "../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import { BackendURI } from "../utils/BackendUrl";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const handleRegister = async () => {
    let url;
    let RegisteredRole = localStorage.getItem("role");

    if (!email) {
      toast.error("Please fill in all fields!");
      return;
    }
    const data = {
      email,
    };
   
      if(localStorage.getItem("role")==="jobSeeker") 
      {
        
        try {
          const response = await axios.post(`${BackendURI}/seeker/forgotPassword`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          });
          console.log("Forget Password response:", response);
          setEmail("");
          toast.success("lease check your email inbox to reset your password");
          // navigate("/login");
        } catch (error) {
          toast.error("Something went wrong!");
          console.log("Error:", error);
        }
      }
      else{
        
        try {
          const response = await axios.post(`${BackendURI}/provider/forgotPassword`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          });
          console.log("Forget Password response:", response);
          setEmail("");
          toast.success("lease check your email inbox to reset your password");
          // navigate("/login");
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
          <p className="text-2xl font-semibold">Forget Password</p>
        </div>
        <form className=" shadow-lg rounded px-6 pt-6 pb-8 mb-4">
          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label> */}
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center pt-4">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
            >
              Send an email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
