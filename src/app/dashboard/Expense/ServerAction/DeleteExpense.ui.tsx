"use client"
import React, { ReactEventHandler } from "react" 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
interface DeleteExpenseProps {
  onClick:()=>void
}

export const DeleteExpense:React.FC<DeleteExpenseProps> =({onClick})=><>
  <AlertDialog>
    <AlertDialogTrigger style={{background:"#EA580C" , padding:".3rem 1.5rem "}} className="rounded">Delete</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your expense
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel >Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</>