import React from 'react'
import CustomTable, { Column } from './CustomTable'
import { CompareStockType } from '@/data/types';

const comparedColumns: Column<CompareStockType>[] = [
  { header: 'Date', accessor: 'date' },
  { header: 'Stock A', accessor: 'stockA' },
  { header: 'Stock B', accessor: 'stockB' }
];

type CompareStockTableProps = {
  comparedData: CompareStockType[]
}

const CompareStockTable: React.FC<CompareStockTableProps> = ({ comparedData }) => {
  return (
    <CustomTable columns={comparedColumns} data={comparedData} />
  )
}

export default CompareStockTable