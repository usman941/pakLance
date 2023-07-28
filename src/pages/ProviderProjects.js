import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { BackendURI } from "../utils/BackendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProviderProjects = () => {
  const [project, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    return async () => {
      try {
        const response = await axios.get(
          `${BackendURI}/provider/getSpecificProjects`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          }
        );
        console.log("Specific Provider's Job:", response.data);
        setProjects(response.data);
      } catch (error) {
        toast.error("Something went wrong!");
        console.log("Error:", error);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col h-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="min-h-screen bg-lightblue flex justify-center mx-auto">
          <div className="w-full min-w-full  p-2 overflow-x-auto">
            <table className="table-auto overflow-x-auto bg-white shadow-md mt-12">
              <thead className="bg-[#3fbfd8] text-white">
                <tr>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Type</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Deadline</th>
                  <th className="py-2 px-4">Bids</th>
                  <th className="py-2 px-4">Payment</th>

                  <th className="py-2 px-4">Update</th>
                  <th className="py-2 px-4">Delete</th>

                </tr>
              </thead>
              <tbody>
                {project.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4">{item.title}</td>
                    <td className="py-2 px-4">{item.description}</td>
                    <td className="py-2 px-4">{item.projectType}</td>
                    <td className="py-2 px-4">{item.price}</td>
                    <td className="py-2 px-4">{item.deadline}</td>
                    <td>
                      {" "}
                      <button
                        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 my-3 mx-2 px-4 rounded"
                        onClick={() => {
                          navigate("/bids", {
                            state: {
                              projectId: item.provider,
                            },
                          });
                        }}
                      >
                        ViewBids
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 my-3 mx-2 px-4 rounded"
                        onClick={() => {
                          navigate("/payment", {
                            state: {
                              projectId: item.provider,
                            },
                          });
                        }}
                      >
                        payment
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 my-3 mx-2 px-4 rounded"
                        onClick={() => {
                          navigate("/updateProject", {
                            state: {
                              projectId: item._id,
                            },
                          });
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 my-3 mx-2 px-4 rounded"
                        onClick={async () => {
                          try {
                            const response = await axios.delete(
                              `${BackendURI}/provider/deleteProject/${item._id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "AuthToken"
                                  )}`,
                                },
                              }
                            );
                            console.log("Deleting Project:", response);
                            const filteredArray = project.filter(
                              (project) => project._id !== item._id
                            );
                            setProjects(filteredArray);
                            toast.success("Project Deleted Successfully!");
                          } catch (error) {
                            toast.error("Something went wrong!");
                            console.log("Error:", error);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderProjects;
