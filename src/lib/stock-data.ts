import axios from 'axios';
import { parse } from 'csv-parse';
import { StockData } from '@/app/page';


// TODO: implement pagination
// TODO: Properly handle errors
// TODO: make code reuseable Eg: types

export async function getStockData(ticker: string[], startDate: string, endDate: string): Promise<StockData[]> {
  const csvUrl = 'http://localhost:3000/stock-prices.csv';
  const records: StockData[] = [];

  try {
    const response = await axios.get(csvUrl);
    return new Promise((resolve, reject) => {

      const parser = parse(response.data, {
        delimiter: ',',
        columns: true,
        skip_empty_lines: true
      });

      parser.on('readable', function () {
        let record;
        while ((record = parser.read()) !== null) {
          records.push(record);
        }
      });

      parser.on('error', function (err) {
        console.error('Error while parsing:', err.message);
        reject(err);
      });

      parser.on('end', function () {
        const filteredData = records.filter(record =>
          ticker.includes(record.ticker) &&
          new Date(record.Date) >= new Date(startDate) &&
          new Date(record.Date) <= new Date(endDate)
        );

        resolve(filteredData);
      });
    });
  } catch (error) {
    console.error('Error fetching CSV data:', error);
    return [];
  }
}


/**
 * Calculate daily returns for a stock.
 * @param {StockData[]} stockData - Array of stock data (date and close price)
 * @returns {Array} - Array with date and calculated returns
 */
export function calculateReturns(stockData: StockData[]) {
  const sortedData = stockData.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

  return sortedData.map((data, index) => {
    if (index === 0) return { ...data, return: null };
    const prevClose = sortedData[index - 1].close;
    const dailyReturn = (data.close - prevClose) / prevClose;
    return { ...data, return: dailyReturn };
  });
}