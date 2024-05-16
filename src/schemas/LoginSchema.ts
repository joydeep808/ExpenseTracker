import * as z from 'zod'



export const signInSchema = z.object({
  identifier:z.string().email().min(5 , "Email should contain atleast 5 character").max(100 , "Email should below 100 characters "),
  password:z.string().min(8  ,"Password should contain atleast 8 characters").max(30 , "Password should in between 30 characters")
})