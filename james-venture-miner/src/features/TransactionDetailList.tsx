import { BorderedLink } from '@/components/ArrowLink'
import { CardWrapper } from '@/components/CardList'
import { fetchTransactionLists } from '@/services/eth'
import { shortenAddress } from '@/utils/eth'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Props {
  address?: string
  p?: number
}

export default async function TransactionDetailList(props: Props) {
  const data = await fetchTransactionLists()

  console.log('txns: ', data)

  return (
    <CardWrapper>
      <div className="p-4 flex justify-end text-xs gap-x-1">
        <BorderedLink href="?p=0">
          First
          <span className="sr-only">First</span>
        </BorderedLink>

        <BorderedLink href="?p=0" ariaLabel="Previous" square>
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="sr-only">Previous</span>
        </BorderedLink>

        <span className="border border-primary-border rounded text-gray-bb py-1 px-2">
          {`Page ${props.p || 1}`}
        </span>

        <BorderedLink href="?p=0" ariaLabel="Next" square>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="sr-only">Next</span>
        </BorderedLink>

        <BorderedLink href="?p=10000">
          Last
          <span className="sr-only">Last</span>
        </BorderedLink>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="*:p-2 *:text-left">
            <th className='first:pl-4'>No</th>
            <th>Txn hash</th>
            <th>Type</th>
            <th>Method</th>
            <th>Block</th>
            <th>From/To</th>
            <th>Value ETH</th>
            <th className='last:pr-4 last:text-right'>Fee ETH</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.hash} className="*:p-2">
              <td></td>
              <td>
                <Link href={'/chain/eth/tx/' + item.hash}>
                  {shortenAddress(item.hash, 10, 4)}
                </Link>
              </td>
              <td className='capitalize'>{item.tx_types[0]?.replaceAll("_", " ")}</td>
              <td>
                {item.method}
              </td>
              <td>{item.block}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardWrapper>
  )
}
