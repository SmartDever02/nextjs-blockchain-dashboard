import { fetchStat } from '@/services/eth'

import StatBoard from '@/components/StatBoard'

export default async function Stat() {
  const data = await fetchStat(60)

  return <StatBoard {...data} chain='ETH' />
}
