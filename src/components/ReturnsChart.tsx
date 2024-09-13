import React from 'react'
import { StockData } from '@/data/types'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


type ReturnsChartProps = {
  returnsData: (StockData & { return: number | null })[]
}

const ReturnsChart: React.FC<ReturnsChartProps> = ({ returnsData }) => {
  const labels = returnsData.map((entry) => entry.Date);
  const data = returnsData.map((entry) => entry.return ? entry.return * 100 : 0);

  return (
    <ResponsiveContainer height={600} width='100%'>
      <LineChart 
        width={500}
        height={300}
        data={returnsData}
      >
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey='return' stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ReturnsChart