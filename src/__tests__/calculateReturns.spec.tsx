import { calculateReturns } from "@/actions/stock-action";
import { StockData } from "@/data/types";

describe('calculateReturns', () => {
  it('should calculate returns correctly for multiple stock data entries', async () => {
    const stockData = [
      { Date: '2023-01-01', close: 100 },
      { Date: '2023-01-02', close: 105 },
      { Date: '2023-01-03', close: 110 },
    ];

    const result = await calculateReturns(stockData);

    expect(result).toEqual([
      { Date: '2023-01-01', close: 100, return: null }, 
      { Date: '2023-01-02', close: 105, return: 0.05 }, 
      { Date: '2023-01-03', close: 110, return: 0.047619047619047616 },
    ]);
  });

  it('should handle a single stock data entry by returning null for return', async () => {
    const stockData = [{ Date: '2023-01-01', close: 100 }];

    const result = await calculateReturns(stockData);

    expect(result).toEqual([{ Date: '2023-01-01', close: 100, return: null }]);
  });

  it('should sort stock data by date before calculating returns', async () => {
    const stockData = [
      { Date: '2023-01-03', close: 110 },
      { Date: '2023-01-01', close: 100 },
      { Date: '2023-01-02', close: 105 },
    ];

    const result = await calculateReturns(stockData);

    expect(result).toEqual([
      { Date: '2023-01-01', close: 100, return: null }, 
      { Date: '2023-01-02', close: 105, return: 0.05 }, 
      { Date: '2023-01-03', close: 110, return: 0.047619047619047616 },
    ]);
  });

  it('should handle empty stock data by returning an empty array', async () => {
    const stockData: Partial<StockData>[] = [];

    const result = await calculateReturns(stockData);

    expect(result).toEqual([]);
  });

  it('should handle stock data with negative closing prices', async () => {
    const stockData = [
      { Date: '2023-01-01', close: 100 },
      { Date: '2023-01-02', close: -50 },
    ];

    const result = await calculateReturns(stockData);

    expect(result).toEqual([
      { Date: '2023-01-01', close: 100, return: null },
      { Date: '2023-01-02', close: -50, return: (-50 - 100) / 100 },
    ]);
  });
});