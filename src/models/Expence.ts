import { Document, Model, Schema, Types, model, models } from "mongoose"


export interface TExpense  {
  user:string
  expenseCategory: string
  expenseMoney : number
  isMoneyRefundable : boolean
  description:string
  expenseDate:String
  createdAt:Date
  updatedAt:Date
  accountDetails:string
  refundDate:Date
}
export interface TCreditor {
  user : string
  creditMoney:number
  creditor:string
  creditDate:Date
  isMoneyRecived:boolean
  description:string
  createdAt:Date
  updatedAt:Date
}



export const ExpenseSchema =new Schema<TExpense>({
  user:{
    type:String,
    required:true,
    index:true

  },
   expenseCategory:{
    type:String,
    required:true
   },
   expenseMoney:{
    type:Number,
    required:true
   },
  isMoneyRefundable:{
    type:Boolean,
    default:false
  },
  description:{
    type:String,
  },
  accountDetails:{
    type:"String"
  },
  expenseDate:{
    type:"String"
  },
  refundDate:{
    type:"Date"
  }
},{
  timestamps:true
}) 
export const CreditorSchema = new Schema<TCreditor>({
  user:{
    type:String,
    required:true,
    index:true
  },
  creditor:{
    type:String,
    required:true,
  },
  creditDate:{
    type:Date,

  },
  creditMoney:{
    type:Number,
    required:true
  },
  isMoneyRecived:{
    type:Boolean,
    default:false,

  },
  description:{
    type:String
  },
},{
  timestamps:true
})

export const Expense = (models.Expense as Model<TExpense> || model<TExpense>("Expense" , ExpenseSchema) )
export const Credit = (models.Credit as Model<TCreditor> || model<TCreditor>("Credit" , CreditorSchema))
