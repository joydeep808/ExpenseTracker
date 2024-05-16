

import 'next-auth'
declare module 'next-auth'{
  interface Session{
    user:{
      _id:string
      isVerifyed:boolean,
      email:string
      name:string
      role:string[]
      refreshToken:string
      expiresAt:number

    } & DefaultSession["user"]
  } 
  interface User{
      _id:string
      isVerifyed:boolean,
      email:string
      name:string
      refreshToken:string
      expiresAt:number
      role:string[]
  }
  interface JWT{
    _id:string
    isVerifyed:boolean,
    email:string
    name:string
    role:string[]
    refreshToken:string
    expiresAt:number

  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    _id:string
    isVerifyed:boolean,
    email:string
    name:string
    refreshToken:string
    expiresAt:Date
    role:string[]
  }
}