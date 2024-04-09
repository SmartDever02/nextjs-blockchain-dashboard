'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface PropsType {
  chart_data: Array<{ data: string; tx_count: number }>
}

export default function ReChart({ chart_data }: PropsType) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chart_data}>
        <Tooltip
          cursor={{
            stroke: 'white',
            opacity: '0.4',
            strokeWidth: 2,
            strokeDasharray: '5 5',
          }}
          contentStyle={{
            background: '#111',
            border: '1px solid #222222',
            borderRadius: '4px',
          }}
          itemStyle={{ fontSize: '12px' }}
          formatter={(value) => [
            Math.floor(Number(value) / 1000) + 'K',
            'Transactions',
          ]}
        />
        <XAxis dataKey={'date'} style={{ fontSize: '12px' }} hide />
        <YAxis domain={['auto', 'auto']} hide />
        <Line
          type="monotone"
          dataKey="tx_count"
          stroke="#bbb"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
