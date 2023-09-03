import React, { useState } from "react";
import Table from "../components/Table";
import { ViewRedux, balanceRedux, preAssesRedux, resetRedux } from "../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { FcUndo } from "react-icons/fc";
import axios from "axios";
import toast from 'react-hot-toast';
import BalanceSheet from "../components/BalanceSheet";
import PreAssesmentModal from "../components/PreAssesmentModal";
import LoanBalanceSheet from "../components/LoanBalanceSheet";
import { RotatingLines } from "react-loader-spinner";
function Loan() {
  const Tabledata=useSelector((state)=>state.data.table);
  const user=useSelector((state)=>state.user)
  const date = new Date().getFullYear() - 1;
  const [show, setShow] = useState(false);
const dispatch=useDispatch();
  const [detail,setDetail]=useState({
    name:"",
    estdyear:"",
    provider:"",
    loanAmount:null,
  })

const [sheet,setSheet]=useState(false);
const [showBalance,setBalance]=useState(false)
const [submitting,setSubmitting]=useState(false)
const [showAsses,setAsses]=useState(false)
function handleChange(e){
const {name,value}=e.target;

setDetail((prev)=>{
  return{
    ...prev,
    [name]:value
  }
})
}



function handledataSubmit(e){
e.preventDefault();
setSubmitting(true);
const recordId=Math.floor(100000000 + Math.random() * 900000000);

var wasNull = false;
var isNegative=false;

for(var i in Tabledata) {
  if(Tabledata[i]. profitOrLoss == 0 || Tabledata[i].assetsValue == 0) wasNull = true;
  if(Number(Tabledata[i].assetsValue)<0)
  {
    isNegative=true;
  }
}

if(detail.loanAmount<0)
{
  toast("Enter Postive Loan Amount");
  return;
}
if(detail.loanAmount<100000)
{
  toast("Minimum Loan Amount: 100000");
  return;
}
if(isNegative)
{
  toast("Enter Postive Assests Value");
  return;
}

if(wasNull===false && detail.estdyear && detail.name && detail.loanAmount && detail.provider)
{
  const sendData={
    id:user._id,
    recordId:recordId,
    ...detail,
    record:Tabledata,
  }
  
  
  axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/loanRecord",sendData).then((response)=>{
  if(response.data.alert)
  {
    toast(response.data.message);
    dispatch(ViewRedux(response.data.result));
    setSubmitting(false);
    setBalance(true);
    dispatch(resetRedux());
    setDetail({
      name:"",
    estdyear:"",
    provider:"",
    loanAmount:"",
    })
  }
  })
}

else{
  toast("Fill All Details")
}
}
function handleSubmit(value){
 
axios.post(process.env.REACT_APP_SERVER_DOMAIN+ "/decision",value).then((response)=>{
  if(response.data.alert)
  {
      dispatch(preAssesRedux(response.data.result))
      setAsses(true);
  }
}).catch((err)=>{
  console.log(err);
})
}



  return (
    <>
    {
      user.username===null ? <div className="w-full h-screen bg-white flex justify-center items-center ">
            <RotatingLines
              strokeColor="blue"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            ></RotatingLines></div>:<div className="flex flex-col w-full h-full  justify-between items-center md:p-6 bg-[#ECF2FF] gap-6 p-4">
        <div className="flex flex-col w-full mt-24">
          {" "}
          <h1 className="text-center w-full text-black md:text-4xl text-2xl font-body ">Pre-Assesment Loan Calculator</h1>
          <h1 className="text-black md:text-4xl text-xl mt-6 w-full font-body">
            Business Details
          </h1>
          <hr className="border-1 border-gray-400 w-full"></hr>
        </div>

        <div className="flex md:w-3/4 w-full flex-col  justify-between items-start bg-slate-400 rounded-lg p-4   gap-6">
        <div className="flex w-full flex-col md:flex-row md:gap-24 gap-6">
          <div className="flex justify-between items-center gap-2 w-full">
            <label className="text-xl w-1/2">Company Name:</label>
            <input
              type="text"
              name="name"
              value={detail.name}
              onChange={handleChange}
              className="p-1 rounded-md md:w-1/2 w-3/4 "
              required
            ></input>
          </div>
          <div className="flex justify-between flex-row items-start gap-2 w-full">
            <label className="text-xl w-1/2">Estd. Year:</label>
            <input
              type="text"
              name="estdyear"
              value={detail.estdyear}
              onChange={handleChange}
              className="p-1 rounded-md w-3/4 md:w-1/2"
              required
            ></input>
          </div>
          </div>
          <div className="w-full flex flex-col justify-between md:flex-row md:gap-24 gap-6">
          <div className="flex justify-between flex-row items-start gap-2 w-full">
            <label className="text-xl w-1/2">Accounting provider:</label>
            <select className="p-1 rounded-md md:w-1/2 w-3/4" name="provider" value={detail.provider}  onChange={handleChange}>
            <option className="hidden">Select Provider</option>
              <option>Xero</option>
              <option>MYOB</option>
            </select>
          </div>
          <div className="flex justify-between flex-row  items-start gap-2 w-full">
            <label className="text-xl w-1/2">Loan Amount:</label>
            <input
              type="number"
              name="loanAmount"
              value={detail.loanAmount}
              onChange={handleChange}
              placeholder="Min. Value: 100000"
              className="p-1 rounded-md md:w-1/2 w-3/4 "
              required
            ></input>
          </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          {" "}
          <h2 className="text-black text-2xl font-body">
          Last Fiscal Year Record:
          </h2>
          <p className="text-xl font-body font-medium">Year:{date}</p>
        </div>
        <div className="w-full items-start flex">
          {" "}
          <button
            className="px-6 py-3 bg-[#3E54AC] text-white rounded-xl "
            onClick={() => setShow(!show)}
          >
            {show ? <span>Close</span> : <span>Enter Record</span>}
          </button>
        </div>

        {show && (
          <div className="w-full flex  flex-col bg-hero_Blue p-1">
         
                <Table></Table>
                <div className="w-full flex mt-4 justify-end gap-6 items-center">
                {
                  showBalance && <button className="px-6 text-lg py-3 bg-green-600 text-white rounded-xl " onClick={()=>{setSheet(true)}}>Balance Sheet</button>
                }
                  <button className="px-6 text-lg py-3 bg-[#3E54AC] text-white rounded-xl " onClick={handledataSubmit}>{submitting?<span>Submitting...</span>:<span>Submit</span>}</button>
                  <button className="px-6 text-lg py-3 bg-red-600 text-white rounded-xl " onClick={()=>{dispatch(resetRedux());setBalance(false); setDetail({
      name:"",
    estdyear:"",
    provider:"",
    loanAmount:"",
    })}}> Reset</button>
                </div>
               
         
          </div>
        )}
        {
          sheet && <LoanBalanceSheet
          onSubmit={handleSubmit}
onclose={()=>setSheet(false)}></LoanBalanceSheet>
        }

        {
    showAsses && <PreAssesmentModal
    onclose={()=>{setAsses(false);setBalance(false);}}></PreAssesmentModal>
}
      </div>
    }
      
    </>
  );
}

export default Loan;
