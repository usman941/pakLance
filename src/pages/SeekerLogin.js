import React, { useState } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import icon from "../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { BackendURI } from "../utils/BackendUrl";
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";

const SeekerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    let url;
    let RegisteredRole = localStorage.getItem("role");

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

  

    const data = {
      email,
      password,
    };

    try {
     
        const response = await axios.post(`${BackendURI}/seeker/login`, data);
        console.log(data);
        console.log("Signin response:", response);
        setEmail("");
        setPassword("");
        toast.success("Logged In Successfully");
        localStorage.setItem("AuthToken", response.data.token);
        localStorage.setItem("role","jobSeeker");
        navigate("/createprofile");
      
    //   if(RegisteredRole==="jobProvider"){
    //     const response = await axios.post(`${BackendURI}/provider/login`, data);
    //     console.log(data);
    //     console.log("Signin response:", response);
    //     setEmail("");
    //     setPassword("");
    //     toast.success("Logged In Successfully");
    //     localStorage.setItem("AuthToken", response.data.token);
    //     localStorage.setItem("role","jobProvider");

    //     navigate("/createprofile");

    //   }
      
     
    } catch (error) {
        toast.error(error.response?.data?.message);
      console.log("Error:", error);
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
          <p className="text-2xl font-semibold">Sign In</p>
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
          <div className="mb-6">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label> */}
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder=" Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 text-center text-black">
            <p>
              Forget Password? <Link to="/forget">Click Here</Link>
            </p>
          </div>
         
          <div className="flex items-center justify-center pt-4">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 text-center text-black">
            <p>
              Create New Account? <Link to="/registeras">Click Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeekerLogin;
