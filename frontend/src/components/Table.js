import React, { useState } from 'react'

import { BsFillPencilFill } from "react-icons/bs";
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { dataRedux } from '../features/dataSlice';

function Table({post}) {

    const [edit,setEdit]=useState(false);
const dispatch=useDispatch();
const tableData=useSelector((state)=>state.data.table)
    const [editIndex,setEditindex]=useState([]);
    console.log(editIndex,"edit value");
    if(edit==false)
    {
        document.body.style.overflow = 'unset';
    }
    const [table,setTable]=useState([
       
    ])

    function handleEdit(value)
    {
        setEdit(true); 
        document.body.style.overflow = 'hidden';
        dispatch(dataRedux(value))
    }
  return (
   <>
   <div className='w-full '>
    <table className='w-full rounded-lg border-1 overflow-hidden drop-shadow-lg'>
        <thead className='bg-[#3E54AC] text-white '>
<tr className=''>
    <th className='p-2'>Month</th>
    <th>Profit or Loss (Negative value for Loss)</th>
    <th>Assests value</th>
    <th>Action</th>
</tr>
        </thead>
        {
            tableData.map((post,index)=>{
                return(<tbody key={index} className='bg-white'>
<td className='text-center p-2 border-[1px] border-t-gray-500'>{post.month}</td>
<td className='text-center p-2 border-[1px] border-t-gray-500'>{post.profitOrLoss}</td>
<td className='text-center p-2 border-[1px] border-t-gray-500'>{post.assetsValue}</td>
<td className='border-[1px] border-t-gray-500'><span><BsFillPencilFill onClick={()=>{handleEdit(post)}} className='mx-auto cursor-pointer'></BsFillPencilFill></span></td>
        </tbody>)
            })
        }
        
    </table>

    {
        edit && <Modal
        close={()=>setEdit(false)}></Modal>
    }
   
    </div>
   </>
  )
}

export default Table