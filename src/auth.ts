
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
                    if(!user) throw new Error("Email not register with us")
                      if (user.passwordTries === 0 && user.invalidPasswordTries > Date.now()){
                        const now = Date.now()
                          const hour = (((user.invalidPasswordTries - now)/ 1000)/60 )
                          throw new Error(`Please try again after ${(hour / 60).toPrecision(1)} hour`)
                      }
                      const isPasswordValid = bcrypt.compareSync(credentials.password , user.password)
                    if(!isPasswordValid){
                      if (user.passwordTries === 1) {
                        user.passwordTries -= 1
                        user.invalidPasswordTries = Date.now() + 180 * 60 * 1000
                        await user.save({validateBeforeSave:false})
                      throw new Error("Password not valid ")
                        
                      }
                      user.passwordTries -= 1
                      await user.save({validateBeforeSave:false})
                      throw new Error("Password not valid ")
                    }
                      const newRefreshToken =await createNewRefeshToken();
                      user.forgotPasswordTries = 5
                        user.forgotPasswordStop = Date.now()
                      user.refreshToken = newRefreshToken;
                      user.refreshTokenExpiry =setRefreshTokenExpiry()
                      await user.save({validateBeforeSave:false})
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