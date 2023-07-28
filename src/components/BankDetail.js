import React, { useState } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import icon from "../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { BackendURI } from "../utils/BackendUrl";
import Navbar from "./Navbar";
const BankDetail = () => {
  const [holderName, setHolderName] = useState("");
  const navigate=useNavigate();
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVV] = useState("");

  const handleRegister = async () => {
    let url;
    let RegisteredRole = localStorage.getItem("role");

    if (!holderName || !expiry || !cardNo || !cvc) {
      toast.error("Please fill in all fields!");
      return;
    }

    switch (RegisteredRole) {
      case "jobSeeker":
        url = `${BackendURI}/seeker/addbankDetails`;
        break;
      case "jobProvider":
        url = `${BackendURI}/provider/addbankDetails`;
        break;
      default:
        // url = `${BackendURI}/admin/register`;
        break;
    }

    const data = {
      cardHolderName: holderName,
      expiryDate: expiry,
      cardNumber: cardNo,
      cvc: cvc,
    };

    try {

      const response = await axios.post(url, data,
         {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      }
      );
      console.log("Bank Details:", response);

      setCardNo("");
      setHolderName("");
      setExpiry("");
      setCVV("");
      toast.success("Bank Details Added Successfully");
      // navigate("/jobseaker");

    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error:", error);
    }
  };

  return (
    <>
    <Navbar/>
     <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-2xl">
        <div className="flex  justify-center py-4">
          <p className="text-3xl font-bold">Bank Details</p>
        </div>
        <form className=" shadow-lg rounded px-6 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className=" flex justify-center font-semibold text-gray-700  text-lg mb-2"
              htmlFor="firstName"
            >
              Card Holder Name:
            </label>
            <input
              className="shadow appearance-none border text-center rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Enter Name"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className=" flex justify-center font-semibold text-gray-700  text-lg mb-2"
              htmlFor="firstName"
            >
              Card Number:
            </label>
            <input
              className="shadow appearance-none border text-center rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Enter Card Number"
              value={cardNo}
              onChange={(e) => setCardNo(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-4 w-auto">
              <label
                className=" flex justify-center font-semibold text-gray-700  text-lg mb-2"
                htmlFor="firstName"
              >
                Expiry Date:
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="date"
                placeholder=""
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <div className="mb-6 w-auto">
              <label
                className=" flex justify-center font-semibold text-gray-700  text-lg mb-2"
                htmlFor="firstName"
              >
                CSV/CVV:
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="number"
                placeholder=" ..."
                value={cvc}
                onChange={(e) => setCVV(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
            >
              Save
            </button>
          </div>
          {/* <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
            <Link to='/login'>
                Sign In
                </Link>
            </p>
          </div> */}
        </form>
      </div>
    </div>
    </>
   
  );
};

export default BankDetail;
