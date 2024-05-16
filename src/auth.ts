
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DBConnection } from "./DB"
import { User } from "./models/User"
import bcrypt from 'bcrypt'
import { checkTheRefreshToken, createNewRefeshToken, setAccessTokenExpires, setRefreshTokenExpiry } from "./Util/AuthHelper"




export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials:{
        email:{label:"Email" , type:"email"},
        password:{label:"Password ",type:"password"}
      },
      authorize:async(credentials:any):Promise<any>=>{
          await DBConnection()
                  try {
                    const user = await User.findOne({
                      email:credentials.identifier
                    })
                    if(!user) throw new Error("User not found with this details")
                      const isPasswordValid = bcrypt.compareSync(credentials.password , user.password)
                    if(!isPasswordValid)throw new Error("Password not valid ")
                    if (user.refreshToken) {
                      if (new Date() < user.refreshTokenExpiry) {
                        const newRefreshToken =   await createNewRefeshToken();
                        user.refreshToken = newRefreshToken;
                        await user.save({validateBeforeSave:false})
                      }
                    }
                    if(!user.refreshToken){
                      const newRefreshToken =await createNewRefeshToken();
                      user.refreshToken = newRefreshToken;
                      user.refreshTokenExpiry =setRefreshTokenExpiry()
                      await user.save({validateBeforeSave:false})
                    }
                    return user
                  } catch (error:any|Error ) {
                    if (error instanceof Error) {
                      throw new Error(error.message)
                    }
                    throw new Error(error)
                  }
                },
              }),
            ],
          callbacks:{
            async jwt({token , user }) {
              if(user){
                      user.email ?  token.email = user.email :""
                      user.name ?  token.name = user.name :""
                      user._id ?  token._id = user._id.toString() :""
                      user.isVerifyed?   token.isVerifyed = user.isVerifyed :false
                      user.role ?  token.role = user.role :["USER"]
                      user.refreshToken?  token.refreshToken = user.refreshToken  :""
                      token.expiresAt =setAccessTokenExpires()
                      
                      } 

                      const expiresAt  = token.expiresAt  as Date ;
                      
                      if (new Date() <new Date(expiresAt )) {
                        console.log("return")
                        return token;
                      }
                     else  {

                      await DBConnection()
                      const foundUser = await User.findById(token._id)
                      if (!foundUser) {
                        throw new Error("User not found")
                      }
                      if (!foundUser.refreshToken) {
                        throw new Error("Please login ")
                      }
                      if (foundUser.refreshToken === token.refreshToken) {
                        
                        if (new Date()> foundUser.refreshTokenExpiry) {
                          throw new Error("Refresh Token expired")
                        }
                       else  {
                        return{
                          ...token,
                          email:foundUser.email,
                          name:foundUser.name,
                          isVerifyed:foundUser.isVerifyed,
                          role:foundUser.role,
                          expiresAt:await setAccessTokenExpires()
                        }
                       }
                      }
                      else{
                        throw new Error("Refresh Token not valid")
                      }
                       
                     }
            },
            async session({session , token}){
              return {
                ...session,
                ...token,
              }
              // if (token) {
              //           session.user._id = token._id
              //           session.user.isVerifyed = token.isVerifyed
              //           session.user.name = token.name
              //           session.user.email = token.email
              //           session.user.role = token.role
              //           session.user.refreshToken = token.refreshToken
              //           session.user.expiresAt = token.expiresAt
              //         }
              //         return session;

                      
            }
          },
          pages:{
            signIn:"sign-in"
          },
          
})