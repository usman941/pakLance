import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/register_bg.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import { BackendURI } from "../utils/BackendUrl";

const Bidding = () => {
  const [proposal, setProposal] = useState("");
  const [projectPrice, setProjectPrice] = useState("");
  const Location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState();

  useEffect(() => {
    setId(Location.state.id);
  }, [Location.state]);
  const handleSubmit = async () => {

    let Role = localStorage.getItem("role");
    console.log(Location.state.id);
    if (Role!== "jobProvider") {
      // let url = `${BackendURI}/seeker/createBid`;
      await axios
        .post(
          `${BackendURI}/seeker/createBid`,
          {
            projectId: Location.state.id,
            proposal: proposal,
            amount: projectPrice,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          }
        )
        .then((res) => {
          console.log("Bidding", res?.data);
          toast.success("Bid Placed Successfully");
          navigate("/jobseaker");

        })
        .catch((err) => {
          console.log("SomeThing Went Wrong");
          console.log(err);
          toast.error(err.response.data.error)
        });
    } else {
      console.log("Sorry You are not allowed to Access this Resource");
      toast.error("Sorry You are not allowed to Access this Resource");
    }
  };
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full max-w-5xl">
          <div className="flex   py-4">
            <p className="text-3xl font-bold">Bidding</p>
          </div>
          <form className=" shadow-lg rounded px-6 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className=" flex  font-semibold text-gray-700  text-lg mb-2"
                htmlFor="firstName"
              >
                Proposal:
              </label>
              <textarea
                className="shadow appearance-none border  rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="w3review"
                rows="5"
                cols="5"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-between">
              <div className="mb-6 w-auto">
                <label className=" flex  font-semibold text-gray-700  text-lg mb-2">
                  Amount ($)
                </label>
                <input
                  className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder=""
                  value={projectPrice}
                  onChange={(e) => setProjectPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 w-1/3 mx-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-blue-500 w-1/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  navigate("/chat", {
                    state: {
                      id: id,
                    },
                  });
                }}
              >
                Chat
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

export default Bidding;
