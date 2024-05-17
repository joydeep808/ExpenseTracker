"use client"

import { ZForgotPasswordSchema } from "@/schemas/ForgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react"
import {  useForm } from 'react-hook-form';
import { z } from "zod";
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
 
const Page = () => {
const form = useForm<z.infer<typeof ZForgotPasswordSchema>>({
  resolver:zodResolver(ZForgotPasswordSchema)
})
const onSubmit = ()=>{

}


  return (
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
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter email or phone</FormLabel>
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

export default Page