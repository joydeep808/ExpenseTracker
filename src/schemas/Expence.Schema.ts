import { z } from 'zod';
export const ZExpenseSchema = z.object({
  expenseCategory: z.string(),
  expenseMoney: z.string().min(1,"Your MinimExpence should be 1").max(8,"Your Maximum expence should be less then 1 Million"),
  isMoneyRefundable: z.boolean().default(false),
  description: z.string(),
});