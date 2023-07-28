import React, { useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/register_bg.jpg";
import { BackendURI } from "../utils/BackendUrl";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit =async (e) => {
    e.preventDefault();
    // Check if passwords match and perform the password update logic here
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }
    else{
      const data = {
       password: newPassword,
       confirmpassword: confirmPassword,
      };
     
        if(localStorage.getItem("role")==="jobSeeker")
        {
          try {
            const response = await axios.put(`${BackendURI}/seeker/updatepassword`, data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
              },
            }
            );
            console.log(data);
            console.log("Signin response:", response);
            setConfirmPassword('');
            setNewPassword("");
            toast.success("Password Updated successfully");
           
            // navigate("/createprofile");
          } catch (error) {
            // toast.error(error.response.data.message);
            console.log("Error:", error);
          }

        }else{
          try {
            const response = await axios.put(`${BackendURI}/provider/updatepassword`, data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
              },
            }
            );
            console.log(data);
            console.log("Signin response:", response);
            setConfirmPassword('');
            setNewPassword("");
            toast.success("Password Updated successfully");
            // navigate("/createprofile");
          } catch (error) {
            // toast.error(error.response.data.message);
            console.log("Error:", error);
          }
        }
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" 
       style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <p className="text-3xl font-bold p-2">Account Settings</p>
        <div className="max-w-3xl mx-auto  ">
          <form
            onSubmit={handleSubmit}
            className=" shadow-md rounded px-4 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
