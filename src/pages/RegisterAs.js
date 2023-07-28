import React, { useState } from "react";
import backgroundImage from "../assets/register_bg.jpg"
import icon from  "../assets/icon.png"
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RegisterAs = () => {
  const Location=useLocation();
const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex justify-center py-2">
        <img src={icon}/>
      </div>
      <div className="flex justify-center">
        {
          Location.state.As==="register"?
          <p className="text-black text-xl font-semibold">You want to register as a:</p>    

          :
        <p className="text-black text-xl font-semibold">You want to Login as a:</p>    

        }
            </div>
            {
              Location.state.As==="register"?
            
      <div className=" lg:flex md:flex xl:flex sm:flex items-center justify-between w-full  max-w-lg ">
       {/* <div className="  justify-between items-center w-96"> */}
        <div className="flex py-6" >
            <div className="w-[180px] h-[150px] rounded-xl bg-[#1d90d3] cursor-pointer hover:bg-[#1778af] text-center flex flex-col justify-center items-center text-xl font-bold text-white" onClick={()=>(navigate('/register',{
              state:{
                role:"jobSeeker"
              }
            }))} >
                Job
                <p>
                    Seeker
                </p>
            </div>
        </div>
        <div className="flex py-6">
            <div className="w-[180px] h-[150px] rounded-xl bg-[#1d90d3] cursor-pointer hover:bg-[#1778af] text-center flex flex-col justify-center items-center text-xl font-bold text-white" onClick={()=>(navigate('/register',{
              state:{
                role:"jobProvider"
              }
            }))}>
                Job
                <p>
                    Provider
                </p>
            </div>
        </div>
        {/* </div> */}
      </div>
      :
       <div className=" lg:flex md:flex xl:flex sm:flex items-center justify-between w-full  max-w-lg ">
       {/* <div className="  justify-between items-center w-96"> */}
        <div className="flex py-6" >
            <div className="w-[180px] h-[150px] rounded-xl bg-[#1d90d3] cursor-pointer hover:bg-[#1778af] text-center flex flex-col justify-center items-center text-xl font-bold text-white" onClick={()=>(navigate('/seekerlogin'))} >
                Job
                <p>
                    Seeker
                </p>
            </div>
        </div>
        <div className="flex py-6">
            <div className="w-[180px] h-[150px] rounded-xl bg-[#1d90d3] cursor-pointer hover:bg-[#1778af] text-center flex flex-col justify-center items-center text-xl font-bold text-white" onClick={()=>(navigate('/login'))}>
                Job
                <p>
                    Provider
                </p>
            </div>
        </div>
        {/* </div> */}
      </div>
}
    </div>
  );
};

export default RegisterAs;
