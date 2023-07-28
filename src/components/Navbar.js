import React, { useContext, useState } from "react";
import icon from "../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BiMessageDots } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

// import { InstanceContext } from "../context/InstanceContext";

const Navbar = () => {
  const navigate = useNavigate();

  // useContext
  //   const {settoken}=useContext(InstanceContext);
  // const navigate=useNavigate();
  // useState
  const [nav, setNav] = useState(false);
  // handle navbar
  const handleNav = () => {
    setNav(!nav);
  };
  const logout = () => {
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("role");
    toast.success("Logged Out");
    navigate("/");
  };
  return (
    <>
      <div className=" w-full md:h-auto lg:h-[55px] xl:h-auto  bg-gradient-to-tl bg-black ">
        <div className="w-full  flex  lg:flex-row md:flex-col  mx-auto px-4 justify-between  items-center h-full">
          <div className="mt-2">
            <Link to="/jobseaker">
              <img src={icon} className="h-8" />
            </Link>
            {/* <Link to="/messages">
              <img src={icon} className="h-8" />
            </Link> */}
          </div>
          <div className="hidden md:flex  ">
            <ul className="flex md:my-3 md:justify-evenly md:items-center md:flex-wrap text-white text-center ">
             {
              localStorage.getItem("role")==="jobSeeker"?
             
              <li className="px-3 inline-flex items-center text-sm cursor-pointer font-bold ">
                {/* <FaYinYang className="mx-1 text-xl" /> */}
                <Link to="/jobseaker"> Dashboard </Link>
              </li>:''
}
              {localStorage.getItem("role") === "jobSeeker" ? (
                ""
              ) : (
                <>
                <li className="px-3 inline-flex items-center text-sm cursor-pointer font-bold ">
                  {/* <BsDisplay className="mx-1 text-xl" /> */}
                  <Link to="/jobprovider">Project managment</Link>
                </li>
                  {/* <li className="px-3 inline-flex items-center text-sm cursor-pointer font-bold ">
                  <Link to="/payment">Payment</Link>
                </li> */}
                </>
              )}
                   {localStorage.getItem("role") === "jobSeeker" ? (
                ""
              ) : (
                <li className="px-3 inline-flex items-center text-sm cursor-pointer font-bold ">
                  {/* <BsDisplay className="mx-1 text-xl" /> */}
                  <Link to="/projects">Projects</Link>
                </li>
              )}
              {/* <li className="px-3 inline-flex items-center text-sm cursor-pointer font-bold ">
                
                Spin the Wheel 
              </li> */}
              {/* <li className="px-3 inline-flex items-center text-sm cursor-pointer font-bold ">
              <Link to='/mint'>  Mint </Link>
              </li> */}
            </ul>
          </div>
          <div className="inline-flex  ">
          

            <li className="hidden md:block  p-2 rounded-xl items-center font-semibold text-white cursor-pointer  mr-4 ">
              <Link to="/createprofile">
                <CgProfile className="h-8 w-8" />
              </Link>
            </li>

            <li className="hidden md:block text-white cursor-pointer p-2 rounded-xl items-center font-semibold hover:underline ">
              <Link to="/setting">
                <AiOutlineSetting className="h-8 w-8" />
              </Link>
            </li>
            <li
              className="hidden md:block text-white cursor-pointer p-2 rounded-xl items-center font-semibold hover:underline "
              onClick={logout}
            >
              <FiLogOut className="h-8 w-8" />
            </li>
          </div>
          <div onClick={handleNav} className="block md:hidden  ">
            {nav ? (
              <AiOutlineClose size={30} className="text-white  " />
            ) : (
              <AiOutlineMenu size={30} className=" text-white " />
            )}
          </div>
          {/* mobile view  */}
          <div
            className={
              nav
                ? "md:hidden  flex flex-col  left-1/4 inset-0 fixed    text-white  bg-[#2A2C2E] "
                : " hidden"
            }
          >
            <ul className="">
              <li className=" left-0 pt-4 px-4 flex justify-between  text-sm cursor-pointer ">
                <img src={icon} className="h-8" />

                {nav ? (
                  <AiOutlineClose
                    size={30}
                    className=" text-white  "
                    onClick={handleNav}
                  />
                ) : (
                  ""
                )}
              </li>
              <li className="bg-gray-300 mt-3 w-full h-[1px]"></li>
              <li className="px-4 pt-4  text-sm cursor-pointer ">
                {/* <FaYinYang className="w-4 inline-flex h-4 mr-1 " /> */}
                <Link to="/"> Projects</Link>
              </li>
              <li className="bg-gray-300 mt-3 w-full h-[1px]"></li>

              <li className="px-4 pt-4  text-sm cursor-pointer ">
                {/* <SiMarketo className="w-4 inline-flex h-4 mr-1" />  */}
                <Link to="/marketplace"> Earning</Link>
              </li>
              <li className="bg-gray-300 mt-3 w-full h-[1px]"></li>

              {/* <li className="px-4 pt-4  text-sm cursor-pointer bg-[#000000]">
              <button className="  bg-[#A51240] p-2 rounded-xl items-center font-semibold text-white cursor-pointer  mr-4 hover:bg-[#8f002d]">
              {" "}
              play now{" "}
            </button>
              </li> */}
              {/* <li className="bg-gray-300 mt-3 w-full h-[1px] "></li> */}
            </ul>
            <div className="  mt-auto bg-gray-300  w-full h-[1px]"></div>

            <div className="flex pb-4">
              <div className="bg-[#222326]  w-[70%] p-4 flex justify-center ">
                <button className="  bg-blue-600 p-4 rounded-xl items-center font-extrabold text-white cursor-pointer  mr-4 hover:bg-[#8f002d]">
                  <Link to="/register"> Sign up </Link>
                </button>
              </div>
              <div className="bg-[#2f2f33] w-[30%] flex justify-center pb-4">
                <button className="   p-4 rounded-xl items-center font-extrabold text-white cursor-pointer hover:underline mr-4 ">
                  {" "}
                  log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
