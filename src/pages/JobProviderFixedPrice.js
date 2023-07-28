import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/register_bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BackendURI } from "../utils/BackendUrl";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const JobProviderFixedPrice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [projectType, setProjectType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let url;
    let RegisteredRole = localStorage.getItem("role");

    if (
      !title ||
      !description ||
      !price ||
      !deadline ||
      !projectType ||
      !picture
    ) {
      toast.error("Please fill  all fields!");
      return;
    } else {
      if (RegisteredRole === "jobProvider") {
        console.log("hiiiii");
        url = `${BackendURI}/provider/createProject`;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("deadline", deadline);
        formData.append("projectType", projectType);
        formData.append("picture", picture);

        try {
          const response = await axios.post(url, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          });
          //   console.log(data);
          console.log("Job Creation:", response);
          // Reset the form after submission
          setTitle("");
          setDeadline("");
          setPrice("");
          setPicture(null);
          setProjectType("");
          setDescription("");
          console.log("Job Creation:", response);
          toast.success("Job Created Successfully");
          navigate("/projects");
        } catch (error) {
          toast.error(error.response?.data?.error);
          console.log("Error:", error);
        }
      } else {
        toast.error("Sorry u cannot access this resource");
        console.log("Sorry u cannot access this resource");
      }
    }

    // switch (RegisteredRole) {
    //   case "jobSeeker":
    //     url = `${BackendURI}/seeker/createProfile`;
    //     break;
    //   case "jobProvider":
    //     url = `${BackendURI}/provider/createProfile`;
    //     break;
    //   // case "admin":
    //   //   url = `${BackendURI}/admin/login`;
    //   //   break;
    //   default:
    //     break;
    // }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center h-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full max-w-4xl">
          <div className="flex   py-4">
            <p className="text-3xl font-bold">Post a fixed project</p>
          </div>
          <form
            className=" shadow-lg rounded px-6 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className=" flex  font-semibold text-gray-700  text-lg mb-2"
                htmlFor="firstName"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border  rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className=" flex  font-semibold text-gray-700  text-lg mb-2"
                htmlFor="firstName"
              >
                Description:
              </label>
              <textarea
                className="shadow appearance-none border  rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="w3review"
                rows="5"
                cols="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-between">
              <div className="mb-4 w-52">
                <label className=" flex  font-semibold text-gray-700  text-lg mb-2">
                  Project Type:
                </label>
                <select
                  name="projectType"
                  className="w-full p-2 rounded-md"
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option value="Fixed Price Contract">
                    Fixed Price Contract
                  </option>
                  <option value="Hourly Project">Hourly Project</option>
                </select>
              </div>
              <div className="mb-6 w-auto">
                <label className=" flex justify-center font-semibold text-gray-700  text-lg mb-2">
                  Project Price ($)
                </label>
                <input
                  className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder=""
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4 w-52">
                <label className=" flex  font-semibold text-gray-700  text-lg mb-2">
                  Deadline
                </label>
                <select
                  name="deadline"
                  className="w-full p-2 rounded-md"
                  onChange={(e) => setDeadline(e.target.value)}
                >
                  <option value="1">1 day</option>
                  <option value="5">5 day</option>
                  <option value="10">10 day</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label
                className=" flex  font-semibold text-gray-700  text-lg mb-2"
                htmlFor="firstName"
              >
                Additional Project
              </label>
              <input
                className="shadow appearance-none border  rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                onChange={(e) => setPicture(e.target.files[0])}
                placeholder="Enter Title"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
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

export default JobProviderFixedPrice;
