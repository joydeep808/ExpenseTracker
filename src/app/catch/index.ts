"use server"
import { auth } from "@/auth"
import { SessionUser } from "@/types/index.types"



let  userSession:SessionUser = {
  _id:"" , 
  email :"",
  expiresAt:0,
  isVerifyed:false,
  name:"",
  refreshToken:"",
   role:["USER"],
}
export const getUserFromSession = async()=>{
  try {
   
     if (userSession.email === "") {
       const userAuth  = await auth() as SessionUser |null
       if (!userAuth) return {isSuccess:false , userSession ,err:"Invalid user"}
   
       userSession._id = userAuth._id,
       userSession.email = userAuth.email,
       userSession.role = userAuth.role,
       userSession.refreshToken = userAuth.refreshToken,
       userSession.expiresAt = userAuth.expiresAt,
       userSession.isVerifyed = userAuth.isVerifyed
       console.log("userSession set" )
       return {isSuccess:true , userSession}
   
     }
     if (new Date(userSession.expiresAt) < new Date()) {
      console.log("new token assigned")
       const userAuth  = await auth()
       if (!userAuth) return null
       userSession = userAuth.user
       return {isSuccess:true , userSession}
     }
     console.log("directly return")
     return {isSuccess:true , userSession}
   
   
  } catch (error) {
    return {isSuccess:false , userSession , err:"Invalid user"}
    
  }
}

