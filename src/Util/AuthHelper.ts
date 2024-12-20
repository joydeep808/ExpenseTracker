import { DBConnection } from '@/DB'
import { auth } from '@/auth'
import { User } from '@/models/User'
import crypto, { randomUUID } from 'crypto'
import { JWT } from 'next-auth'

export const setAccessTokenExpires  = ()=>{
  const time = new Date( Date.now() + .2 * 60 * 1000)
  return time
}
export const setRefreshTokenExpiry = ()=>{
  return Date.now() + 24 * 60 * 1000 * 30
}

export const createNewRefeshToken = ()=>{
  return randomUUID()
}

export const checkTheRefreshToken = async(token:any)=>{
  
  await DBConnection();

  const foundUser =  await User.findById(token._id)
  if (!foundUser) {
    throw new Error("User may be removed")
  }
  if (!foundUser.refreshToken) {
    throw new Error("Please login ")
  }
  if (foundUser.refreshToken === token.refreshToken) {
    
    if (Date.now()> foundUser.refreshTokenExpiry) {
      throw new Error("Refresh Token expired")
    }
   else  {
    const newToken =  {
      ...token,
      expiresAt:setAccessTokenExpires()
    }
    return newToken;
   }
  }

}