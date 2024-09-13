'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { MultiValue } from 'react-select';
import { calculateReturns, getStockData } from '@/actions/stock-action';
import { OptionProps, ValidationErrorType } from '@/data/types';
import { ArrowRight } from 'lucide-react';
import GetStockForm from '@/components/GetStockForm';

export type StockData = {
  Date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ticker: string;
};


export default function Home() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [returnsData, setReturnsData] = useState<( StockData & { return: number | null } )[]>([]);
  const [ticker, setTicker] = useState<OptionProps[]>([{ label: 'Apple', value: 'AAPL' }]);
  const [errors, setErrors] = useState<ValidationErrorType | undefined>(undefined);

  const fetchDataAction = async (formData: FormData) => {
    const __tickers = ticker.map(company => company.value);
    const startDate = formData.get('startDate') as string, 
      endDate = formData.get('endDate') as string;

    const data = await getStockData(__tickers, startDate, endDate);
    if (Array.isArray(data))  {
      const returns = await calculateReturns(data);
      setReturnsData(returns);
      setStockData(data);
    } else {
      setErrors(data)
    }

  }

  const handleSelect = (payload: MultiValue<OptionProps>) => {
    setTicker((prev: OptionProps[]) => {
      const selectedValues = payload.map(option => option.value);
      const filteredPrev = prev.filter(item => selectedValues.includes(item.value));
      const newSelections = payload.filter(option => !prev.some(item => item.value === option.value));
      return [...filteredPrev, ...newSelections];
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <h1 className="text-3xl font-bold mb-4">Stock Analysis</h1>
        <Link href='/stock-comparison' className='flex items-center gap-1 bg-blue-500 rounded-lg py-2 px-3 text-md text-white'>
          Compare Stock
          <ArrowRight />
        </Link>
      </div>

      <GetStockForm {...{ fetchDataAction, errors }} />

      <div className="grid grid-cols-2 gap-10 my-6">
        {/* Display stock data */}
        {stockData.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Stock Data</h2>
            <table className="min-w-full table-auto mt-4">
              <thead>
                <tr className='bg-red-200'>
                  <th className='text-left p-2'>Date</th>
                  <th className='text-left p-2'>Open</th>
                  <th className='text-left p-2'>High</th>
                  <th className='text-left p-2'>Low</th>
                  <th className='text-left p-2'>Close</th>
                  <th className='text-left p-2'>Volume</th>
                  <th className='text-left p-2'>Ticker</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((row, index) => (
                  <tr key={index} className='border-b'>
                    <td className='p-2'>{row.Date}</td>
                    <td className='p-2'>{row.open}</td>
                    <td className='p-2'>{row.high}</td>
                    <td className='p-2'>{row.low}</td>
                    <td className='p-2'>{row.close}</td>
                    <td className='p-2'>{row.volume}</td>
                    <td className='p-2'>{row.ticker}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Display returns data */}
        {returnsData.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Returns Data</h2>
            <table className="min-w-full table-auto mt-4">
              <thead>
                <tr className='border-b bg-red-200'>
                  <th className='text-left p-2'>Date</th>
                  <th className='text-left p-2'>Return</th>
                </tr>
              </thead>
              <tbody>
                {returnsData.map((row, index) => (
                  <tr key={index} className='border-b'>
                    <td className='p-2'>{row.Date}</td>
                    <td className='p-2'>{row.return ? (row.return * 100).toFixed(2) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
