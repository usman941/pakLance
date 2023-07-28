import React, { useState } from "react";
import { useEffect } from "react";
import backgroundImage from "../assets/register_bg.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BackendURI } from "../utils/BackendUrl";
import Navbar from "../components/Navbar";

const CreateProfile = () => {
  const navigate = useNavigate();
  // Profile:
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  // Photo:
  const [photo, setPhoto] = useState(null);
  // Schooling:
  const [done, setDone] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [brief, setBrief] = useState("");
  // Graduation:
  const [doneGraduation, setDoneGraduation] = useState("");
  const [universityName, setUniverityName] = useState("");
  const [briefGraduation, setBrifGraduation] = useState("");
  const [degree, setDegree] = useState("");
  // Experience
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [taskBrief, setTaskBrief] = useState("");

  const [experiences, setExperiences] = useState([]);
  const ExportCV=async()=>{
    if(localStorage.getItem("role")==="jobProvider")
    {
      toast.error("You have Not allowed to export")
      return
    }
    const response = await axios.get(`${BackendURI}/seeker/cvGenerate`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
      },

    });
    console.log("Response",response);
  }

  const gteProfile= async()=>{
    if(localStorage.getItem('role')==="jobSeeker")
    {
      
      try {
        const response = await axios.get(`${BackendURI}/seeker/displayProfile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        });
        console.log("Profile:", response);
        setName(response.data.profile.name);
        setAge(response.data.profile.age);
        setAbout(response.data.profile.about);
        setAddress(response.data.profile.address);
        setPhoto(response.data.profile.profilePic);
        setDone(response.data.profile.education.schooling[0].yearDone);
        setSchoolName(response.data.profile.education.schooling[0].schoolName);
        setBrief(response.data.profile.education.schooling[0].brief);

        setDoneGraduation(
          response.data.profile.education.graduation[0].yearDone
        );
        setUniverityName(
          response.data.profile.education.graduation[0].universityName
        );
        setBrifGraduation(response.data.profile.education.graduation[0].brief);
        setDegree(response.data.profile.education.graduation[0].degree);

        setCompanyName(response.data.profile.experience[0].companyName);
        setPosition(response.data.profile.experience[0].position);
        setTimeFrame(response.data.profile.experience[0].timeframe);
        setTaskBrief(response.data.profile.experience[0].brief);
      } catch (error) {
        toast.warn(error.response?.data?.message);
        console.log("Error:", error);
      }
    }
    else
    {
      try {
        const response = await axios.get(`${BackendURI}/provider/displayProfile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        });
        console.log("Profile:", response);
        setName(response.data.profile.name);
        setAge(response.data.profile.age);
        setAbout(response.data.profile.about);
        setAddress(response.data.profile.address);
        setPhoto(response.data.profile.profilePic);
        setDone(response.data.profile.education.schooling[0].yearDone);
        setSchoolName(response.data.profile.education.schooling[0].schoolName);
        setBrief(response.data.profile.education.schooling[0].brief);

        setDoneGraduation(
          response.data.profile.education.graduation[0].yearDone
        );
        setUniverityName(
          response.data.profile.education.graduation[0].universityName
        );
        setBrifGraduation(response.data.profile.education.graduation[0].brief);
        setDegree(response.data.profile.education.graduation[0].degree);

        setCompanyName(response.data.profile.experience[0].companyName);
        setPosition(response.data.profile.experience[0].position);
        setTimeFrame(response.data.profile.experience[0].timeframe);
        setTaskBrief(response.data.profile.experience[0].brief);
      } catch (error) {
        toast.warn(error.response?.data?.message);
        console.log("Error:", error);
      }
    }
  }
  useEffect(() => {
    gteProfile();
  }, []);

  const addExperience = () => {
    const newExperience = {
      companyName: companyName,
      position: position,
      timeFrame: timeFrame,
      taskBrief: taskBrief,
    };
    setExperiences([...experiences, newExperience]);
    setCompanyName("");
    setPosition("");
    setTimeFrame("");
    setTaskBrief("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleUploadClick = () => {
    // Open the file upload dialog when the upload button is clicked
    document.getElementById("photo-upload").click();
  };

  const handleDoneChange = (e) => {
    setDone(e.target.value);
  };

  const handleSchoolNameChange = (e) => {
    setSchoolName(e.target.value);
  };

  const handleBriefChange = (e) => {
    setBrief(e.target.value);
  };

  const UploadPic = async (event) => {
    event.preventDefault();

    let url;
    let RegisteredRole = localStorage.getItem("role");

    switch (RegisteredRole) {
      case "jobSeeker":
        url = `${BackendURI}/seeker/upload-profile-picture`;
        break;
      case "jobProvider":
        url = `${BackendURI}/provider/upload-profile-picture`;
        break;
      // case "admin":
      //   url = `${BackendURI}/admin/login`;
      //   break;
      default:
        break;
    }

    const formData = new FormData();
    formData.append("profilePic", photo);

    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      console.log("ProfilePic:", response);
      toast.success("Photo Updated Successfully");
      gteProfile();

    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hitt");
    if (!name || !address || !age || !about) {
      toast.warn("Please fill in all fields!");
      return;
    }

    const data = {
      name,
      address,
      age,
      about,
      role:localStorage.getItem('role'),
      schooling: [
        {
          yearDone: done,
          schoolName: schoolName,
          brief: brief,
        },
      ],
      graduation: [
        {
          yearDone: doneGraduation,
          universityName: universityName,
          degree: degree,
          brief: briefGraduation,
        },
      ],
      experience: [
        {
          companyName: companyName,
          position: position,
          timeframe: timeFrame,
          brief: taskBrief,
        },
      ],
    };

    if(localStorage.getItem("role")=== "jobSeeker")
    {
   
    try {
      const response = await axios.post(`${BackendURI}/seeker/createProfile`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      console.log(data);
      console.log("Profile:", response);
      // Reset the form after submission
      setName("");
      setAddress("");
      setAge("");
      setAbout("");
      setPhoto(null);
      toast.success("Profile Created Successfully");
      gteProfile();
      navigate('/jobseaker');
    } catch (error) {
      toast.warn(error.response?.data?.message);
      console.log("Error:", error);
    }

    }
    if(localStorage.getItem("role")=== "jobProvider") 
    {
    try {
      const response = await axios.post(`${BackendURI}/provider/createProfile`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      console.log(data);
      console.log("Profile:", response);
      // Reset the form after submission
      setName("");
      setAddress("");
      setAge("");
      setAbout("");
      setPhoto(null);
      toast.success("Profile Created Successfully");
      gteProfile();
    } catch (error) {
      toast.warn(error.response?.data?.message);
      console.log("Error:", error);
    }
    }



   

 
  };

  const SaveProfile = async (event) => {
    event.preventDefault();
    const data = {
      name,
      address,
      age,
      about,
      schooling: [
        {
          yearDone: done,
          schoolName: schoolName,
          brief: brief,
        },
      ],
      graduation: [
        {
          yearDone: doneGraduation,
          universityName: universityName,
          degree: degree,
          brief: briefGraduation,
        },
      ],
      experience: [
        {
          companyName: companyName,
          position: position,
          timeframe: timeFrame,
          brief: taskBrief,
        },
      ],
    };
    if(localStorage.getItem("role")=== "jobSeeker")
    {
      try {
        const response = await axios.put(`${BackendURI}/seeker/updateProfile`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        });
        console.log(data);
        console.log("Update Profile:", response);
        setName("");
        setAddress("");
        setAge("");
        setAbout("");
        setPhoto(null);
        toast.success("Profile Created Successfully");
        gteProfile();
      } catch (error) {
        toast.warn("Something went wrong!");
        console.log("Error:", error);
      }
    }else{
      try {
        const response = await axios.put(`${BackendURI}/provider/updateProfile`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        });
        console.log(data);
        console.log("Update Profile:", response);
        setName("");
        setAddress("");
        setAge("");
        setAbout("");
        setPhoto(null);
        toast.success("Profile Created Successfully");
        gteProfile();
      } catch (error) {
        toast.warn("Something went wrong!");
        console.log("Error:", error);
      }
    }
 
  };
  return (
    <>
    <Navbar/>
    <div
      className="flex-col items-center justify-center h-auto  pb-10 "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" w-full p-8  rounded shadow lg:flex xl:flex md:flex">
        <div className="w-full flex justify-center items-center flex-col ">
          <div className="relative w-64 h-64 mb-4">
            {
            photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full"></div>
            )}
            <button
              type="button"
              className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
              onClick={handleUploadClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zm2 7a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm6-5H8a2 2 0 0 0-1.995 1.85L6 7v2h8V7a2 2 0 0 0-1.85-1.995L12 5zm-4-3a3 3 0 0 1 2.824 2H14a3 3 0 0 1 2.995 2.824L17 7v6a3 3 0 0 1-2.824 2.995L14 16H6a3 3 0 0 1-2.995-2.824L3 13V7a3 3 0 0 1 2.824-2.995L6 4h2zm0 2H8a1 1 0 0 0-.993.883L7 7v2h6V7a1 1 0 0 0-.883-.993L12 6zm0 2a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <p className="text-gray-500 text-sm pb-2">
            Click to upload a profile photo
          </p>
          <div className="w-1/2">
            <button
              className="bg-[#168ccf] text-white hover:bg-[#1a87c5] text-lg font-semibold text-whi rounded-full  p-2 w-full"
              onClick={UploadPic}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="w-full">
          <h1 className=" mb-4 text-black font-bold text-3xl">
            Create Your Profile
          </h1>
          {/* <form onSubmit={handleSubmit}> */}
            <div className="mb-4">
              {/* <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label> */}
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={handleNameChange}
                className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              {/* <label htmlFor="address" className="block font-medium mb-1">
                Address
              </label> */}
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                value={address}
                onChange={handleAddressChange}
                className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              {/* <label htmlFor="age" className="block font-medium mb-1">
                Age
              </label> */}
              <input
                type="number"
                id="age"
                placeholder="Enter Age"
                value={age}
                onChange={handleAgeChange}
                className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              {/* <label htmlFor="about" className="block font-medium mb-1">
                About Us
              </label> */}
              <textarea
                id="about"
                placeholder="Write Your About Section"
                rows={6}
                value={about}
                onChange={handleAboutChange}
                className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
            </div>
          
          {/* </form> */}
        </div>
      </div>
      {/* Education module */}
      <div className="flex justify-center pb-2">
        <p className="text-2xl font-bold text-black ">Enter Education </p>
      </div>
      {/* schooling */}
      <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4  flex-col  ">
        <div className="border rounded-lg border-gray-300 p-4 w-full max-w-8xl mx-auto">
          <p className="p-2 font-semibold text-lg">Schooling:</p>
          <div className="flex flex-col md:flex-row">
            <div className="mb-2 md:mr-2 md:mb-0">
              <input
                placeholder="Enter year done"
                type="text"
                value={done}
                onChange={handleDoneChange}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
            <div className="mb-2 md:mr-2 md:mb-0">
              <input
                placeholder="Enter your school name"
                type="text"
                value={schoolName}
                onChange={handleSchoolNameChange}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Enter a short brief"
                type="text"
                value={brief}
                onChange={handleBriefChange}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
          </div>
        </div>
        {/* graduation */}
        <div className="border rounded-lg border-gray-300 p-4 w-full max-w-8xl mx-auto mt-4">
          <p className="p-2 font-semibold text-lg">Graduation:</p>
          <div className="flex flex-col md:flex-row">
            <div className="mb-2 md:mr-2 md:mb-0">
              <input
                placeholder="Enter year done"
                type="text"
                value={doneGraduation}
                onChange={(e) => setDoneGraduation(e.target.value)}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
            <div className="mb-2 md:mr-2 md:mb-0">
              <input
                placeholder="Enter your University name"
                type="text"
                value={universityName}
                onChange={(e) => setUniverityName(e.target.value)}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Enter Degree"
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
          </div>
          <div className="w-full py-2">
            <input
              placeholder="Enter a short brief"
              type="text"
              value={briefGraduation}
              onChange={(e) => setBrifGraduation(e.target.value)}
              className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-2">
        <p className="text-2xl font-bold text-black ">Enter Experience </p>
      </div>
      {/* Experiencw */}
      <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4  flex-col  ">
        <div className="border rounded-lg border-gray-300 p-4 w-full max-w-8xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="mb-2 md:mr-2 md:mb-0">
              <input
                placeholder="Company Name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
            <div className="mb-2 md:mr-2 md:mb-0">
              <input
                placeholder="Position"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Enter a short brief"
                type="text"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
              />
            </div>
          </div>
          <div className="w-full py-2">
            <input
              placeholder="Task Brief"
              type="text"
              value={taskBrief}
              onChange={(e) => setTaskBrief(e.target.value)}
              className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
            />
          </div>
        </div>
        <div className="flex justify-center  border rounded-lg border-gray-300 p-4 w-full max-w-8xl mx-auto">
          <div className="flex justify-between w-1/2 ">
            {
              localStorage.getItem("role")==="jobSeeker"?
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              onClick={ExportCV}
            >
              Export CV
            </button>
            :""
}  
{
  name? ''    

            :<button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
          >
            Create Profile
          </button>

}
{
  name?

            <button
              type="submit"
              onClick={SaveProfile}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Update Profile
            </button>:''
}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Link to="/bankDetail">
              Next
              </Link>
            </button>
          </div>
        </div>
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4  flex-col"
          >
            <div className="border rounded-lg border-gray-300 p-4 w-full max-w-8xl mx-auto">
              <div className="flex flex-col md:flex-row">
                <div className="mb-2 md:mr-2 md:mb-0">
                  <input
                    placeholder="Company Name"
                    type="text"
                    value={experience.companyName}
                    className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                    readOnly
                  />
                </div>
                <div className="mb-2 md:mr-2 md:mb-0">
                  <input
                    placeholder="Position"
                    type="text"
                    value={experience.position}
                    className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <input
                    placeholder="Enter a short brief"
                    type="text"
                    value={experience.timeFrame}
                    className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full py-2">
                <input
                  placeholder="Task Brief"
                  type="text"
                  value={experience.taskBrief}
                  className="border-gray-300 bg-[#00D5FD] text-white rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CreateProfile;
