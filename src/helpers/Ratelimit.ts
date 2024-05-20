
import { ApiResponse } from '@/Util/ApiResponse'
import { auth } from '@/auth'
/// i have to store the user id and and the counter 
/// if the user excedeed the limit within the counter than the user request is not able to respond 
/// else continue and request limit increase by 1 for the user 



import ioRedis, { Redis, RedisOptions } from 'ioredis'


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
  const userAuth = await auth()
  if (!userAuth || !userAuth.user || new Date(userAuth.expires) < new Date()) return {success:false , err:"Invalid user"}
  const userKey = userAuth.user.email
  const pipeline = RedisClient.pipeline();
 const result =await pipeline.get(userKey).exec()
 if (!result) return {success:false , err:"Redis error"}
 const foundUser = result[0][1] as number
 if( foundUser === null) {
   pipeline.set(userKey , 1)
   pipeline.expire(userKey , 60)
   await pipeline.exec()
  return {success:null , userAuth}
 }
 if (foundUser > 20) {
  return {success:false , err:"Limit Excedeed" }
 }
 else {
   pipeline.incrby(userKey , 1)
   await pipeline.exec()
  return {success:true,foundUser , userAuth}
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