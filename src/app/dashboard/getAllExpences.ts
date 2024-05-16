


"use server"

import { DBConnection } from "@/DB"
import { AuthCheck } from "../api/authCheck/authCheck"
import { ApiResponse, InternalServerError, UnauthorizedAccessResponse } from "@/Util/ApiResponse"
import { Expense } from "@/models/Expence"
import { auth } from "@/auth"
import { IExpense } from "@/app/Store"

export async function getAllExpences (){
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
    console.log(error)
      await InternalServerError()
  }
}