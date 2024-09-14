import React from 'react'
import { CompareStockType, SelectedTickersType } from '@/data/types';
import { Bar, BarChart, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { COLORS } from '@/data/constants';

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
        <Bar dataKey='stockA' name={selectedTickers.tickerA} fill={COLORS.purple} activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey='stockB' name={selectedTickers.tickerB} fill={COLORS.green} activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CompareStockChart