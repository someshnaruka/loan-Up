import React from 'react'
import { BiRupee } from 'react-icons/bi';

function Sheet({data}) {


    const totalProfit=data.sheet.reduce((acc,obj)=>{
        return acc+Number(obj.profitOrLoss);
    },0);
    const totalAssest=data.sheet.reduce((acc,obj)=>{
        return acc+Number(obj.assetsValue);
    },0);
  
  return (
   <>
   <div className='w-full'>
     <table className='w-full rounded-lg border-1 overflow-hidden drop-shadow-lg'>
        <thead className='bg-[#3E54AC] text-white '>
<tr className=''>
    <th className='p-2'>Month</th>
    <th>Profit or Loss (Negative value for Loss)</th>
    <th>Assests value</th>

</tr>
        </thead>
        {
            data.sheet.map((post,index)=>{
                return(<tbody key={index} className='bg-white'>
<td className='text-center p-2 border-[1px] border-t-gray-500'>{post.month}</td>
<td className='text-center p-2 border-[1px] border-t-gray-500'>{post.profitOrLoss}</td>
<td className='text-center p-2 border-[1px] border-t-gray-500'>{post.assetsValue}</td>
        </tbody>)
            })
        }
        <td></td>
   <td className='text-center text-lg p-2 border-[1px] border-t-gray-500' >Total Profit : {totalProfit}</td>
   <td className='text-center text-lg p-2 border-[1px] border-t-gray-500'>Total Assest Value : {totalAssest}</td>    
   
    </table>
    </div>
   </>
  )
}

export default Sheet