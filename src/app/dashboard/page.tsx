
"use client"
import { IExpense, useStore } from '@/app/Store'
import React, { useEffect, useState } from 'react'
import { getAllExpences } from './getAllExpences'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { updateExpense } from './Expense/ServerAction/UpdateExpense'
 function Page() {
  const {Expenses,alreadyFetched , changeAlreadyFetched, addExpenses} = useStore()
  const [isNotReadOnly , setIsNotReadOnly]  = useState<number | null>(null)
  const [changeValue , setChangeValue] = useState<number>()
  useEffect(()=>{
    if (alreadyFetched === true) return
    else {
      const fetchAllExpences = async()=>{
        const allExpences = await getAllExpences()
      console.log(allExpences)
        if (!allExpences || !allExpences.success )  {
          toast.error(allExpences?.message || "Something went wrong")
        }
        else{
          toast.success(allExpences.message)
          addExpenses(allExpences.data)
        }
      }
      fetchAllExpences()
      changeAlreadyFetched()
    }
  },[])

  const HandleUpdate = async(id:string)=>{
    const UpdateDetails = {
      expenseMoney:changeValue,
  expenseCategory:undefined,
  isMoneyRefundable:undefined,
  description:undefined
    }
    const Response = await updateExpense(id , UpdateDetails)
    if (!Response.success ) {
      toast.error(Response.message)
    }
    else {
      toast.success(Response.message)
    }
  }
  return (
    <div className='grid grid-cols-3 gap-8 rounded-md '>
{ Expenses.length > 0 ? <>
  {Expenses.map((item , index)=>(
   <div key={index} className='border-red-600 border-2 py-14 px-8 text-center '>
         <input type="radio" onClick={(e)=>{
          setIsNotReadOnly(index)
          setChangeValue(item.expenseMoney)
         }}/>Update
        <input type="number"  value={isNotReadOnly === index ?changeValue :item.expenseMoney} onChange={(e)=>setChangeValue(Number.parseInt(e.target.value))} readOnly={isNotReadOnly === index ? false :true}/>
        <button className={`${isNotReadOnly === index ? "":"hidden"}`} onClick={()=>HandleUpdate(item._id)}>Update now</button>
   </div>
  ))}

</>:"Loading..."}
  <Link href={"/dashboard/Expense"}>Add Expence</Link>
    </div>
  )
}

export default Page