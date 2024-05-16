
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

type store = {
  Expenses:IExpense[]
  alreadyFetched:boolean
}
type actions = {
  addExpenses :(Expense:IExpense[])=> void
  changeAlreadyFetched:()=>void
}


export const useStore = create<store & actions>((set)=>({
  Expenses:[],
  alreadyFetched:false,
  addExpenses:(Expense:IExpense[])=>set((state)=>({
    Expenses:[
      ...state.Expenses,
      ...Expense
    ]
  })),
  changeAlreadyFetched:()=>set(()=>({
    alreadyFetched:true
  }))
}))