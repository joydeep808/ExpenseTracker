


"use server"

import { RedisHandler , incrementValue, setUserinRedis } from "@/helpers/Ratelimit"

export const RateLimiter= async()=>{
 const Response =  await RedisHandler()
 if (Response.success === false) {
  return "User not login"
 }
 if (Response.success === null) {
  await setUserinRedis(Response.userAuth.user.email)
  return "Successfully user set"
 }
 const res = await incrementValue(Response.userAuth?.user.email)
 res ? "Successfully increment":"Error in redis increment"
}

