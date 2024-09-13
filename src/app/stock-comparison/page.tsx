'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Loading from '@/components/Loading';
import React, { lazy, Suspense } from 'react'
import useStockHook from '@/hooks/useStockHook';
import CompareStockForm from '@/components/CompareStockForm';

const CompareStockChart = lazy(() => import('@/components/CompareStockChart'));
const CompareStockTable = lazy(() => import('@/components/CompareStockTable'));


export default function StockComparison() {
  const {
    errors,
    comparedData,
    selectedTickers,
    compareStockAction 
  } = useStockHook()

  return (
    <div className='container mx-auto max-xl:px-4 py-10'>
      <div className='flex flex-wrap items-center gap-3 mb-10'>
        <Link href='/' className='flex items-center gap-1 text-blue-500 rounded-lg py-2 px-3 text-md'>
          <ArrowLeft />
          Home
        </Link>
        <h2 className="text-3xl font-semibold">Stock Data Comparison</h2>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <CompareStockForm {...{ compareStockAction, errors }} />

        {comparedData.length > 0 && (
          <Suspense fallback={<Loading />}>
            <CompareStockChart {...{ comparedData, selectedTickers }} />
            <CompareStockTable {...{ comparedData }} />
          </Suspense>)}
      </div>
    </div>
  )
}
