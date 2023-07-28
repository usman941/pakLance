import React, { useState } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import icon from "../assets/icon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { BackendURI } from "../utils/BackendUrl";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Location = useLocation();

  const handleRegister = async () => {
    let url;
    let role = undefined;

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    switch (Location.state?.role) {
      case "jobSeeker":
        url = `${BackendURI}/seeker/register`;
        role = "jobSeeker";
        break;
      case "jobProvider":
        url = `${BackendURI}/provider/register`;
        role = "jobProvider";
        break;
      default:
        url = `${BackendURI}/admin/register`;
        break;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
      role: role !== undefined ? role : undefined,
    };

    try {
      const response = await axios.post(url, data);
      console.log(data);
      console.log("Signup response:", response);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      localStorage.setItem("role", role === undefined ? "admin" : role);
      console.log(response.data.message);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      // toast.error(error.respons);
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
          <p className="text-2xl font-semibold">Sign Up</p>
        </div>
        <form className=" shadow-lg rounded px-6 pt-6 pb-8 mb-4">
          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label> */}
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label> */}
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder=" Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4 text-center">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
