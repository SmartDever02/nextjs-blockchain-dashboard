import Link from 'next/link'

import CardList from '@/components/CardList'
import { getAgeFromTimestamp, shortenAddress } from '@/utils/eth'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'

import { fetchTransactionLists } from '@/services/eth'

export default async function TransactionList({ chain }: { chain: string }) {
  const { items } = await fetchTransactionLists(10)

  return (
    <CardList
      cardHeading="Latest Transactions"
      viewAll={{
        href: '/chain/eth/txs',
        text: 'View all transactions',
      }}
      items={items.slice(0, 8)}
      renderRow={(item) => (
        <li
          key={item.hash}
          className="first:pt-0 last:pb-0 last:border-b-0 flex max-sm:flex-col *:px-3"
        >
          <div className="sm:w-1/3 lg:w-5/12 flex items-center gap-x-2">
            <div className="max-sm:hidden min-w-8 h-8 xl:min-w-12 xl:h-12 rounded-lg bg-[#121212] flex justify-center items-center">
              <ArrowsRightLeftIcon className="w-5 h-5 xl:w-6 xl:h-6 opacity-70" />
            </div>
            <div className="flex sm:flex-col gap-1 max-sm:items-end">
              <span className="sm:hidden text-sm">TX#</span>
              <Link href={'/chain/eth/tx/' + item.hash} className="text-sm">
                {shortenAddress(item.hash)}
              </Link>
              <div className="text-xs text-gray-bb">
                {getAgeFromTimestamp(item.timestamp)}
              </div>
            </div>
          </div>
          <div className="sm:w-2/3 xl:w-7/12 flex justify-between items-center">
            <div className="flex flex-col gap-y-1">
              <span className="text-sm">
                From{' '}
                <Link href={'/chain/eth/address/' + item.from.hash}>
                  {shortenAddress(item.from.hash)}
                </Link>
              </span>
              <span className="text-sm">
                To{' '}
                <Link href={'/chain/eth/address/' + item.to.hash}>
                  {shortenAddress(item.to.hash)}
                </Link>
              </span>
            </div>
            <div className="text-[10px] xl:text-xs px-2 py-[6px] border border-primary-border rounded">
              {item.value} ETH
            </div>
          </div>
        </li>
      )}
    />
  )
}
