
import { z as zod} from 'zod'



export const ZUserRegistrationSchema = zod.object({
  name:zod.string().min(3 , {message:"Name should contain atleast 3 characters"}).max(60 , "Name should be within 60 characters"),
  email:zod.string().email({message:"Enter valid email"}).min(3 , {message:"Email should contain atleast 3 characters"}).max(60 , "Email should be within 60 characters"),
  phone:zod.string().min(10 , "Number should be contain 10 digits").max(10 , "Number should be contain 10 digits"),
  password:zod.string().min(8 , "Min password limit is 8").max(30 , "Max password limit is 30")
})


