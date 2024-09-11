'use client'
import React, { useEffect, useState } from 'react';
import ReactSelect, { MultiValue } from 'react-select';
import { calculateReturns, getStockData } from '@/lib/stock-data';

export type StockData = {
  Date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ticker: string;
};

type OptionProps = { value: string, label: string }

export default function Home() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [returnsData, setReturnsData] = useState<( StockData & { return: number | null } )[]>([]);
  const [ticker, setTicker] = useState<OptionProps[]>([{ label: 'Apple', value: 'AAPL' }]);
  const [startDate, setStartDate] = useState<string>('2023-01-01');
  const [endDate, setEndDate] = useState<string>('2023-04-06');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const fetchData = async () => {
    const __tickers = ticker.map(company => company.value);
    const data = await getStockData(__tickers, startDate, endDate);
    const returns = calculateReturns(data);
    setStockData(data);
    setReturnsData(returns);
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
      <h1 className="text-3xl font-bold mb-4">Stock Analysis</h1>
      <form onSubmit={e => { e.preventDefault(); fetchData(); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Select Stock</label>
          {isMounted && 
            <ReactSelect
              options={[
                { label: 'American Airlines', value: 'AAL' },
                { label: 'Apple', value: 'AAPL' },
                { label: 'Microsoft', value: 'MSFT' },
                { label: 'Amazon', value: 'AMZN' },
                { label: 'Google', value: 'GOOGL' }
              ]}
              id='stock'
              defaultValue={ticker}
              onChange={handleSelect}
              isMulti={true}
            />}
        </div>

        <div className='grid grid-cols-4 items-center gap-3'>
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="mt-1"
              defaultValue={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              className="mt-1"
              defaultValue={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Analysis Type</label>
            <select name="" id="">
              <option value="">Select Type</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Analyze
          </button>
        </div>
      </form>

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
