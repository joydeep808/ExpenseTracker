"use server"

import { ApiResponse } from "@/Util/ApiResponse"
import { auth } from "@/auth"
import { Expense } from "@/models/Expence"
import { User } from "@/models/User"

type UpdateDetails = {
  expenseMoney?:number
  expenseCategory?:string
  isMoneyRefundable?:boolean
  description?:string
}

export const updateExpense =async(id:string , UpdateDetails:UpdateDetails)=>{
 try {
   const Userauth = await auth()
   if (!Userauth || !Userauth.user.email)  return new ApiResponse(401 , "Unauthorized access" , false).response()
   
   const isUserValid = await Expense.findById(id)
   if (!isUserValid) return new ApiResponse(404 , "Expense not found", false).response()
   if (isUserValid.user !== Userauth.user.email) return new ApiResponse(401 , "Expense not found but you are not authorize " , false).response()
   UpdateDetails.expenseMoney && (isUserValid.expenseMoney = UpdateDetails.expenseMoney)
   UpdateDetails.description && (isUserValid.description = UpdateDetails.description)
   UpdateDetails.expenseCategory && (isUserValid.expenseCategory = UpdateDetails.expenseCategory)
   UpdateDetails.isMoneyRefundable && (isUserValid.isMoneyRefundable = UpdateDetails.isMoneyRefundable)
   await isUserValid.save({validateBeforeSave:false})
   return new ApiResponse(200 , "Details update successfully done!" , true).response()
   
 } catch (error) {
  if (error instanceof Error)  return new ApiResponse(500 , error.message , false).response()
  return new ApiResponse(500 , "server issue " , false).response()

 }
  
} 