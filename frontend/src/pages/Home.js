import React from 'react'
import loan from "../assests/loan.png"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
function Home() {


  const navigate=useNavigate();
  const data=useSelector((state)=>state.user);

  function handleLoan(){
if(data.username)

{
navigate("/loan");
}
else{
  toast("Sign In to continue")
}

  }
  return (
   <>
    <div className='w-full h-screen flex md:flex-row flex-col-reverse  gap-4 items-center justify-center bg-[#ECF2FF] '>
    <div className='md:w-1/2 w-full gap-6 mx-6 p-4 flex-col flex justify-between items-start'>
      <h1 className='font-body font-semibold md:text-6xl text-3xl  '>Business Loan made Easy</h1>
<p className='text-xl font-body font-base'>Out of the box benifits that fits your unique business.</p>
<div className='flex w-full items-center justify-start md:mt-10 mt-6'>
<button className='px-8 py-4 rounded-3xl  text-white bg-[#3E54AC] ' onClick={handleLoan}>Apply for Loan</button>
</div>
    </div>
     <img src={loan} className='mx-6'></img>
    </div>
   </>
  )
}

export default Home