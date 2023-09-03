import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRedux } from "../features/dataSlice";




function Modal(props) {
    const tableData=useSelector((state)=>state.data.dataValue)
    const dispatch=useDispatch();

    const [value,setValue]=useState( tableData[0] || {  
        // month:"",
        profitOrLoss:0,
        assetsValue:0
    })

    function handleSubmit(e){
e.preventDefault();
dispatch(editRedux(value));
props.close();

    }

    function handleChange(e){
        const {name,value}=e.target;

        setValue((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        });
    }

  return (
    <div className="w-full h-full  fixed top-0 bottom-0 left-0 right-0      z-40 cursor-pointer flex items-center justify-center  rounded-lg p-3 bg-[rgba(0,0,0,0.4)]">
      <form className="md:w-1/4 flex flex-col justify-between gap-2 bg-hero_Blue p-8 rounded-xl items-start ">
        <label>Month</label>
        <input type="text" className="w-full p-1 rounded-md " value={value.month} readOnly></input>
        <label>Profit or Loss (Negative value for Loss)</label>
        <input type="number" name="profitOrLoss" required value={value.profitOrLoss} onChange={handleChange} className="w-full p-1 rounded-md "></input>
        <label>Assests Value</label>
        <input type="number"  required min="0" oninput="validity.valid||(value='');" name="assetsValue" value={value.assetsValue} onChange={handleChange} className="w-full p-1 rounded-md "></input>
        <div className="flex gap-6 mt-6 w-full ">
        <button className="px-6 py-3 text-white bg-[#3E54AC] rounded-lg" onClick={(e)=>{handleSubmit(e)}}>
            Submit
          </button>
        <div className="px-6 py-3  text-white bg-red-600 rounded-lg" onClick={props.close}>
            Cancel
          </div>
        </div>
      </form>
   
    </div>
  );
}

export default Modal;
