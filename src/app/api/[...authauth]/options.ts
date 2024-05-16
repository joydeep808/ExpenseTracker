// import { DBConnection } from "@/DB";
// import { User } from "@/models/User";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcrypt'

// export const authOptions:NextAuthOptions={
//   providers:[
//     CredentialsProvider({
//       id:"credentials",
//       name:"Credentials",
//       credentials:{
//         email:{label:"Email" , type:"text"},
//         password:{label:"Password" , type:"password"}
//       },
//       async authorize(credentials:any):Promise<any> {
//        
//   ],
//   callbacks:{
//     async jwt({token , user}){
//       if(user){
//         token._id = user?._id?.toString(),
//         token.email = user?.email
//         token.isVerifyed = user?.isVerifyed
//         token.name = user?.name
//       }
//       return token;
//     },
//      async session({session , token}) {
//       if (token) {
//         session.user._id = token._id
//         session.user.isVerifyed = token.isVerifyed
//         session.user.name = token.name
//         session.user.email = token.email
//       }
//       return session;
      
//      }

//   },
//   session:{
//     strategy:"jwt",

//   },
//   secret:process.env.NEXTAUTH_SECRET,
//   pages:{
//     signIn:"/sign-in"
//   }
// }