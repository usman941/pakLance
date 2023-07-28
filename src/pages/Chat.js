import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/register_bg.jpg";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { BackendURI } from "../utils/BackendUrl";
import { useLocation } from "react-router-dom";
import { BiVideo } from "react-icons/bi";

const Chat = () => {
  const [message, setMessage] = useState();
  const [id, setId] = useState("");
  const [you, setYou] = useState("");
  const [chats, setChats] = useState();
  const [user, setUser] = useState("");
  const Location = useLocation();

  useEffect(() => {
    const interval = setInterval(getMessage, 2000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setId(Location.state.id);
    console.log(Location.state.id);
  }, [Location.state]);

  useEffect(() => {
    return async () => {
      let url;
      switch (localStorage.getItem("role")) {
        case "jobSeeker":
          url = `${BackendURI}/seeker/getME`;
          break;
        case "jobProvider":
          url = `${BackendURI}/provider/getME`;
          break;
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
        setYou(response.data._id);
      } catch (error) {
        toast.error("Something went wrong!");
        console.log("Error:", error);
      }
    };
  }, []);

  const getMessage = async () => {
    let url = `${BackendURI}/chat/getMessageByProvider`;
    try {
      const response = await axios.post(
        url,
        { receiverId: Location.state.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        }
      );
      console.log("Messages:", response);
      setChats(response.data);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error:", error);
    }
  };

  const VideoCall = () => {
    const domain = "meet.jit.si";
    const roomName = "your-room-name";
    const parentNode = document.querySelector("#jitsi-meet-container");
    const interfaceConfigOverwrite = {
      SHOW_JITSI_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
    };

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      const api = new window.JitsiMeetExternalAPI(domain, {
        roomName,
        parentNode,
        interfaceConfigOverwrite,
      });
    };

    // Check if the parent node exists before appending the script
    if (parentNode) {
      document.body.appendChild(script);
    } else {
      console.error(
        'Element with ID "jitsi-meet-container" not found in the DOM'
      );
    }

    return () => {
      if (parentNode) {
        document.body.removeChild(script);
      }
    };
  };

  const SendMessage = async () => {
    let url = `${BackendURI}/chat/sendMessage`;
    let RegisteredRole = localStorage.getItem("role");

    if (!message) {
      toast.error("Please Enter A Message!");
      return;
    }

    const data = {
      receiverId: Location.state.id,
      content: message,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      console.log("Message:", response);
      // toast.success("Message Sent Successfully");
      setMessage("");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col   h-screen bg-cover bg-center bg-no-repeat">
        <div className=" border-gray-300 border-solid p-2 border-2 ">
          <p className="text-3xl font-bold p-4">Lets do some chat</p>
          <p className="border-b-2 border-gray-300 py-2"></p>
          <div className="flex-col p-2">
            {chats &&
              chats.map((item) => {
                return (
                  <>
                    <p className="text-lg font-bold ">
                      {you === item.senderId._id
                        ? "You"
                        : item.senderId.firstName}
                    </p>
                    <p className="px-16 bg-[#02B7FA] rounded-full w-auto text-white py-2">
                      {item.content}
                    </p>
                  </>
                );
              })}
            {/* Sender name */}
            {/* <p className="text-lg font-bold ">Usman Ghani:</p> */}
            {/* mesage */}
            {/* <p className="px-16 bg-[#02B7FA] rounded-full w-auto text-white py-2">
              hi how are you? It is dangerous to purchase lorazepam on the
              Internet or outside the United States. The sale and distribution
              of medicines outside the U.S. does not comply with safe-use
              regulations of the Food and Drug Administration (FDA). These
              medications may contain dangerous ingredients, or may not be
              distributed by a licensed pharmacy.
            </p> */}
            {/* Receiver */}
            {/* <p className="text-lg font-bold ">You:</p>
            <p className="px-16 bg-[#02B7FA] rounded-full w-auto text-white py-2 mb-2">
              I am fine !!!
            </p>
            <p className="px-16 bg-[#02B7FA] rounded-full w-auto text-white py-2">
              What about you?
            </p> */}

            <div className="flex-auto">
              <input
                type="text"
                id="name"
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200 mt-5"
              />
              <button
                className="bg-[#02B7FA] p-2 rounded-lg mt-3 text-white"
                onClick={SendMessage}
              >
                SEND
              </button>
              <button
                className="bg-[#02B7FA] p-2 rounded-lg mt-3 ml-2 text-white"
                onClick={VideoCall}
              >
                CALL
              </button>
              <div
                id="jitsi-meet-container"
                style={{ width: "100%", height: "500px" }}
              ></div>
              {/* <BiVideo
                onClick={VideoCall}
                className="bg-[#02B7FA] p-2 rounded-lg mt-3 text-white"
              /> */}
            </div>

            {/* Sender name */}
            {/* <p className="text-lg font-bold ">Usman Ghani:</p>
            <p className="px-16 bg-[#02B7FA] rounded-full w-auto text-white py-2">
              hi how are you?
            </p>
            <div className="flex-col justify-evenly">
              <p className="text-lg font-bold ">You:</p>
              <p className="px-16 bg-[#02B7FA] rounded-full w-auto text-white py-2 mb-2">
                I am fine !!!
              </p>
              <p className="px-16 bg-[#02B7FA] rounded-full w-auto text-white py-2">
                What about you?
              </p> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
