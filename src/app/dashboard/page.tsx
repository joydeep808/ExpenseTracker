
"use client"
import { TExpenseCategoryDetails, useStore } from '@/app/Store'
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
import { Data } from './Expense/Data'
import { useRouter } from "next/navigation"


 function Page() {
  const Navigate = useRouter()
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
           const FoundExpenses =await JSON.parse(allExpences.data)
          addExpenses(FoundExpenses)
          addTotalCategoryItem(FoundExpenses.length)
           const arr:TExpenseCategoryDetails[] = []
          await FoundExpenses.map((item:TExpense)=>{
           const foundCategory =   arr.find(e=>e.expenseCategory === item.expenseCategory)
           if (foundCategory === undefined) {
             arr.push({addedCategory:1 , expenseCategory:item.expenseCategory})
           }
           else {
             foundCategory.addedCategory +=1
           }
             
           })
          changeAlreadyFetched(true)
        addCategoryDetails(arr)
         }
       }
       fetchAllExpences()
     }
   } catch (error) {

    
   }
   finally{

   }
  },[])
 
  useEffect(()=>{
    async function getSometing(){
      
      if (!filterValue  && !FilterChangeValue) return
    if (filterValue === FilterChangeValue) return
    if (filterValue !== FilterChangeValue && isFilter === true) {
      try {
        changeAlreadyFetched(false)

        const Response =await getFilterExpense(FilterChangeValue)
        if (!Response.success)return toast.error(Response.message)
        else {
      toast.success(Response.message)
      await addFilterExpenses(Response.data)
      changeAlreadyFetched(true)

      setIsFetched(true)

      }
      } catch (error) {
        toast.error("Error while fetching the filtered data")
      }
      finally{
      changeAlreadyFetched(true)

      }
    }
    } 
    getSometing()
  }, [FilterChangeValue , isFilter ])
  const HandleFilter = async()=>{
    setIsFilter(prev=>!prev)
  }
  return (
    <>
    <div className='flex gap-4'>
    <Button><Link href={"/dashboard/Expense"}>Add Expense</Link></Button>
    <Select onValueChange={(e)=>setFilterChangeValue(e)} defaultValue='Food & Dining'>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Category" defaultValue={"Food & Dining"} />
  </SelectTrigger>
  <SelectContent>
    {Data.map((item , index)=>(
      <SelectItem key={index} value={item}>{item}</SelectItem>
    ))}
  </SelectContent>
</Select>
    <Button onClick={HandleFilter}>{isFilter? "Clear Filter ":'Filter now '}</Button>
    </div>
    {alreadyFetched ? <>
      {isFilter ? 
      <div className='ExpenseCard'>{FilterExpense.length === 0 ? <h1>Expense not added in this category</h1>:FilterExpense.map((item , index)=>(
        <ExpenseCard Expenses={item} key={index}/>
      ))}</div>
      :
      <div className='ExpenseCard'>
        {Expenses.length === 0 ?
         <h1>No expense found please add one</h1> 
         :
         Expenses.map((item , index)=>(
        <ExpenseCard Expenses={item} key={index}/>
      ))}</div>}
    </>
    :
    <>{Expenses.length === 0 ? <h1>Please add an expense</h1>:<div className='ExpenseCard'>{[1,2,3,4,5,6,7].map((_ , index)=>(
      <Loading key={index}/> 
   ))}</div>}  </> }

   
    </>

  )
}

export default Page