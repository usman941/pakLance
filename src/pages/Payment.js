import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/register_bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BackendURI } from "../utils/BackendUrl";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Payment = () => {
  const [card_no, setCardNo] = useState("");
  const [amount, setAmount] = useState("");
  const [exp_month, setExp_month] = useState("");
  const [exp_year, setExp_year] = useState("");
  const [cvc, setCvc] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let url;
    let RegisteredRole = localStorage.getItem("role");

    if (
      !card_no ||
      !amount ||
      !cvc ||
      !exp_month ||
      !exp_year 
    ) {
      toast.error("Please fill  all fields!");
      return;
    } else {
        url = `${BackendURI}/admin/payment`;
        try {
          const response = await axios.post(url, {
            amount:amount,
            card_no:card_no,
            exp_month:exp_month,
            exp_year:exp_year,
            cvc:cvc
          } ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          });
          //   console.log(data);
          console.log("response of payment :", response);
          // Reset the form after submission
          toast.success(response.data.message);
        //   navigate("/projects");
        } catch (error) {
          toast.error(error.response?.data?.error);
          console.log("Error:", error);
        }
     
    }

  };

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full max-w-4xl">
          <div className="flex justify-center  py-4">
            <p className="text-3xl font-bold">Payment</p>
          </div>
          <form
            className=" shadow-lg rounded px-6 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
       <div className="mb-4">
  <label
    className="flex font-semibold text-gray-700 text-lg mb-2"
    htmlFor="firstName"
  >
    Card Number
  </label>
  <input
    className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    placeholder="Enter Card Number"
    value={card_no}
    onChange={(e) => {
      const input = e.target.value.replace(/\D/g, ''); 
      if (input.length <= 16) {
        setCardNo(input);
      }
    }}
  />
</div>

            <div className="mb-4">
              <label
                className=" flex  font-semibold text-gray-700  text-lg mb-2"
                htmlFor="firstName"
              >
                Amount
              </label>
              <input
                className="shadow appearance-none border  rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
            <div className="mb-4 w-52">
  <label className="flex font-semibold text-gray-700 text-lg mb-2">
    Expire Month
  </label>
  <input
    name="exp_month"
    value={exp_month}
    placeholder="Enter Expires Month"
    className="w-full p-2 rounded-md"
    onChange={(e) => {
      const input = e.target.value.replace(/\D/g, ''); 
      if (input <= 12 && input >0) {
        setExp_month(input);
      }
    }}
  />
</div>

<div className="mb-4 w-52">
  <label className="flex font-semibold text-gray-700 text-lg mb-2">
    Expire Year
  </label>
  <input
    name="exp_year"
    value={exp_year}
    className="w-full p-2 rounded-md"
    placeholder="Enter Expires Year"
    onChange={(e) => {
      const input = e.target.value.replace(/\D/g, ''); 
      setExp_year(input);
    }}
  />
</div>

<div className="mb-4 w-52">
  <label className="flex font-semibold text-gray-700 text-lg mb-2">
    CVC
  </label>
  <input
    name="cvc"
    value={cvc}
    placeholder="Enter CVC Number"
    className="w-full p-2 rounded-md"
    onChange={(e) => {
      const input = e.target.value.replace(/\D/g, ''); 
      if (input.length <= 3) {
        setCvc(input);
      }
    }}
  />
</div>

            </div>
          
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Pay Now
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

export default Payment;
