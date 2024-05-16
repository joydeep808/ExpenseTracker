
"use server"
import { ApiResponse } from "@/Util/ApiResponse";
import { User } from "@/models/User";
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { DBConnection } from "@/DB";
import { setCookies } from "@/Util/cookies";
import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";



export default async function LoginUser(values: {identifier:string , password:string }){
try {
  await DBConnection()
    const { identifier , password}= values
    const isUserFound = await User.findOne({email:identifier})
    if(!isUserFound) return new ApiResponse(404 , "User not found with this email" , false).response()
    const isPasswordvalid = bcrypt.compareSync(password , isUserFound.password)
    if(!isPasswordvalid){
      
      return new ApiResponse(400 , "Password not valid" , false).response()
    }
    const token = jsonwebtoken.sign({id:isUserFound._id , email:isUserFound.email , isVerify:isUserFound.isVerifyed , name:isUserFound.name } , process.env.AUTH_SECRET)
      // await signIn("credentials",{
      //     redirect:true,
      //     i:isUserFound,

      // })
      // await setCookies("authjs.session-token" , token)
    return new ApiResponse(200 , "Login successfully done!" , true).response()
  
} catch (error) {
  if(error instanceof Error){
    return new ApiResponse(500 , error.message , false).response()

  }
  return new ApiResponse(500 , "Server issue" , false).response()
}
} 