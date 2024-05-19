"use client"

import { IExpense } from "@/app/Store"
import React from "react"

interface ShowExpensesProps {
  Expenses: IExpense[];
}
export const ShowExpenses:React.FC<ShowExpensesProps> = ({Expenses})=>{
  return (
    <>
    <div className='grid grid-cols-3 gap-8 rounded-md '>
{Expenses.length > 0 ? <>
  {Expenses.map((item , index)=>(
   <div key={index} className='border-red-600 border-2 py-14 px-8 text-center '>
        <h4>{item.expenseCategory}</h4>
        <p>{item.expenseMoney}</p>
        <p>{item.description}</p>

   </div>
  ))}

</>:"Add one expense "}
    </div>
    </>
  )
}