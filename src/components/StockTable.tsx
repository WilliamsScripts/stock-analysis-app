import React from 'react'
import CustomTable, { Column } from './CustomTable';
import { StockData } from '@/data/types';

const stockColumns: Column<StockData>[] = [
  { header: 'Date', accessor: 'Date' },
  { header: 'Open', accessor: 'open' },
  { header: 'High', accessor: 'high' },
  { header: 'Low', accessor: 'low' },
  { header: 'Close', accessor: 'close' },
  { header: 'Volume', accessor: 'volume' },
  { header: 'Ticker', accessor: 'ticker' }
];

type StockTableProps = {
  stockData: StockData[]
}

const StockTable: React.FC<StockTableProps> = ({ stockData }) => {
  return (
    <CustomTable columns={stockColumns} data={stockData} />
  )
}

export default StockTable