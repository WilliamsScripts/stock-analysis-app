import { z } from "zod";

export const getStockSchema = z.object({
  tickers: z.array(z.string().min(1, { message: 'Stock ticker cannot be empty' })).min(1, { message: 'Please select at least one stock' }),
  startDate: z.string().min(1, { message: 'Please select a valid date' }).date(),
  endDate: z.string().min(1, { message: 'Please select a valid date' }).date(),
}).required()
  .refine((data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end > start;
  }, {
    message: 'End date must be after start date',
    path: ['endDate'],
  });