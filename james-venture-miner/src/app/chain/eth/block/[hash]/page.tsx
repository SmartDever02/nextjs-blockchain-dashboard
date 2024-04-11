import {
  formatNumberWithCommas,
  getAgeFromTimestamp,
  getEtherFromWei,
  getGweiFromWei,
  shortenAddress,
} from '@/utils/eth'
import Link from 'next/link'
import cx from 'classnames'
import ArrowLink from '@/components/ArrowLink'
import {
  DetailViewCardContainer,
  BlockDetailListItemWrapper as ListItemWrapper,
  BlockDetailListTitle as ListTitle,
  BlockDetailListItemValueWrapper as ListItemValueWrapper,
  BlockDetailListDivider as ListDivider,
} from '@/components/DetailViewCard'
import { fetchBlockDetail } from '@/services/eth'
import { ClockIcon, CubeTransparentIcon } from '@heroicons/react/24/outline'

export default async function BlockDetail({
  params,
}: {
  params: { hash: string }
}) {
  const data = await fetchBlockDetail(params.hash)

  return (
    <main className="container mx-auto pb-12">
      <section className="py-5 flex flex-col gap-y-1 border-b border-b-primary-border">
        <div className="flex items-end gap-x-2">
          <h1 className="font-normal text-lg">Block</h1>
          <span className="text-gray-bb text-sm leading-7">#{params.hash}</span>
        </div>
      </section>

      <DetailViewCardContainer className="mt-10">
        <ul className="*:mb-4 *:flex text-xs sm:*:text-sm">
          <ListItemWrapper>
            <ListTitle>Block Height:</ListTitle>
            <div className="sm:w-3/4 max-sm:text-xs gap-x-2 flex items-center">
              <CubeTransparentIcon className="w-4 h-4" />
              {data.height}
              <div className="flex gap-x-1">
                <ArrowLink
                  href={'/chain/eth/block/' + Number(data.height - 1)}
                  ariaLabel="View previous block"
                  direction="left"
                />
                <ArrowLink
                  href={'/chain/eth/block/' + Number(data.height + 1)}
                  ariaLabel="View next block"
                  direction="right"
                />
              </div>
            </div>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Status:</ListTitle>
            <ListItemValueWrapper>
              <div className="w-fit text-[11px] py-1 px-2 border border-[#00a186] bg-[#00a186]/10 text-[#00a186] rounded">
                Finalized
              </div>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Timestamp:</ListTitle>
            <ListItemValueWrapper>
              <p className="inline-flex items-center gap-x-1">
                <ClockIcon className="w-4 h-4 inline" />
                {`${getAgeFromTimestamp(data.timestamp)} (${new Date(
                  data.timestamp
                ).toUTCString()})`}
              </p>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Transactions:</ListTitle>
            <ListItemValueWrapper>
              <Link href="#">{data.tx_count} transactions</Link> in this block
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Withdrawals:</ListTitle>
            <ListItemValueWrapper>
              <Link href="#">{data.withdrawals_count} withdrawls</Link> in this
              block
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListDivider />
          <ListItemWrapper>
            <ListTitle>Fee Recipient:</ListTitle>
            <ListItemValueWrapper>
              <Link href={'#' + data.miner.hash}>
                {data.miner.implementation_name || data.miner.hash}
              </Link>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Block Reward:</ListTitle>
            <ListItemValueWrapper>
              {getEtherFromWei(data.rewards[0].reward, true, 20)}
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Total Difficulty:</ListTitle>
            <ListItemValueWrapper>
              {formatNumberWithCommas(data.total_difficulty)}
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Size:</ListTitle>
            <ListItemValueWrapper>
              {Number(data.size).toLocaleString('en-US')} bytes
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListDivider />
          <ListItemWrapper>
            <ListTitle>Gas Used:</ListTitle>
            <ListItemValueWrapper>
              {Number(data.gas_used).toLocaleString('en-US')} (
              {data.gas_used_percentage.toFixed(2)}%)
              <span
                className={cx(
                  'pl-5',
                  data.gas_target_percentage > 0
                    ? 'text-green-500'
                    : 'text-red-500'
                )}
              >
                {Math.round(data.gas_target_percentage)}% Gas Target
              </span>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Gas Limit:</ListTitle>
            <ListItemValueWrapper>
              {formatNumberWithCommas(data.gas_limit)}
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Base Fee Per Gas:</ListTitle>
            <ListItemValueWrapper>
              {getEtherFromWei(data.base_fee_per_gas, true, 20)}
              <span className="pl-1 text-gray-bb">
                ({getGweiFromWei(data.base_fee_per_gas, true, 20)})
              </span>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Burnt Fees:</ListTitle>
            <ListItemValueWrapper>
              <span>🔥 </span>
              {getEtherFromWei(data.burnt_fees, true, 20)}
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListDivider />
          <ListItemWrapper>
            <ListTitle>Hash:</ListTitle>
            <ListItemValueWrapper>{data.hash}</ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Parent Hash:</ListTitle>
            <ListItemValueWrapper>
              <Link href={'/chain/eth/block/' + data.parent_hash}>
                {data.parent_hash}
              </Link>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Nonce:</ListTitle>
            <ListItemValueWrapper>{data.nonce}</ListItemValueWrapper>
          </ListItemWrapper>
        </ul>
      </DetailViewCardContainer>

      <p className="mt-4 text-xs text-gray-bb">
        Blocks are batches of transactions linked via cryptographic hashes. Any
        tampering of a block would invalidate all following blocks as all
        subsequent hashes would change.
      </p>
    </main>
  )
}
