import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie"
import axios from "axios";
import {useCookies} from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { logoutRedux } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate=useNavigate();
    const dispatch=useDispatch();
  const data = useSelector((state) => state.user);
  const [show,setShow]=useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();

  console.log(data);
  function handleLogin() {
    window.open(
      process.env.REACT_APP_SERVER_DOMAIN + "/auth/google",
      "_parent",
      "width=500,height=600"
    );
  }

  function handleLogut(){
    axios.get(process.env.REACT_APP_SERVER_DOMAIN + "/logout",{withCredentials: true}).then((response)=>{
        if(response.data.alert)
        {console.log("hello");
            toast(response.data.message);
            dispatch(logoutRedux());
            navigate("/")
        }
    })
  }
  return (
    <>
      <div className=" w-full h-20 bg-white drop-shadow-md flex z-30  fixed justify-between items-center   ">
      <div className="flex  w-1/2 justify-normal gap-8 items-center">
      <Link to="/">
        <p className="font-body font-semibold text-xl md:text-3xl mx-3 text-black p-2">
          Loan Up
        </p>
        </Link>
        {
          data.username &&
          <div className="flex justify-between gap-8"><p className="font-body text-xl font-medium cursor-pointer text-black hidden md:flex " onClick={()=>navigate("/")}>Home</p>
        <p className="font-body text-xl font-medium cursor-pointer text-black hidden md:flex " onClick={()=>navigate("/applications")}>All Assesments</p></div>
        }
        
        </div>
        {
            data.username ? <div className="flex justify-between items-center gap-3 p-2 mx-3">
            <button
            className="bg-[#3E54AC]  rounded-xl px-6 py-3 hidden md:flex text-white   item-center justify-between gap-2"
            onClick={()=>navigate("/loan")}
          >
            + New Application
          </button>
          <button
            className="bg-[#3E54AC]  rounded-xl px-6 py-3 hidden md:flex text-white   item-center justify-between gap-2"
            onClick={handleLogut}
          >
            Log Out
          </button>
         <div className="flex justify-between items-center gap-4 ">
          <p className="font-body  font-semibold text-lg hidden md:flex">
            {data.firstName.toUpperCase()} {data.lastName.toUpperCase()}
          </p>
          <div className="rounded-full w-14 h-14 overflow-hidden">
            <img src={data.profilePic} className="w-full bg-cover"></img>
          </div>
          </div>
          <GiHamburgerMenu className="md:hidden flex cursor-pointer" size={30} onClick={()=>setShow(!show)}></GiHamburgerMenu>
        </div> : <div className="flex justify-between items-center gap-3 p-2 mx-3">
          <button
            className="bg-black rounded-xl px-6 py-3 text-white flex item-center justify-between gap-2"
            onClick={handleLogin}
          >
            <FcGoogle size={22}></FcGoogle> Sign In
          </button>
        </div>
        }


    {/* mobile navigation */}
{
    show && <div className="w-48 md:hidden h-screen fixed z-50 top-0 right-0 flex flex-col items-start gap-4 p-3 bg-white">
    <div className="w-full flex justify-start items-center"><AiOutlineClose size={25} onClick={()=>setShow(!show)}></AiOutlineClose></div>
    <p className="font-body font-semibold text-lg flex border-b-[1px] border-b-black w-full">
            {data.firstName.toUpperCase()} {data.lastName.toUpperCase()}
          </p>
          <p className="font-body text-xl font-medium cursor-pointer text-black flex " onClick={()=>{navigate("/");setShow(!show);}}>Home</p>
        <p className="font-body text-xl font-medium cursor-pointer text-black flex " onClick={()=>{navigate("/applications");setShow(!show)}}>All Assesments</p>
        
          <button
            className="font-body text-sm font-medium cursor-pointer bg-[#3E54AC] rounded-xl px-6 py-3 text-white w-full"
            onClick={()=>{navigate("/loan");setShow(!show)}}
          >
            + New Application
          </button>
          
          <button
            className="font-body text-sm font-medium cursor-pointer bg-[#3E54AC] rounded-xl px-6 py-3 text-white w-full  "
            onClick={()=>{handleLogut();setShow(!show)}}
          >
            Log Out
          </button>
    </div>
}

      </div>
    </>
  );
}

export default Navbar;
