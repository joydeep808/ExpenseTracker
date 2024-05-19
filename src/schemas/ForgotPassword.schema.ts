import { z } from "zod";


export const ZForgotPasswordSchema = z.object({
  identifier:z.string().min(2 , "at least 2 digits should required")
})

// export const ZForgotPasswordVerifySchema = z.object({
//   password:z.
// })