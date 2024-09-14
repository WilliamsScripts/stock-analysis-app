import { z } from "zod";

export const compareStockSchema = z.object({
  tickerA: z.string().min(1, { message: 'Please select a stock' }),
  tickerB: z.string().min(1, { message: 'Please select a stock' }),
  startDate: z.string().min(1, { message: 'Please select a valid date' }).date(),
  endDate: z.string().min(1, { message: 'Please select a valid date' }).date(),
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
  })
  .refine((data) => {
    if (data.startDate === '' || data.endDate === '') {
      return true;
    }
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end > start;
  }, {
    message: 'End date must be after start date',
    path: ['endDate'],
  });
