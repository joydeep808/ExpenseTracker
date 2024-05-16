"use server"
import { DBConnection } from "@/DB"
import { ApiResponse } from "@/Util/ApiResponse"
import { User } from "@/models/User"
import type { RegisterUser } from "@/types/TRegistration"
import { TRegistrationResponse } from "@/types/index.types"
import { hashSync } from "bcrypt"




export const RegisterUserInDB = async(values:RegisterUser):Promise<TRegistrationResponse>=>{
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
   const user =  await newUser.save()
    return new ApiResponse(200 , "User create successfully done!" ,true , user ).response()
  } catch (error) {
    let message = ""
    if (error instanceof Error) {
      message = error.message
    }
   return  new ApiResponse(200 , "Server Problem",false ,message ).response()
  }

}