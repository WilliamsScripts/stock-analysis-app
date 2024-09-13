import { z } from "zod";

export const compareStockSchema = z.object({
  tickerA: z.string().min(1, { message: 'Please select a stock' }),
  tickerB: z.string().min(1, { message: 'Please select a stock' }),
  startDate: z.string().min(1).date(),
  endDate: z.string().min(1).date(),
})
  .required()
  .refine((data) => {
    if (data.tickerA === '' || data.tickerB === '') {
      return true;
    }
    return data.tickerA !== data.tickerB;
  }, {
    message: 'Ticker A and Ticker B cannot be the same',
    path: ['tickerB'],
  });
