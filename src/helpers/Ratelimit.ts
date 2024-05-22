
import { ApiResponse } from '@/Util/ApiResponse'
import { getUserFromSession } from '@/app/catch'
import { auth } from '@/auth'
/// i have to store the user id and and the counter 
/// if the user excedeed the limit within the counter than the user request is not able to respond 
/// else continue and request limit increase by 1 for the user 



import ioRedis, { Redis, RedisOptions } from 'ioredis'
import { cookies } from 'next/headers'


const Options:RedisOptions ={
  host:process.env.REDIS_HOST,
  password:process.env.REDIS_PASSWORD,
  port:process.env.REDIS_PORT
}



export  let RedisClient:Redis
try {
    RedisClient =  new Redis({
    ...Options
  })
  console.log("Redis connection done")
} catch (error) {
  process.exit(1)
}




export const RedisHandler = async()=>{
  const userAuth = await getUserFromSession()
  if (!userAuth || userAuth?.isSuccess === null) {
     cookies().delete("__Secure-authjs.session-token")
    return {success:false , err:"Invalid user"}
  }
  const userKey = userAuth.userSession.email
  const pipeline = RedisClient.pipeline();
 const result =await RedisClient.get(userKey)
 const foundUser = result
 if( foundUser === null) {
   pipeline.set(userKey , 1).expire(userKey , 60)
  await pipeline.exec()
  return {success:null , userAuth:userAuth.userSession}
 }
 if (Number(foundUser) > 5) {
  return {success:false , err:"Limit Excedeed" }
 }
 else {
   await RedisClient.incrby(userKey , 1)
  return {success:true, userAuth:userAuth.userSession}
 }

}









export const setUserinRedis = async(email:string)=>{
  await RedisClient.set(email , 1)
  await RedisClient.expire(email , 1 * 60 )
}
export const incrementValue = async(email:string)=>{
 try {
    const user = await RedisClient.get(email)
    if (!user) {
      await setUserinRedis(email)
      return "set "
    }
    if (user > "5") {
      return new ApiResponse(400 , "Please try again sometimes" , false).response()
    }
    await RedisClient.incrby(email , 1)
    return "increment"
 } catch (error) {
  console.log("error")
  return false
 }
}