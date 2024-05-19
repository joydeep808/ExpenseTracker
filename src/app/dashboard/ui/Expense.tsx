import Loading from "@/components/ui/Loading"
import React, { Suspense } from "react"
import type{ IExpense } from "../../Store"

interface expenseDetails{
  Expenses:IExpense
}



export const  ExpenseCard:React.FC<expenseDetails> = (props:expenseDetails)=>{
    const {description , createdAt , expenseCategory , expenseMoney , isMoneyRefundable , updatedAt , user , _id} = props.Expenses
return (
    <div className="container w-[350px] min-h-fit rounded-xl shadow-xl p-8 flex flex-col"> 
    <div className="border-b-2 border-dotted border-slate-300 pb-2">
        <div className="font-bold text-2xl">Expenses</div>
    </div>
    <Suspense fallback={<Loading/>}>
       <div className="flex flex-col gap-5 mt-6">
            <div className="flex justify-between">
                <b>Category</b>
                <span>{expenseCategory}</span>
            </div>
            <div className="flex justify-between">
                <b>Date</b>
                <span>{createdAt}</span>
            </div>
            <div className="flex justify-between">
                <b>Amount</b>
                <span>₹{expenseMoney}</span>
            </div>
            <div className="flex flex-col gap-2">
                <b>Description</b>
                <p className="text-justify">{description}</p>
            </div>
        </div> 
    </Suspense>
</div>
)
}