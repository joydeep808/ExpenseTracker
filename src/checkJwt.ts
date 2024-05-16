
// import jsonwebtoken from 'jsonwebtoken'
// export async function CheckJWT(value:string) {
//   return jsonwebtoken.verify(value , "38BdoZyGoGKE91JNTZi3lGKVAzZaPTi+xlBF+c/holY=")
// }


"use server"

import { signIn } from "./auth"

export async function signInUser(values:{
  identifier:string
  password:string
}) {
  const result =  await signIn("credentials",{
    redirect:false,
    identifier:values.identifier,
    password:values.password
})
}