"use server"

import { DBConnection } from "@/DB"
import { ApiResponse } from "@/Util/ApiResponse"
import { User } from "@/models/User"


export const ChangePasswordAction = async(identifier:string)=>{
  if (!identifier || identifier.length < 2) {
    return new ApiResponse(400 , "Please provide the required value" , false)
  }
  await DBConnection()
  const foundUser = await User.findOne({$or:[{email:identifier} , {phone:{identifier}}]}) 
  if (!foundUser) return new ApiResponse(404 , "User not found in our Data base" , false)
  

}