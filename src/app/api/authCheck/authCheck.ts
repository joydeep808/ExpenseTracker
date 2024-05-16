


"use server"

import { ApiResponse } from "@/Util/ApiResponse";
import { auth } from "@/auth";
import { Session } from "next-auth";

export async function AuthCheck(){
  try {
    const UserAuth = await auth();
    if (!UserAuth?.user) {
      return false
    }
    return UserAuth
  } catch (error) {
   return false
    
  }
}

