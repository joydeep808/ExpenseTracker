
"use server"







import { WelcomeEmailSend, emailVerificationEmailProducer, sendEmail } from "@/app/api/SendMail"
import {Queue, Worker} from "bullmq"

const {host ,  password , port} = {
  host:process.env.REDIS_USERNAME,
  password:process.env.REDIS_PASSWORD,
  port:process.env.REDIS_PORT
}


const forGotPasswordQueue = new Queue("forgotPasswordQueue" , {
    connection:{
      host,
      password,
      port
    }
})

const WelcomUserQueue = new Queue("WelcomeUserQueue" , {
  connection:{
    host,
    password,
    port
  }
})
const OTPVerificationQueue = new Queue("OTPVerificationQueue" , {
  connection:{
    host,
    password,
    port
  }
})






// Workers



export const WelcomeMessageWorker = async (name:string , email:string)=>{
  await WelcomUserQueue.add("WelcomeUser" , {
    name , email
  })

}

export const OTPVerificationWorker = async(email:string , name:string , OTP:string)=>{
  await OTPVerificationQueue.add("OTPVerification",{
     email , name , OTP
  })
}
export const forgotPasswordWorker =async(data:{email:string , OTP:string , name:string})=>{
  await forGotPasswordQueue.add("forgotPassword" , {...data})
}

new Worker("WelcomeUserQueue",async(data)=>{
  
    await sendEmail(data.data.email, "OnBording Email", await WelcomeEmailSend(data.data.name ))
 
},{
  connection:{
    host,
    password,
    port
  }
})
// new Worker("OTPVerificationQueue",async(data)=>{
//   await sendEmail(data.data.email , "Verification email" , emailVerificationEmailProducer(data.data.name , data.data.OTP))
// },{
//   connection:{
//     host,
//     password,
//     port
//   }
// }) 