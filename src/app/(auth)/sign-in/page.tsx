"use client"


import LoginUser from "@/app/(auth)/sign-in/rout"
// import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { signInSchema } from "@/schemas/LoginSchema"
import { ZUserRegistrationSchema } from "@/schemas/User"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
// import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { UserSignin } from "./Signin"
 function Page() {
  const navigate = useRouter()
  const [isLoading , setisLoading] = useState(false)
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver:zodResolver(signInSchema),
    defaultValues:{
      identifier:"",
      password:"",
    }
  })
  async function onSubmit(values:z.infer<typeof signInSchema>){
  //  const result = await LoginUser(values)
  //  console.log(result)
    // fetch("")
 try {
  setisLoading(true)
 const result =  await UserSignin(values)
   if (result.success === false) {
    toast.error(result.err)
   }
   else {
    toast.success("Login successfully done")
    navigate.replace("/dashboard")
   }
 } catch (error) {
  setisLoading(false)
 }
 finally
 {
  setisLoading(false)
 }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="w-full max-w-md p-8 space-y-8  rounded-lg shadow-md  border-[.5px] border-red-700">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Welcome Back to Expense Tracker
        </h1>
        <p className="mb-4">Sign in to continue your expense journy</p>
      </div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="identifier"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Username</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type="submit" disabled={isLoading ? true :false}>{isLoading ? <Spinner/>: "login now"}</Button>
        </form>
      </Form>
      <div className="text-end mt-4">
        <p>
          forgot password?{' '}
          <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
            forgot Password
          </Link>
        </p>
      </div>
      <div className="text-end mt-4">
        <p>
          Not a member yet?{' '}
          <Link href="/Sign-Up" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}

export default Page 