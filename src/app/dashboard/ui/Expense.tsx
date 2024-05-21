import Loading from "@/components/ui/Loading"
import React, { Suspense } from "react"
import type{ IExpense } from "../../Store"
import { DeleteExpense } from "../Expense/ServerAction/DeleteExpense.ui"
import { DeleteExpenseFromDB } from "../DeleteExpenses"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"

interface expenseDetails{
  Expenses:IExpense
}



export const  ExpenseCard:React.FC<expenseDetails> = (props:expenseDetails)=>{
    const navigate = useRouter()
    const handleOnClick = async(id:string)=>{
      const Response =   await DeleteExpenseFromDB(id)
      if (!Response.success ) toast.error(Response.message)
    else {
        toast.success(Response.message)
    }
}
    const {createdAt , expenseCategory , expenseMoney , _id } = props.Expenses
return (
    <div className="container w-[350px] min-h-fit rounded-xl shadow-xl p-8 flex flex-col"> 
    <div className="border-b-2 border-dotted flex justify-between border-slate-300 pb-2">
        <div className="font-bold text-2xl">Expenses</div>
        <DeleteExpense onClick={()=>handleOnClick(_id)}/>
    </div>
    <Suspense fallback={<Loading/>}>
       <div className="flex flex-col gap-5 mt-6">
            <div className="flex justify-between">
                <b>Category</b>
                <span>{expenseCategory}</span>
            </div>
            <div className="flex justify-between">
                <b>Date</b>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
                <b>Amount</b>
                <span>₹{expenseMoney}</span>
            </div>
            {/* <div className="flex flex-col gap-2">
                <b>Description</b>
                <p className="text-justify">{description}</p>
            </div> */}
        </div> 
    </Suspense>
</div>
)
}