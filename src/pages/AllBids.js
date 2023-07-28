import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { BackendURI } from "../utils/BackendUrl";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AllBids = () => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();
  const Location = useLocation();
  useEffect(() => {
    return async () => {
      let role = localStorage.getItem("role");
      let url = `${BackendURI}/provider/getallbids/${Location.state.projectId}`;
      if (role === "jobProvider") {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          });
          console.log("All Bids Of A Specific Project:", response);
          setBids(response.data);
        } catch (error) {
          toast.error("Something went wrong!");
          console.log("Error:", error);
        }
      } else {
        toast.error("Sorry You cannot access this resource");
        console.log("Sorry You cannot access this resource");
      }
    };
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="flex  flex-col h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
       <div className="min-h-screen bg-lightblue mx-2 flex justify-center">
  <div className="w-full min-w-full ">
    <table className="table-auto bg-white shadow-md mt-12 w-full">
      <thead className="text-white bg-[#3fbfd8]">
        <tr>
          <th className="py-2 px-4">Seeker</th>
          <th className="py-2 px-4">Proposal</th>
          <th className="py-2 px-4">Amount</th>
          <th className="py-2 px-4">Status</th>
          <th className="py-2 px-4">Chat</th>
        </tr>
      </thead>
      <tbody>
        {bids.length === 0 ? (
          <tr>
            <td colSpan="5" className="py-2 px-4">
              No Bid Yet
            </td>
          </tr>
        ) : (
          bids.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4">
                {item.jobSeeker.firstName + " " + item.jobSeeker.lastName}
              </td>
              <td className="py-2 px-4">{item.proposal}</td>
              <td className="py-2 px-4">{item.amount}</td>
              <td>
                <select
                  className="mt-5"
                  onChange={async (e) => {
                    e.preventDefault();
                    console.log(item._id);
                    try {
                      const status = e.target.value;
                      const url = `${BackendURI}/provider/changebidstatus/${item._id}`;

                      const response = await axios.put(
                        url,
                        { status },
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "AuthToken"
                            )}`,
                          },
                        }
                      );

                      console.log(response);
                      toast.success("Status Updated Successfully");
                    } catch (error) {
                      toast.error("Something went wrong!");
                      console.log("Error:", error);
                    }
                  }}
                >
                  <option>Select</option>
                  <option value="Accepted">Accept</option>
                  <option value="Rejected">Reject</option>
                </select>
              </td>
              <td>
                <button
                  className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 my-3 mx-3 px-4 rounded"
                  onClick={() => {
                    navigate("/chat", {
                      state: {
                        id: item.jobSeeker._id,
                      },
                    });
                  }}
                >
                  Chat
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </>
  );
};

export default AllBids;
