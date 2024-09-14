'use client'
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Loading from '@/components/Loading';
import React, { lazy, Suspense } from 'react';
import { useStockHook } from '@/hooks/useStockHook';
import GetStockForm from '@/components/GetStockForm';

const StockTable = lazy(() => import('@/components/StockTable'));
const ReturnsDataTable = lazy(() => import('@/components/ReturnsDataTable'));
const ReturnsChart = lazy(() => import('@/components/ReturnsChart'));


export default function Home() {
  const {
    stockData,
    returnsData,
    ticker,
    errors,
    fetchDataAction,
    handleTickerSelect
  } = useStockHook()

  return (
    <div className="container mx-auto p-6">
      <div className='flex items-center justify-between flex-wrap gap-3 mb-5'>
        <h1 className="text-3xl font-bold">Stock Analysis</h1>
        <Link href='/stock-comparison' className='flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-md'>
          Compare Stock
          <ArrowRight />
        </Link>
      </div>

      <GetStockForm {...{ fetchDataAction, errors, ticker, handleTickerSelect }} />

      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-10 my-6">
        {/* Display stock data */}
        {stockData?.length > 0 && (
          <Suspense fallback={<Loading />}>
            <StockTable {...{ stockData }} />
          </Suspense>
        )}

        {/* Display returns data */}
        {returnsData?.length > 0 && (
          <Suspense fallback={<Loading />}>
            <ReturnsDataTable {...{ returnsData }} />
          </Suspense>
        )}

        {/* Display returns data chart */}
        {returnsData?.length > 0 && (
          <div className='col-span-2'>
            <Suspense fallback={<Loading />}>
              <ReturnsChart {...{ returnsData }} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
