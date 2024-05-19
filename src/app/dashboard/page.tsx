
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
import { Data } from './Expense/Data'
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
 
  useEffect(()=>{
    async function getSometing(){
      
      if (!filterValue  && !FilterChangeValue) return
    if (filterValue === FilterChangeValue) return
    if (filterValue !== FilterChangeValue && isFilter === true) {
      try {
        setIsFetched(false)

        const Response =await getFilterExpense(FilterChangeValue)
        console.log(Response)
        if (!Response.success)return toast.error(Response.message)
        else {
      toast.success(Response.message)
      await addFilterExpenses(Response.data)
      setIsFetched(true)
      }
      } catch (error) {
        toast.error("Error while fetching the filtered data")
      }
      finally{
      }
    }
    } 
    getSometing()
  }, [FilterChangeValue , isFilter ] )
  const HandleFilter = async()=>{
    setIsFilter(prev=>!prev)
  }
  return (
    <>
    <div className='flex gap-4'>
    <Button><Link href={"/dashboard/Expense"}>Add Expense</Link></Button>
    <Select onValueChange={(e)=>setFilterChangeValue(e)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    {Data.map((item , index)=>(
      <SelectItem key={index} value={item}>{item}</SelectItem>
    ))}
  </SelectContent>
</Select>
    </div>
    <Button onClick={HandleFilter}>{isFilter? "Clear Filter ":'Filter now '}</Button>
    {isFetched ? <>
      {isFilter ? <div className='ExpenseCard'>{FilterExpense.length === 0 ? <h1>You havn't add this category expenses</h1>:FilterExpense.map((item , index)=>(
        <ExpenseCard Expenses={item} key={index}/>
      ))}</div>: <div className='ExpenseCard'>{Expenses.length === 0?<h1>You havn't add any expense till now</h1> :Expenses.map((item , index)=>(
        <ExpenseCard Expenses={item} key={index}/>
      ))}</div>}
    </>:<div className='ExpenseCard'>{[1,2,3,4,5,6,7].map((item , index)=>(
       <Loading key={index}/> 
    ))}</div> }

   
    </>

  )
}

export default Page