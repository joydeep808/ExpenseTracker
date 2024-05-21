"use server"
import { DBConnection } from "@/DB"
import { ApiResponse } from "@/Util/ApiResponse"
import { OTPVerificationWorker, WelcomeMessageWorker } from "@/app/MessagingQueue"
import { User } from "@/models/User"
import type { RegisterUser } from "@/types/TRegistration"
import { TRegistrationResponse } from "@/types/index.types"
import { hashSync } from "bcrypt"
import { NextRequest } from "next/server"




export const RegisterUserInDB = async(values:RegisterUser):Promise<TRegistrationResponse>=>{
  const Req = NextRequest
  try {
    await DBConnection()
    const {email , name , password , phone}= values
    const hashPassword = hashSync(password , 10)
    const newUser= await User.create({
       email , 
       name , 
       phone,
       password:hashPassword
    })
    // TODO: account verify option or send the email to verify the account
   try {
    const user =  await newUser.save()
    await WelcomeMessageWorker(user.name , user.email)
     return new ApiResponse(200 , "User create successfully done!" ,true , user ).response()
   } catch (error:any) {
   if (error.keyValue) {
    if (error.keyValue.email) {
      return new ApiResponse(400 , "Email already exist" , false ).response()
    }
   else return new ApiResponse(400 , "Phone already exist" , false ).response()
    
   }
   return new ApiResponse(400 , "Unknown error" , false ).response()
   }
  } catch (error:any | Error) {
    let message = ""
    if (error instanceof Error) {
      message = error.message
    }
    if (error.keyValue) {
      if (error.keyValue.email) {
        return new ApiResponse(400 , "Email already exist" , false ).response()
      }
     else return new ApiResponse(400 , "Phone already exist" , false ).response()
      
     }
   return  new ApiResponse(200 , "Server Problem",false ,message ).response()
  }
}