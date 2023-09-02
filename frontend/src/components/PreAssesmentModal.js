import React from 'react'
import { useSelector } from 'react-redux'
import { BiRupee } from 'react-icons/bi';
function PreAssesmentModal({onclose}) {
    const data=useSelector((state)=>state.data.preAsses);
    
    const value=Number(data.loanAmount)*(data.preAssessment/100)
    console.log(data);
  return (
    <>
 <div className="w-full h-full fixed  top-0 bottom-0 left-0 right-0 z-40 cursor-pointer flex items-center justify-center   p-3 bg-[rgba(0,0,0,0.4)]" onClick={onclose}>
        <div className='md:w-1/2 bg-white rounded-lg p-8 w-full flex flex-col justify-center items-center gap-4'>
<h1 className='font-semibold font-body md:text-4xl text-2xl'>Congratulations..!!</h1>
<p className='font-display font-medium text-xl'>Your Pre Assessment Loan Approved value is:</p>
<div className='w-fuull flex items-end justify-center font-display font-medium text-xl'><BiRupee size={30}></BiRupee> <p className='font-display font-medium text-2xl'>{value}/-</p></div>

        </div>
      </div>
    </>
  )
}

export default PreAssesmentModal