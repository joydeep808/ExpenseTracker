
"use client"
import { IExpense, TExpenseCategoryDetails, useStore } from '@/app/Store'
import React, { useEffect, useState } from 'react'
import { getAllExpences, getFilterExpense } from './getAllExpences'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { updateExpense } from './Expense/ServerAction/UpdateExpense'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TExpense } from '@/models/Expence'
import { Button } from '@/components/ui/button'
import { ShowExpenses } from './ui'
import { ExpenseCard } from './ui/Expense'
import Loading from '@/components/ui/Loading'
 function Page() {
  const {Expenses,alreadyFetched , changeAlreadyFetched, addExpenses , addCategoryDetails ,addTotalCategoryItem , totalCategoryItem,  categoryDetails , FilterExpense , addFilterExpenses} = useStore()
  const [isFilter , setIsFilter] = useState(false)
  const [isFetched , setIsFetched] = useState(false)
  const [filterValue , setFilterValue]  = useState("")

  const [FilterChangeValue , setFilterChangeValue] = useState("")
  useEffect(()=>{
   try {
     if (alreadyFetched === true) return;
     else {
       const fetchAllExpences = async()=>{
         const allExpences = await getAllExpences()
         if (!allExpences || !allExpences.success )  {
           toast.error(allExpences?.message || "Something went wrong")
         }
         else{
           toast.success(allExpences.message)
           addExpenses(allExpences.data)
          await addTotalCategoryItem(allExpences.data.length)
           const arr:TExpenseCategoryDetails[] = []
           allExpences.data.map((item:TExpense)=>{
           const foundCategory =   arr.find(e=>e.expenseCategory === item.expenseCategory)
           if (foundCategory === undefined) {
             arr.push({addedCategory:1 , expenseCategory:item.expenseCategory})
           }
           else {
             foundCategory.addedCategory +=1
           }
             
           })
         await addCategoryDetails(arr)
         setIsFetched(true)
         }
       }
       fetchAllExpences()
       changeAlreadyFetched()
     }
   } catch (error) {
    
   }
   finally{
   }
  },[])
  // i have to add useEffect for this
  // and the logic will be whenerver the value changes or 
  // const [isFilter , setIsFilter] = useState(false)
  // const [isFetched , setIsFetched] = useState(false)
  // const [filterValue , setFilterValue]  = useState("")

  // const [FilterChangeValue , setFilterChangeValue] = useState("")
  useEffect(()=>{
    async function getSometing(){
      
      if (!filterValue  && !FilterChangeValue) return
    if (filterValue === FilterChangeValue) return
    if (filterValue !== FilterChangeValue) {
      try {
        setIsFetched(false)

        const Response =await getFilterExpense(FilterChangeValue)
        console.log(Response)
        if (!Response.success)return toast.error(Response.message)
        else {
      toast.success(Response.message)
      await addFilterExpenses(Response.data)
      }
      } catch (error) {
        toast.error("Error while fetching the filtered data")
      }
      finally{
        setIsFetched(false)
      }
    }
    } 
    getSometing()
  }, [FilterChangeValue])





  const HandleFilter = async()=>{
    setIsFilter(prev=>!prev)
  }
  return (
    <>
    <Button><Link href={"/dashboard/Expense"}>Add Expense</Link></Button>
    <Select onValueChange={(e)=>setFilterChangeValue(e)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Food & Dining">Food & Dining</SelectItem>
    <SelectItem value="Health & Medical">Health & Medical</SelectItem>
    <SelectItem value="Investments">Investments</SelectItem>
  </SelectContent>
</Select>
    <Button onClick={HandleFilter}>click me to filter</Button>
    {isFetched ? <div className='ExpenseCard'>
      {Expenses.map((item , index)=>(
        <ExpenseCard Expenses={item} key={index}/>
      ))}
    </div>: <Loading/>  }

   
    </>

  )
}

export default Page