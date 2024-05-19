
import { create } from 'zustand'
export interface IExpense {
  description:string
  user:string
  expenseCategory: string
  expenseMoney : number
  isMoneyRefundable : boolean
  _id:string
  createdAt:string
  updatedAt:string
}
export type TExpenseCategoryDetails = {
  expenseCategory:string,
  addedCategory:number
} 
type store = {
  Expenses:IExpense[]
  alreadyFetched:boolean
  categoryDetails:TExpenseCategoryDetails[]
  totalCategoryItem:number
  FilterExpense:IExpense[]
}
type actions = {
  addExpenses:(Expense:IExpense[])=> void
  changeAlreadyFetched:(status:boolean)=>void
  addCategoryDetails:(Expense:TExpenseCategoryDetails[])=> void
  addTotalCategoryItem:(item:number)=>void
  addFilterExpenses:(Expense:IExpense[])=> void

}


export const useStore = create<store & actions>((set)=>({
  Expenses:[],
  alreadyFetched:false,
totalCategoryItem:0,
FilterExpense:[],
  categoryDetails:[],
  addExpenses:(Expense:IExpense[])=>set((state)=>({
    Expenses:[
      ...state.Expenses,
      ...Expense
    ],
  })),
  changeAlreadyFetched:(status:boolean)=>set(()=>({
    alreadyFetched:status
  })),
  addTotalCategoryItem:(item:number)=>set(()=>({
    totalCategoryItem:item
      })),
  addCategoryDetails:(Expense:TExpenseCategoryDetails[])=>set((prev)=>({
    categoryDetails:[
      ...prev.categoryDetails,
      ...Expense
    ]
  })),
   addFilterExpenses:(Expense:IExpense[])=>set((prev)=>({
    FilterExpense:[...Expense]
   }))
  
}))