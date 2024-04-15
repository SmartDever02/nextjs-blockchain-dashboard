import { fetchStat } from '@/services/optimism'
import StatBoard from '@/components/StatBoard'

export default async function OptimismStat() {
  const data = await fetchStat(60)

  return <StatBoard {...data} chain='OPT' />
}
