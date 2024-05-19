"use server"

import { DBConnection } from "@/DB"
import { ApiResponse } from "@/Util/ApiResponse"
import { forgotPasswordWorker } from "@/app/MessagingQueue"
import { User } from "@/models/User"
import { TRegistrationResponse } from "@/types/index.types"
import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt, { hash } from 'bcrypt'


export const ChangePasswordAction = async(identifier:string):Promise<TRegistrationResponse>=>{
  if (!identifier || identifier.length < 2) return new ApiResponse(400 , "Please provide the required value" , false).response()
  
  await DBConnection()
  const foundUser = await User.findOne({$or:[{email:identifier}]}) 
  if (!foundUser) return new ApiResponse(404 , "User not found " , false).response()
    const expiresAt = Date.now() + 10 * 60 * 1000
  const token =await crypto.randomUUID()
  const payload = jsonwebtoken.sign({id:foundUser._id ,expiresAt , token} , process.env.AUTH_SECRET) 
   foundUser.forgotPasswordOTP = token
   await foundUser.save({validateBeforeSave:false})
  await forgotPasswordWorker({email:foundUser.email , name:foundUser.name , resetLink:payload})
  return new ApiResponse(200 , "Email send successfully done" , true).response()
}



export const ChnageThePassword = async(token:string , password:string):Promise<TRegistrationResponse>=>{
  if (!token || !password) return new ApiResponse(400 , "Please provide password or token" , false).response()
  try {
    await DBConnection()
    const payload = jsonwebtoken.verify(token , process.env.AUTH_SECRET) as {id:string , expiredAt:number , token:string}
    if (Date.now() > payload.expiredAt) return new ApiResponse(400 , "Link expired" , false).response()
    const foundUser= await User.findOne({_id:payload.id})

    if (!foundUser) return new ApiResponse(404 , "User not found with this details " , false).response()
    if (foundUser.forgotPasswordOTP !== payload.token) return new ApiResponse(401 , "Unauthorized request" , false).response() 
    const hashPassword = bcrypt.hashSync(password , 10)
  foundUser.password = hashPassword
  foundUser.forgotPasswordOTP = ""
  await foundUser.save({validateBeforeSave:false})
  return new ApiResponse(200 , "Password changed successfully done!" , true).response()
  } catch (error) {
    if (error instanceof JsonWebTokenError) return new ApiResponse(500 , error.message , false).response()
    if (error instanceof Error)  return new ApiResponse(500 , error.message , false).response()
    return new ApiResponse(500 , "Internal server error" , false).response()
  }

}