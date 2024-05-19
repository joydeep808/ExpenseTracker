


"use server"

import { DBConnection } from "@/DB"
import { AuthCheck } from "../api/authCheck/authCheck"
import { ApiResponse, InternalServerError, UnauthorizedAccessResponse } from "@/Util/ApiResponse"
import { Expense } from "@/models/Expence"
import { auth } from "@/auth"
import { IExpense } from "@/app/Store"
import { TRegistrationResponse } from "@/types/index.types"

export async function getAllExpences ():Promise<TRegistrationResponse>{
  try {
  const User = await auth()
   if (!User) {
    await UnauthorizedAccessResponse()
   }
   await DBConnection()
  const allExpences = await Expense.find({user:User?.user.email}).sort("-1").limit(10)
  if (allExpences.length === 0) {
    return new ApiResponse(404 , "No Expence found", false ).response()
  }
  const refineObjects = JSON.parse(JSON.stringify(allExpences))
  return new ApiResponse(404 , "Expences found", true , refineObjects).response()

  }  catch (error) {
    return new ApiResponse(500 ,"We are facing some problems" ,false).response()
  
  }
}




export const getFilterExpense = async(FilterValue:string ):Promise<TRegistrationResponse>=>{
  try {
    const User = await auth()
     if (!User) {
     return await UnauthorizedAccessResponse()
     }
     await DBConnection()
     const FilteredExpenses = await Expense.find({$and:[{user:User.user.email} , {expenseCategory:FilterValue}]})
     if (!FilteredExpenses) return new ApiResponse(404 , `No Expense found realted ${FilterValue}` , false ).response()
      else return new ApiResponse(200 , "Expenses successfully done!" , true , FilteredExpenses).response()
  } catch (error) {
    if (error instanceof Error) return new ApiResponse(500 , error.message , false).response()
    else return new ApiResponse(500 , "We are facing server issue" , false).response()
  }
}