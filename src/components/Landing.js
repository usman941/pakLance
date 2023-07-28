import React, { useState } from "react";
import backgroundImage from "../assets/landing-bg.jpg"
import icon from  "../assets/icon.png"
import tag from "../assets/landing_text.png"
import right from "../assets/landing-right.png"

import { Link, useNavigate } from "react-router-dom";
const Landing = () => {
const navigate=useNavigate();
  return (
    <div className="  h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="flex justify-between py-12 px-4">
       
        <img src={icon}/>
        <div className="flex w-48 justify-evenly">
        <div className="">
           
           <button className="xl:bg-[#00CDFC] lg:bg-[#00CDFC] md:bg-[#00CDFC]  bg-black text-sm mx-1   lg:p-2 xl:p-2 md:p-2 p-1 text-white rounded-full" onClick={()=>(navigate('/registeras',{
              state:{
                As:"login"
              }
            }))}>
            Sign In
           </button>
          
        </div>
        <div className="">
            {/* <Link to='/registeras'> */}
        <button className="xl:bg-[#00CDFC] lg:bg-[#00CDFC] md:bg-[#00CDFC]  bg-black text-sm    lg:p-2 xl:p-2 md:p-2 p-1 text-white rounded-full" onClick={()=>(navigate('/registeras',{
              state:{
                As:"register"
              }
            }))}>
            Sign Up
           </button>
           {/* </Link> */}
        </div>
        </div>
    </div>
    <div className=" px-4 ">
        <img src={tag} className=""/>
        <div className=" lg:flex md:flex xl:flex sm:flex  justify-between">
            <div className="flex justify-between w-[350px] lg:pt-28 xl:pt-28 md:pt-28 pt-6">
                {/* 1st box */}
                <div className="flex items-center justify-center w-[103px] h-[103px] rounded-full bg-[#4ed1ee] shadow-lg text-white">
<div>
    <h2 className="text-lg font-extrabold text-center">2.5k+</h2>
    <p className="text-black text-sm">Freelancers</p>
</div>
                </div>
                {/* 2nd box*/}
                <div className="flex items-center justify-center w-[103px] h-[103px] rounded-full bg-[#4ed1ee] shadow-lg text-white">
<div>
    <h2 className="text-lg font-extrabold text-center">100%</h2>
    <p className="text-black text-sm">Easy Process</p>
</div>
                </div>
                {/* 3rd box */}
                <div className="flex items-center justify-center w-[103px] h-[103px] rounded-full bg-[#4ed1ee] shadow-lg text-white">
<div>
    <h2 className="text-lg font-extrabold text-center">10k+</h2>
    <p className="text-black text-sm">Projects</p>
</div>
                </div>
            </div>
        <div className="flex justify-end h-[295px] ">
        <img src={right}/>
        </div>
        </div>

    </div>
    {/* <div className="flex  justify-end h-[70%]">
    </div> */}
        
     
    
    </div>
  );
};

export default Landing;
