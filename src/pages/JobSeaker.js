import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import icon from "../assets/icon.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackendURI } from "../utils/BackendUrl";
import Navbar from "../components/Navbar";
const JobSeaker = () => {
  const [jobs, setJobs] = useState([]);
  const [username, setUserName] = useState("");
  const [firstName,setFirst]=useState("");
  const [lastName,setLast]=useState("");
  const [email,setEmail]=useState("");

  const [search, setSearch] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const Search = async () => {
    console.log("search clicked")
    let url;
    let RegisteredRole = localStorage.getItem("role");
    // jobSeeker
 
      url = `${BackendURI}/seeker/searchProjects?searchQuery=${search}`;
      console.log(url);
      try {
        const response = await axios.get(`${BackendURI}/seeker/searchProjects?searchQuery=${search}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        });
        console.log("Search:", response);
        let newJob = jobs.filter((item) => {
          return item._id === response.data[0]._id;
        });
        setJobs(newJob);
      } catch (error) {
        toast.error("Something went wrong!");
        console.log("Error:", error);
      }
    
  };

  const Me = async () => {
    let url;
    switch (localStorage.getItem("role")) {
      case "jobSeeker":
        url = `${BackendURI}/seeker/getME`;
        break;
      case "jobProvider":
        url = `${BackendURI}/provider/getME`;
        break;
      // case "admin":
      //   url = `${BackendURI}/admin/login`;
      //   break;
      default:
        break;
    }
    console.log(url);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      console.log("ME:", response);
      setUserName(response.data.firstName + response.data.lastName);
      setPhoto(response.data.profilePic);
      setEmail(response.data.email);
      setFirst(response.data.firstName);
      setLast(response.data.lastName);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error:", error);
    }
  };

  // http://localhost:7000/profile-pictures

  useEffect(() => {
    return async () => {
      let url;
      switch (localStorage.getItem("role")) {
        case "jobSeeker":
          url = `${BackendURI}/seeker/getallProjects`;
          break;
        case "jobProvider":
          url = `${BackendURI}/provider/getallProjects`;
          break;

        default:
          break;
      }
      try {
        const response = await axios.get(
          `${BackendURI}/provider/getallProjects`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          }
        );
        console.log("Job Seaker Jobs:", response);
        setJobs(response.data);
        Me();
      } catch (error) {
        toast.error("Something went wrong!");
        console.log("Error:", error);
      }
    };
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col h-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex">
          {/* Left cards */}
          <div className="p-16 pr-0 w-[900px]">
            <div className="bg-[#009FFA] text-white rounded-lg max-w-xs shadow-lg p-6 mb-4">
              {photo ? (
                <div className="flex justify-center mx-auto items-center w-14 h-14 pb-2 rounded-full bg-slate-500">
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="flex justify-center mx-auto items-center w-14 h-14 pb-2 rounded-full bg-slate-500"></div>
              )}

              <div className="flex justify-center py-2">
                <p className="text-white font-semibold">{username}</p>
              </div>
            </div>
            <div className="bg-[#009FFA] text-white rounded-lg max-w-xs shadow-lg p-6 mb-4">
              <div className="flex justify-center py-2">
                <p className="font-semibold">
                  Email: <span>{email}</span>{" "}
                </p>
              </div>
            </div>
            {/* <div className="bg-[#009FFA] text-white rounded-lg max-w-xs shadow-lg p-6 mb-4">
              <div className="flex justify-center py-2">
                <p className="font-semibold">
                  Hours Worked <span>209</span>{" "}
                </p>
              </div>
            </div> */}
            <div className="bg-[#009FFA] text-white rounded-lg max-w-xs shadow-lg p-6 mb-4">
              <h2 className="text-black font-bold flex justify-center">
                User Detail
              </h2>
              <div className="flex justify-between py-2">
                <p className="font-semibold text-black text-sm">
                  First Name:
                </p>
                <p className="font-semibold text-black text-sm">
                  {firstName}
                </p>
              </div>
              <div className="flex justify-between py-2">
                <p className="font-semibold text-black text-sm">
                  Last Name:
                </p>
                <p className="font-semibold text-black text-sm">
                  {lastName}
                </p>
              </div>
              <div className="flex justify-between py-2">
                <p className="font-semibold text-black text-sm">
                  Email
                </p>
                <p className="font-semibold text-black text-sm">
                  {email}
                </p>
              </div>
            </div>
          </div>
          {/* Right cards */}
          <div className="pt-16 w-full ml-0 ">
            <div className="">
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-96"
              />
              <button
                onClick={Search}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg ml-2"
              >
                Search
              </button>
            </div>
            <div className="py-4 grid gap-6">
  {
  jobs !== undefined &&
    jobs.map((item) => {
      return (
        <div
          key={item.id}
          className="flex  mb-4 md:contents cursor-pointer"
          onClick={() => {
            if (localStorage.getItem('role') === 'jobSeeker') {
              navigate('/bidding', {
                state: {
                  id: item.provider,
                },
              });
            }
          }}
        >
          <div className="border-2 max-w-3xl w-full mr-auto bg-white border-[#3D2638] rounded-xl shadow-md">
            <div className="flex ">
              <div className="ma w-3/4 p-2">
                <h3 className="font-bold text-lg mb-1 text-[#3D2638]">
                  {item.title}
                </h3>
                <p className="leading-tight text-justify  overflow-hidden ">
                  {item.description}
                </p>
              </div>
              <div className="flex-col w-full bg-[#009FFA] p-2  flex justify-center rounded-md text-white">
                <div className="flex justify-between">
                  <p className="text-sm">Type</p>
                  <p className="text-center font-semibold text-sm">
                    {item.projectType}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Amount</p>
                  <p className="text-center font-semibold text-sm">
                    {item.price}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Time</p>
                  <p className="text-center font-semibold text-sm">
                    {item.deadline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
</div>


          </div>
        </div>
      </div>
    </>
  );
};

export default JobSeaker;
