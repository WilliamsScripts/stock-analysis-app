import React from 'react'
import { StockData } from '@/data/types'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { COLORS } from '@/data/constants'


type ReturnsChartProps = {
  returnsData: (Partial<StockData> & { return: number | null })[]
}

const ReturnsChart: React.FC<ReturnsChartProps> = ({ returnsData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Returns Chart</h2>
      <ResponsiveContainer height={600} width='100%'>
        <LineChart 
          width={500}
          height={300}
          data={returnsData}
        >
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey='return' stroke={COLORS.purple} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ReturnsChart