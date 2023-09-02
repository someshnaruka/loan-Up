import React from 'react'
import Sheet from './Sheet';
import { useSelector } from 'react-redux';

function LoanBalanceSheet({onSubmit,onclose}) {

    const filterdata=useSelector((state)=>state.data.ViewBalance)
    console.log(filterdata);
  return (
    <>
        <div className="w-full  h-full fixed overflow-y-scroll  top-0 bottom-0 left-0 right-0 z-40 cursor-pointer flex items-start justify-center   p-3 bg-[rgba(0,0,0,0.4)]" onClick={onclose}>
        <div className=" md:w-1/2 w-full bg-hero_Blue rounded-lg p-4 gap-6 flex flex-col justify-between items-center">
          <h1 className="font-bold text-3xl font-body ">Balance Sheet</h1>
          <p>Financial year-{filterdata.sheet[0].year}</p>
          <div className="w-full flex justify-between border-b-[1px] border-b-slate-300">
            <h1 className="text-xl  font-body font-semibold  ">
              Company - {filterdata.company_Name}
            </h1>
            <p>Estd. Year - {filterdata.estdyear}</p>
          </div>
          <div className="w-full">
<Sheet
data={filterdata}></Sheet>
          </div>
          <div className="w-full flex gap-4 justify-end items-center">
          <button className="px-6 text-lg py-3 bg-[#3E54AC] text-white rounded-xl " onClick={(e)=>{e.preventDefault();onSubmit(filterdata)}}>Calculate Loan value</button>
                  <button className="px-6 text-lg py-3 bg-red-600 text-white rounded-xl " onClick={onclose}> Close</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoanBalanceSheet