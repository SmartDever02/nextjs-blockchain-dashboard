import ReChart from '@/components/Chart'
import { fetchTransactionChart } from '@/services/eth'
import { fetchTransactionChart as fetchOptTransactionChart } from '@/services/eth'

interface Props {
  chain: 'OPT' | 'ETH'
}

export default async function TransactionChart(props: Props) {
  let data
  if (props.chain === 'OPT') {
    data = await fetchOptTransactionChart()
  } else {
    data = await fetchTransactionChart()
  }

  return (
    <div className="w-full h-[100px]">
      <p className="text-sm mb-4 lg:mb-6">TRANSACTION HISTORY IN 5 DAYS</p>
      <ReChart chart_data={data.chart_data.reverse()} />
    </div>
  )
}
