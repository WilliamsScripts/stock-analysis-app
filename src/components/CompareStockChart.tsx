import React from 'react'
import { CompareStockType, SelectedTickersType } from '@/data/types';
import { Bar, BarChart, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type CompareStockChartProps = {
  comparedData: CompareStockType[]
  selectedTickers: SelectedTickersType
}

const CompareStockChart: React.FC<CompareStockChartProps> = ({ comparedData, selectedTickers }) => {
  return (
    <ResponsiveContainer height={600} width='100%'>
      <BarChart data={comparedData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='stockA' name={selectedTickers.tickerA} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey='stockB' name={selectedTickers.tickerB} fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CompareStockChart