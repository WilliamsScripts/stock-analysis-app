import { z } from "zod";

export const getStockSchema = z.object({
  tickers: z.array(z.string().min(1, { message: 'Stock ticker cannot be empty' })).min(1, { message: 'Please select at least one stock' }),
  startDate: z.string().min(1).date(),
  endDate: z.string().min(1).date(),
}).required();