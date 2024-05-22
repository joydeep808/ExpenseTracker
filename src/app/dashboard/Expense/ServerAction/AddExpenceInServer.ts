

"use server"

import { DBConnection } from "@/DB";
import { ApiResponse } from "@/Util/ApiResponse";
import { auth } from "@/auth";
import { RedisClient, RedisHandler } from "@/helpers/Ratelimit";
import { Expense } from "@/models/Expence";
import { ZExpenseSchema } from "@/schemas/Expence.Schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
export async function addExpence (data:z.infer<typeof ZExpenseSchema>){
  const Checkuser  =  await RedisHandler()
  if (Checkuser.success === false){
   if (Checkuser.err ===  "Invalid user") return new ApiResponse(401 , "Please login" ,false).response()
   else return new ApiResponse(401 , "You have reached your limit please" ,false).response()
  } 
  const UserAuth = Checkuser.userAuth
  await DBConnection()
  try {
    const newExpense = await Expense.create({
      user:UserAuth?.email,
      expenseMoney:data.expenseMoney,
      expenseCategory:data.expenseCategory,
      isMoneyRefundable:data.isMoneyRefundable,
      description:data.description
    })
    await newExpense.save()
    await RedisClient.expire(`user_${UserAuth?.email}` , 1)
    return new ApiResponse(200 , "Expense saved successfully done" , true).response()
  } catch (error) {
    if (error instanceof Error) {
      return new ApiResponse(500 , error.message , false).response()
    }
    return new ApiResponse(500 , "Internal server error" , false).response()
  }
}