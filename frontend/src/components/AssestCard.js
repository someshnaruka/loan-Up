import React from "react";
import {BiRupee } from 'react-icons/bi';

function AssestCard({ post,onsheet }) {


    function handleclick(){

        onsheet(post._id);
    }
  return (
    <>
      <div className="w-full md:w-1/4 drop-shadow-lg mt-10 mx-6 p-2 rounded-xl bg-white flex flex-col justify-between items-start ">
        <div className="w-full bg-slate-100 flex flex-col rounded-xl justify-between p-6 gap-6 items-start">
          <h1 className="text-black text-xl w-full font-body border-b-[1px] border-b-slate-300 ">
            Company Name: {post.company_Name}
          </h1>
          <p className="text-xl font-body border-b-slate-300 w-full border-b-[1px]  text-black ">
            Establishment Year: {post.estdyear}
          </p>
          <p className="text-black text-xl border-b-slate-300 w-full border-b-[1px]  font-body  ">
            Accounting Provider: {post.provider}
          </p>
          <p className="text-xl font-body flex items-center  border-b-slate-300 w-full border-b-[1px]   text-black ">
          
            Loan Amount:<span><BiRupee size={20}></BiRupee></span> {post.loanAmount}
          </p>
        </div>
       <button onClick={handleclick} className="px-6 py-3 bg-green-600 rounded-xl text-white mt-4 w-full">View Balance Sheet</button>
      </div>
    </>
  );
}

export default AssestCard;
