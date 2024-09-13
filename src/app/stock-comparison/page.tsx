'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Loading from '@/components/Loading';
import { compareStock } from '@/actions/stock-action'
import CompareStockForm from '@/components/CompareStockForm';
import React, { lazy, useState, Suspense, ComponentType } from 'react'
import type { Column, CustomTableProps } from '@/components/CustomTable';
import { CompareStockType, SelectedTickersType, ValidationErrorType } from '@/data/types';

const CompareStockChart = lazy(() => import('@/components/CompareStockChart'));
const CustomTable = lazy(() => import('@/components/CustomTable')) as ComponentType<CustomTableProps<CompareStockType>>;


const comparedColumns: Column<CompareStockType>[] = [
  { header: 'Date', accessor: 'date' },
  { header: 'Stock A', accessor: 'stockA' },
  { header: 'Stock B', accessor: 'stockB' }
];

export default function StockComparison() {
  const [comparedData, setComparedData] = useState<CompareStockType[]>([]);
  const [errors, setErrors] = useState<ValidationErrorType | undefined>(undefined);
  const [selectedTickers, setSelectedTickers] = useState<SelectedTickersType>({
    tickerA: '',
    tickerB: ''
  });

  const formSubmitAction = async (formData: FormData) => {
    setErrors(undefined)
    setComparedData([])
    const result = await compareStock(formData)
    if (Array.isArray(result)) {
      setComparedData(result); 
    } else {
      setErrors(result); 
    }
    setSelectedTickers({
      tickerA: formData.get('tickerA') as string,
      tickerB: formData.get('tickerB') as string,
    });
  }

  return (
    <div className='container mx-auto max-xl:px-4 py-10'>
      <div className='flex flex-wrap items-center gap-3 mb-10'>
        <Link href='/' className='flex items-center gap-1 bg-blue-500 rounded-lg py-2 px-3 text-md text-white'>
          <ArrowLeft />
          Home
        </Link>
        <h2 className="text-3xl font-semibold">Stock Data Comparison</h2>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <CompareStockForm {...{ formSubmitAction, errors }} />

        {comparedData.length > 0 && (
          <Suspense fallback={<Loading />}>
            <CompareStockChart {...{ comparedData, selectedTickers }} />
            <CustomTable columns={comparedColumns} data={comparedData} />
          </Suspense>
        )}
      </div>
    </div>
  )
}
