import Link from 'next/link'

import CardList from '@/components/CardList'
import {
  getAgeFromTimestamp,
  getEtherFromWei,
  shortenAddress,
} from '@/utils/eth'

import { fetchBlockLists } from '@/services/eth'
import { CubeTransparentIcon } from '@heroicons/react/24/outline'

export default async function BlockList({ chain }: { chain: string }) {
  const data = await fetchBlockLists(15)

  return (
    <CardList
      cardHeading="Latest Blocks"
      viewAll={{
        href: '/chain/eth/blocks',
        text: 'View all blocks',
      }}
      items={data.items.slice(0, 8)}
      renderRow={(item) => {
        return (
          <li
            key={item.hash}
            className="first:pt-0 last:pb-0 last:border-b-0 flex max-sm:flex-col *:px-2 xl:*:px-3"
          >
            <div className="sm:w-1/3 flex items-start gap-x-2">
              <div className="max-sm:hidden min-w-8 h-8 xl:min-w-12 xl:h-12 rounded-lg bg-[#121212] flex justify-center items-center">
                <CubeTransparentIcon className="w-5 h-5 xl:w-6 xl:h-6 opacity-70" />
              </div>
              <div className="flex sm:flex-col items-end gap-1">
                <span className="sm:hidden text-sm">Block</span>
                <Link
                  href={'/chain/eth/block/' + item.height}
                  className="text-sm"
                >
                  {item.height}
                </Link>
                <div className="text-xs text-gray-bb">
                  {getAgeFromTimestamp(item.timestamp)}
                </div>
              </div>
            </div>
            <div className="sm:w-2/3 flex flex-wrap gap-y-1 gap-x-2 justify-between items-center">
              <div className="flex flex-col sm:gap-y-1 flex-1">
                <span className="text-sm">
                  Fee Recipient{' '}
                  <Link href={'/chain/eth/address/' + item.miner.hash}>
                    {item.miner.name || shortenAddress(item.miner.hash)}
                  </Link>
                </span>
                <span className="text-primary text-sm">
                  {item.tx_count} txns
                </span>
              </div>
              <div className="text-[10px] xl:text-xs px-2 py-[6px] border border-primary-border rounded text-end">
                {getEtherFromWei(item.rewards[0].reward, true)}
              </div>
            </div>
          </li>
        )
      }}
    />
  )
}
