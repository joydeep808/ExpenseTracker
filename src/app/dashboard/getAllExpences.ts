


"use server"

import { DBConnection } from "@/DB"
import { AuthCheck } from "../api/authCheck/authCheck"
import { ApiResponse, InternalServerError, UnauthorizedAccessResponse } from "@/Util/ApiResponse"
import { Expense } from "@/models/Expence"
import { auth } from "@/auth"
import { IExpense } from "@/app/Store"
import { TRegistrationResponse } from "@/types/index.types"
import { RedisClient, RedisHandler, setUserinRedis } from "@/helpers/Ratelimit"

export async function getAllExpences ():Promise<TRegistrationResponse>{
  try {
    
  const Checkuser  =  await RedisHandler()
   if (Checkuser.success === false){
    if (Checkuser.err ===  "Invalid user") return new ApiResponse(401 , "Please login" ,false).response()
    else return new ApiResponse(401 , "You have reached your limit please" ,false).response()
   } 
   const User = Checkuser.userAuth?.user
   const redisPipeline =  RedisClient.pipeline();
  await  redisPipeline.expire(`user_${User.email}` , 1).exec()
   const result  = await RedisClient.get(`user_${User.email}`);
   if (result !== null) {
    return new ApiResponse(200 , "Expeses found from redis" , true , result).response()
   }

   await DBConnection()
  const allExpences = await Expense.aggregate([
    {
      $match:{
        user:User.email
      }
    },
    {
      $sort:{
        createdAt:-1
      }
    },
    {
      $limit:10
    }
  ])
  if (allExpences.length === 0) {
    return new ApiResponse(404 , "No Expence found", false ).response()
  }
  const refineObjects = JSON.stringify(allExpences)
  redisPipeline.set(`user_${User.email}` , refineObjects)
  redisPipeline.expire(`user_${User.email}` , 60)
  await redisPipeline.exec()
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