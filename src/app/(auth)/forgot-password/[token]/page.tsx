
"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { ChnageThePassword } from "../ForgotPassword";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

 
export default function Page({ params }: { params: { token: string } }) {
  const ZforgotPassword = z.object({
    password:z.string().min(8 , "Minimum length should be 8")
  })
  const form = useForm<z.infer<typeof ZforgotPassword>>({
    resolver:zodResolver(ZforgotPassword)
  });
  const onSubmit= async(values:z.infer<typeof ZforgotPassword>)=>{
  const Response = await ChnageThePassword(params.token , values.password)
  if (!Response.success ) toast.error(Response.message)
  else toast.success(Response.message)

  }
  return(
    <div className="flex justify-center items-center translate-y-1/2">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Forgot your password</CardTitle>
      </CardHeader>
      <CardContent>
      <Form {...form}>
        <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

       
          <div className="grid w-full items-center gap-4">
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please enter your password</FormLabel>
              <FormControl>
              <div className="flex flex-col space-y-1.5">
                <Input placeholder="Emali or phone" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          <Button className='w-full' type="submit">Sign In</Button>
        </form>
        </Form>
      </CardContent>
    </Card>
    
   </div>
  )
}