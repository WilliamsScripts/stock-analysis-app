'use server'
import axios from 'axios';
import { parse } from 'csv-parse';
import { SERVER_URL } from '../data/constants';
import { getStockSchema } from '@/schemas/getStockSchema';
import { validationParser } from '@/utils/validationParser';
import { compareStockSchema } from '@/schemas/compareStockSchema';
import { CompareStockType, StockData, ValidationErrorType } from '@/data/types';


export async function parseStockData(): Promise<StockData[]> {
  const csvUrl = SERVER_URL + '/stock-prices.csv';
  const records: StockData[] = [];
  const response = await axios.get(csvUrl);

  return new Promise((resolve, reject) => {
    const parser = parse(response.data, {
      delimiter: ',',
      columns: true,
      skip_empty_lines: true,
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
      resolve(records);
    });
  });
}

export async function getStockData(tickers: string[], startDate: string, endDate: string): Promise<StockData[] | ValidationErrorType> {
  const validationResult = validationParser({ tickers, startDate, endDate }, getStockSchema);
  if (!validationResult.success) {
    return validationResult.errors;
  }

  try {
    const records: StockData[] = await parseStockData();
    return records.filter(
      (record) =>
        tickers.includes(record.ticker) &&
        new Date(record.Date) >= new Date(startDate) &&
        new Date(record.Date) <= new Date(endDate)
    );
  } catch (error) {
    // return undefine
    throw new Error('Error fetching stock data: ' + error);
  }
}

export async function calculateReturns(stockData: Partial<StockData>[]): Promise<(Partial<StockData> & { return: number | null })[]> {
  const sortedData = stockData
    .filter((data) => data.Date && data.close !== undefined)
    .sort((a, b) => new Date(a.Date!).getTime() - new Date(b.Date!).getTime());

  return sortedData.map((data, index) => {
    if (index === 0) return { ...data, return: null };

    const prevClose = sortedData[index - 1].close!;
    const dailyReturn = (data.close! - prevClose) / prevClose;

    return { ...data, return: dailyReturn };
  });
}

export async function compareStock(formData: FormData): Promise<ValidationErrorType | CompareStockType[]> {
  const tickerA = formData.get('tickerA') as string;
  const tickerB = formData.get('tickerB') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  const validationResult = validationParser({ tickerA, tickerB, startDate, endDate }, compareStockSchema);
  if (!validationResult.success) {
    return validationResult.errors;
  }

  // Fetch stock data for both tickers
  const stockDataA = await getStockData([tickerA], startDate, endDate);
  const stockDataB = await getStockData([tickerB], startDate, endDate);

  // Compare the stock data by date
  if (Array.isArray(stockDataA) && Array.isArray(stockDataB)) {
    return stockDataA.map((dataA, index) => ({
      date: dataA.Date,
      stockA: dataA.close,
      stockB: stockDataB[index]?.close || 0,
    }));
  }

  return [];
}