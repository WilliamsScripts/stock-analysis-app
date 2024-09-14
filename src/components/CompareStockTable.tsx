import React from 'react'
import CustomTable, { Column } from './CustomTable'
import { CompareStockType, SelectedTickersType } from '@/data/types';

type CompareStockTableProps = {
  comparedData: CompareStockType[]
  selectedTickers: SelectedTickersType
}

const CompareStockTable: React.FC<CompareStockTableProps> = ({ comparedData, selectedTickers }) => {
  const comparedColumns: Column<CompareStockType>[] = [
    { header: 'Date', accessor: 'date' },
    { header: selectedTickers.tickerA || 'Stock A', accessor: 'stockA' }, // Use ticker A
    { header: selectedTickers.tickerB || 'Stock B', accessor: 'stockB' }  // Use ticker B
  ];

  return (
    <CustomTable columns={comparedColumns} data={comparedData} />
  )
}

export default CompareStockTable