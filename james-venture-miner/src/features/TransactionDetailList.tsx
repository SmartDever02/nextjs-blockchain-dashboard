import { CardWrapper } from '@/components/CardList'
import { fetchTransactionLists } from '@/services/eth'
import { getAgeFromTimestamp, getEtherFromWei, getGweiFromWei, shortenAddress } from '@/utils/eth'
import {
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { BackHistoryBorderedLink, BorderedLink } from './ArrowLink'

interface Props {
  filter?: 'pending' | 'validated'
  address?: string
  p?: string
  items_count?: number
  index?: string
  block_number?: string
}

export default async function TransactionDetailList(props: Props) {
  const data = await fetchTransactionLists({
    filter: props.filter || 'validated',
    init: {
      cache: 'no-store',
    },
  })
  const { block_number, index, items_count } = data?.next_page_params || {}

  return (
    <CardWrapper>
      <div className="p-4 flex justify-end text-sm gap-x-1">
        <BorderedLink href="#">
          First
          <span className="sr-only">First</span>
        </BorderedLink>

        <BackHistoryBorderedLink href='' ariaLabel="Previous" square>
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="sr-only">Previous</span>
        </BackHistoryBorderedLink>

        <span className="border border-primary-border rounded text-gray-bb py-1 px-2">
          {`Page ${props.p || 1}`}
        </span>

        <BorderedLink
          href={`?p=${
            Number(props.p || 0) + 1
          }&block_number=${block_number}&index=${index}&items_count=${items_count}`}
          ariaLabel="Next"
          square
        >
          <ChevronRightIcon className="w-4 h-4" />
          <span className="sr-only">Next</span>
        </BorderedLink>
      </div>

      <table className="w-full text-sm border-t border-t-primary-border">
        <thead className="border-b border-b-primary-border">
          <tr className="*:p-2 *:text-left">
            <th className="first:pl-4">Txn hash</th>
            <th>Type</th>
            <th>Method</th>
            <th>Block</th>
            <th>From/To</th>
            <th>Value ETH</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.hash} className="*:p-2">
              <td className="first:pl-4">
                <Link href={'/chain/eth/tx/' + item.hash}>
                  {shortenAddress(item.hash, 10, 4)}
                </Link>
                <div className="text-xs text-gray-bb">
                  {getAgeFromTimestamp(item.timestamp)}
                </div>
              </td>
              <td className="capitalize">
                {item.tx_types[0]?.replaceAll('_', ' ')}
              </td>
              <td>{item.method}</td>
              <td>
                <Link href={'/chain/eth/block/' + item.block}>
                  {item.block}
                </Link>
              </td>
              <td className="flex gap-x-2">
                <ArrowDownIcon className="w-4 h-4 mt-[2px]" />
                <div className="flex flex-col gap-1">
                  <Link href={'#'}>
                    <span>
                      {item.from.name || shortenAddress(item.from.hash, 10, 6)}
                    </span>
                  </Link>
                  <Link href={'#'}>
                    <span>{item.to.name || shortenAddress(item.to.hash, 10, 6)}</span>
                  </Link>
                </div>
              </td>
              <td>
                {getEtherFromWei(item.value, true, 10)}
              </td>
              <td className='last:pr-4'>
                {getGweiFromWei(item.gas_used, true)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardWrapper>
  )
}
