import React, { useEffect, useState } from "react";
import AssestCard from "../components/AssestCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { balanceRedux, preAssesRedux } from "../features/dataSlice";
import { RotatingLines } from "react-loader-spinner";
import BalanceSheet from "../components/BalanceSheet";
import PreAssesmentModal from "../components/PreAssesmentModal";
function Applications() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [userDetail, setUser] = useState({
    username: user.username,
  });
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showAsses,setAsses]=useState(false)
  const record = useSelector((state) => state.data.applications);
const [id,setID]=useState(null);
  
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_DOMAIN + "/applications")
      .then((response) => {
        if (response.data.alert) {
          const filter=response.data.result.filter((item)=>
            item.creator._id===user._id
        )
        
          dispatch(balanceRedux(filter));
          setLoading(false);
        }
      });
  }, [user.username]);

  function handleClick(id){
   
    setID(id);
    setShow(true);
  }
function handleSubmit(value){
   
axios.post(process.env.REACT_APP_SERVER_DOMAIN+ "/decision",value).then((response)=>{
    if(response.data.alert)
    {
        dispatch(preAssesRedux(response.data.result))
        setAsses(true)
    }
})
}


  return (
    <>
        {isLoading || user.username===null ? (
          <div className="w-full h-screen bg-white flex justify-center items-center ">
            <RotatingLines
              strokeColor="blue"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            ></RotatingLines>
          </div>
        ) : (
          <div className="bg-[#ECF2FF] h-full flex flex-col justify-between items-center p-6">
          <h1 className="text-3xl text-black pt-28 w-full text-left border-b-[1px] border-b-slate-400">All Applications</h1>
          <div className="w-full   flex justify-normal items-center gap-3 flex-wrap">
           
            {record.map((post) => {
              return (
                <AssestCard
                  post={post}
                  onsheet={handleClick}
                  
                ></AssestCard>
              );
            })}
          </div>
          </div>
        )}
{
show && <BalanceSheet
id={id}
onSubmit={handleSubmit}
onclose={()=>setShow(false)}></BalanceSheet>

}

{
    showAsses && <PreAssesmentModal
    onclose={()=>setAsses(false)}></PreAssesmentModal>
}

    
    </>
  );
}

export default Applications;
