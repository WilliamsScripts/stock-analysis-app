import React from 'react'
import CustomTable, { Column } from './CustomTable';
import { StockData } from '@/data/types';

const returnsColumns: Column<(Partial<StockData> & { return: number | null })>[] = [
  { header: 'Date', accessor: 'Date' },
  { header: 'Return', accessor: 'return' },
  { header: 'Ticker', accessor: 'ticker' }
];

type ReturnsDataTableProps = {
  returnsData: (Partial<StockData> & { return: number | null })[]
}

const ReturnsDataTable: React.FC<ReturnsDataTableProps> = ({ returnsData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Returns Data</h2>
      <CustomTable columns={returnsColumns} data={returnsData} />
    </div>
  )
}

export default ReturnsDataTable