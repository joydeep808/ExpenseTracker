

"use server"

import { signIn } from "@/auth"
import { CustomError } from "@/types/index.types";
const getErrorCause = (error: unknown): string | undefined => {
  if (error && typeof error === 'object' && 'cause' in error) {
    const customError = error as CustomError;
     const a = customError.cause?.err as Error
     if (a instanceof Error) {
      return a.message
     }
  }
  return undefined;
};
export const UserSignin = async (values:{identifier:string , password:string})=>{
 try {
  await signIn("credentials" , {
    redirect:false,
    identifier:values.identifier,
    password:values.password
  })
  return {success:true , err:"Successfully done!"}
 } catch (error) {
  
  if (error instanceof Error) {
   const err = getErrorCause(error)
   if (err) {
     return {success:false , err}
   }
   return {success:false ,err: "Please try again later"}
  }
 else  return {success:false , err:"Error when login "}
 }
}