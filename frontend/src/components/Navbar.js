import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie"
import axios from "axios";
import {useCookies} from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { loginRedux, logoutRedux } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebase";
function Navbar() {
  const navigate=useNavigate();
    const dispatch=useDispatch();
  const data = useSelector((state) => state.user);
  const [show,setShow]=useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  console.log(data);

  
  function handleLogin() {
   
    signInWithPopup(auth, provider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const token = await auth.currentUser.getIdToken(true);
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        window.localStorage.setItem("auth","true");
        localStorage.setItem("token",token);
        const data=true;
        const headers = {
          withCredentials: true,
          headers: { 'Authorization': 'Bearer ' + token }
        };
        axios.post((process.env.REACT_APP_SERVER_DOMAIN+"/login"),data,headers).then((response)=>{
        console.log(response);
        if(response.data.alert)
        {
          toast(response.data.message)
          dispatch(loginRedux(response.data.result))
          
        }
        else{
          toast(response.data.message)
          localStorage.removeItem("token");
        }
      })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  function handleLogut(){
    localStorage.removeItem("token")
    toast("Logged Out Successfully");
    dispatch(logoutRedux());
    navigate("/")
};
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
            {data.name}
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
            {data.name}
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
