


"use server"

import { DBConnection } from "@/DB"
import { ApiResponse } from "@/Util/ApiResponse"
import { RedisClient, RedisHandler } from "@/helpers/Ratelimit"
import { Expense } from "@/models/Expence"
import { TRegistrationResponse } from "@/types/index.types"

export const DeleteExpenseFromDB = async(id:string):Promise<TRegistrationResponse>=>{
  const Checkuser  =  await RedisHandler()
   if (Checkuser.success === false){
    if (Checkuser.err ===  "Invalid user") return new ApiResponse(401 , "Please login" ,false).response()
    else return new ApiResponse(401 , "You have reached your limit please" ,false).response()
   } 
   const User = Checkuser.userAuth?.user
   await DBConnection()
  const isDelete =  await Expense.deleteOne({$and:[{user:User.email} , {_id:id}]})
  if (!isDelete) return new ApiResponse(404 , "Expesnse not found to delete" , false).response()
   else {
    await RedisClient.expire(`user_${User.email}` , 1)
   return new ApiResponse(404 , "Delete successfully done" , true).response()
  }

} 