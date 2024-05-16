

"use server"

import { DBConnection } from "@/DB";
import { ApiResponse } from "@/Util/ApiResponse";
import { auth } from "@/auth";
import { Expense } from "@/models/Expence";
import { ZExpenseSchema } from "@/schemas/Expence.Schema";
import { z } from "zod";
export async function addExpence (data:z.infer<typeof ZExpenseSchema>){
  console.log(data)
  await DBConnection();
  const Userauth = await auth()
  if (!Userauth) return new ApiResponse(401 , "Unauthorize access" , false).response()
  try {
    const newExpense = await Expense.create({
      user:Userauth.user.email,
      expenseMoney:data.expenseMoney,
      expenseCategory:data.expenseCategory,
      isMoneyRefundable:data.isMoneyRefundable,
      description:data.description
    })
    await newExpense.save()
    return new ApiResponse(200 , "Expense saved successfully done" , true).response()
  } catch (error) {
    if (error instanceof Error) {
      return new ApiResponse(500 , error.message , false).response()
    }
    return new ApiResponse(500 , "Internal server error" , false).response()
  }
}