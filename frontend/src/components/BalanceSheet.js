import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "./Table";
import Sheet from "./Sheet";
function BalanceSheet({ id, onclose ,onSubmit}) {
  const data = useSelector((state) => state.data.applications);
  const filterdata = data.filter((post) => post._id === id);

  console.log(filterdata);

  return (
    <>
      <div className="w-full  h-full fixed overflow-y-scroll  top-0 bottom-0 left-0 right-0 z-40 cursor-pointer flex items-start justify-center   p-3 bg-[rgba(0,0,0,0.4)]" onClick={onclose}>
        <div className=" md:w-1/2 w-full bg-hero_Blue rounded-lg p-4 gap-6 flex flex-col justify-between items-center">
          <h1 className="font-bold text-3xl font-body ">Balance Sheet</h1>
          <p>Financial year-{filterdata[0].sheet[0].year}</p>
          <div className="w-full flex justify-between border-b-[1px] border-b-slate-300">
            <h1 className="text-xl  font-body font-semibold  ">
              Company - {filterdata[0].company_Name}
            </h1>
            <p>Estd. Year - {filterdata[0].estdyear}</p>
          </div>
          <div className="w-full">
<Sheet
data={filterdata[0]}></Sheet>
          </div>
          <div className="w-full flex gap-4 justify-end items-center">
          <button className="px-6 text-lg py-3 bg-[#3E54AC] text-white rounded-xl " onClick={(e)=>{e.preventDefault();onSubmit(filterdata[0])}}>Calculate Loan Value</button>
                  <button className="px-6 text-lg py-3 bg-red-600 text-white rounded-xl " onClick={onclose}> Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BalanceSheet;
