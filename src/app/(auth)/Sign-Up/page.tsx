"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ZUserRegistrationSchema } from './../../../schemas/User';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterUserInDB } from "./RegisterUser";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page() {
  const navigate = useRouter()
  const form= useForm<z.infer<typeof ZUserRegistrationSchema>>({
    resolver:zodResolver(ZUserRegistrationSchema),
    defaultValues:{
      email:"",
      name:"",
      password:"",
      
    }
  })
  
 async function onSubmit (values:z.infer<typeof ZUserRegistrationSchema>){
   const Response = await RegisterUserInDB(values)
   if (Response.success ) {
      toast.success(Response.message)
      navigate.push("/")
   }
   else {
      toast.error(Response.message)
   }
   
  }
  return (
    <>
    <Card  className="grid items-center justify-center ">

<Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid items-center justify-center">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field}   />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </Card>
    </>
  )
}

export default Page