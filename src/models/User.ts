import {  Model, Schema, model, models } from "mongoose"
export interface TUser {
  name:string,
  email:string,
  phone:number,
  password:string,
  isVerifyed:boolean,
  verificationOTP:string
  verificationOtpExpiry:number
  forgotPasswordOTP:string
  forgotPasswordExpiry:number
  passwordTries:number
  accountLockedTime:Date
  role:string[]
  refreshToken:string
  refreshTokenExpiry:Date
}

const UserSchema = new Schema<TUser>({
  name:{
    type:"String",
    required:true
  },
  email:{
    type:"String",
    required:true,
    index:true,
    lowercase:true,
    unique:true
  },
  phone:{
    type:"Number",
    unique:true,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  isVerifyed:{
    type:Boolean,
    default:false
  },
  verificationOTP:{
    type:String
  },
  verificationOtpExpiry:{
    type:Number
  },
  forgotPasswordOTP:{
    type:String
  },
  forgotPasswordExpiry:{
    type:Number
  },
  passwordTries:{
    type:Number,
    default:5
  },
  accountLockedTime:{
    type:Date
  },
  refreshToken:{
    type:"String"
  },
  refreshTokenExpiry:{
    type:Date
  },
  role:{
    type:[String],
    default:["USER"],
    enum:["USER" , "ADMIN"]
  }

},{
  timestamps:true
})
export const User = (models.User as Model<TUser> || model<TUser>("User" , UserSchema))
