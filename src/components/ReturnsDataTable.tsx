import React from 'react'
import CustomTable, { Column } from './CustomTable';
import { StockData } from '@/data/types';

const returnsColumns: Column<StockData & { return: number | null }>[] = [
  { header: 'Date', accessor: 'Date' },
  { header: 'Return', accessor: 'return' },
  { header: 'Ticker', accessor: 'ticker' }
];

type ReturnsDataTableProps = {
  returnsData: (StockData & { return: number | null })[]
}

const ReturnsDataTable: React.FC<ReturnsDataTableProps> = ({ returnsData }) => {
  return (
    <CustomTable columns={returnsColumns} data={returnsData} />
  )
}

export default ReturnsDataTable