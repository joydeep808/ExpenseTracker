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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

function Page() {
  const [isLoading , setisLoading] = useState(false)
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
   try {
    setisLoading(true)
    const Response = await RegisterUserInDB(values)
    if (Response.success ) {
       toast.success(Response.message)
       navigate.push("/sign-in")
    }
    else {
       toast.error(Response.message)
    }
    
   } catch (error) {
    toast.error("An unknown error ")
    setisLoading(false)
   }
   finally{
    setisLoading(false)

   }
  }
  return (
    <>
    <div className="flex items-center justify-center mt-28">
    <Card className="w-[450px]  ">
    <CardHeader>
        <CardTitle>Sign Up Now</CardTitle>
      </CardHeader>
    <CardContent>
      
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4  ">
          <FormField
          control={form.control}
          name="email"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your email</FormLabel>
              <FormControl>
              </FormControl>
              <div className="flex flex-col space-y-1.5">
              <Input {...field} type="email" id="email" placeholder="example@gmail.com " />
              </div>
              <FormMessage />
                
            </FormItem>
          )}
        />

            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="expenceMoney">expenceMoney</Label>
             
            </div> */}
            <FormField
          control={form.control}
          name="phone"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your phone</FormLabel>
              <FormControl>
              </FormControl>
              <div className="flex flex-col space-y-1.5">
              <Input {...field} type="phone" id="phone" placeholder="8888888888" />
              
                </div>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="password"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your password</FormLabel>
              <FormControl>
              </FormControl>
              <div className="flex flex-col space-y-1.5">

              <Input {...field} type="password" id="password" placeholder="**********" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your name </FormLabel>
              <FormControl>
              </FormControl>
              <div className="flex flex-col space-y-1.5">
              <Input {...field} type="text" id="name" placeholder="John Doe" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
        {/* <Button variant="outline">Cancel</Button> */}
       <div className="flex gap-6 mt-6 justify-between">
       <Button className=" px-10 py-4" type="submit">Register now</Button>
       <Link href="/sign-in"><Button className=" px-10 py-4" type="submit"disabled={isLoading ? true :false}>{isLoading ? <Spinner/>: "Register now"}</Button></Link>
       </div>
        </form>
      </Form>
      </CardContent>
      

    </Card>
    </div>
    </>
  )
}

export default Page