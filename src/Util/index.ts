import { randomInt } from "crypto"




export const OTPGeneration= ()=>{
  const number = randomInt(1000 , 9999)
  return number
}