"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Data } from "./Data"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ZExpenseSchema } from "@/schemas/Expence.Schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { addExpence } from "./ServerAction/AddExpenceInServer"
import toast from "react-hot-toast"
import Link from "next/link"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
function Page() {
  const [isLoading , setisLoading] = useState(false)

  const form = useForm<z.infer<typeof ZExpenseSchema>>({
    resolver:zodResolver(ZExpenseSchema)
  })

  async function onSubmit(formData:z.infer<typeof ZExpenseSchema>){
    try {
      setisLoading(true)
      const money = Number.parseInt(formData.expenseMoney)
      if (money<= 0) {
        form.setError("expenseMoney",{
          message:"Expense money should not be lesserthan 0",
          type:"valueAsNumber"
        })
        
      }
     else{
      const Response = await addExpence(formData)
      if (!Response.success) {
        toast.error(Response.message)
      }
      else {
        toast.success(Response.message)
        
      }
     }
    } catch (error) {
      toast.error("An unknown error comes")
    }
    finally{
      setisLoading(false)
    }
  }
  return (
    <>
  
 <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Expence Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
          <FormField
          control={form.control}
          name="expenseMoney"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Expence Money</FormLabel>
              <FormControl>
              </FormControl>
              <div className="flex flex-col space-y-1.5">
              <Input {...field} type="number" id="expenceMoney" placeholder="500 " />
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
          name="expenseCategory"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Expence Category</FormLabel>
              <FormControl>
              </FormControl>
              <div className="flex flex-col space-y-1.5">

              <Select {...field} onValueChange={(e)=>form.setValue("expenseCategory" , e)}>
                <SelectTrigger id="catrgory">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent {...field} position="popper" >
                {Data.map((item ,index)=>(
                  <div key={index}>
                  <SelectItem {...field} value={item}>{item}</SelectItem>
                  </div>
                ))}
                </SelectContent>
              </Select>
                </div>
              <FormMessage />
            </FormItem>
          )}
        />
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="catrgory">catrgory</Label>
              <Select>
                <SelectTrigger id="catrgory">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                {Data.map((item ,index)=>(
                  <div key={index}>
                  <SelectItem value={item}>{item}</SelectItem>
                  </div>
                ))}
                </SelectContent>
              </Select>
            </div> */}



<FormField
          control={form.control}
          name="description"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Write some description</FormLabel>
              <FormControl>
              </FormControl>
              <div className="flex flex-col space-y-1.5">

              <Input {...field} type="text" id="Description" placeholder="Description...." />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is money refundable</FormLabel>
              <FormControl>
              </FormControl>
              <div className="flex flex-col space-y-1.5">
              <Select {...field} value="false">
                <SelectTrigger id="catrgory">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
                
                </SelectContent>
              </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
        {/* <Button variant="outline">Cancel</Button> */}
        <div className="flex justify-between mt-6">
  <Button ><Link href={"/dashboard"}>Go To Expences</Link></Button>
        <Button className=" px-8 py-4" type="submit" disabled={isLoading ? true :false}>{isLoading ? <Spinner/>: "Add"}</Button>
        </div>

        </form>
      </Form>
      </CardContent>
      

    </Card>

    </>
  )
}

export default Page