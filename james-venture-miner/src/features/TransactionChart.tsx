import ReChart from '@/components/Chart'

export default async function TransactionChart() {
  const response = await fetch(
    `https://eth.blockscout.com/api/v2/stats/charts/transactions`,
    {
      next: { revalidate: 3600 },
    }
  )
  const data = await response.json()

  return (
    <div className="w-full h-[100px]">
      <p className="text-sm mb-4 lg:mb-6">TRANSACTION HISTORY IN 5 DAYS</p>
      <ReChart chart_data={data.chart_data.reverse()} />
    </div>
  )
}
