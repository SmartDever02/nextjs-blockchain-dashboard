import {
  DetailViewCardContainer,
  BlockDetailListItemWrapper as ListItemWrapper,
  BlockDetailListTitle as ListTitle,
  BlockDetailListItemValueWrapper as ListItemValueWrapper,
  BlockDetailListDivider as ListDivider,
} from '@/components/DetailViewCard'

import {
  getAgeFromTimestamp,
  getEtherFromWei,
  getGweiFromWei,
} from '@/utils/eth'
import Link from 'next/link'

export default async function TransactionDetail({
  params,
}: {
  params: { hash: string }
}) {
  const res = await fetch(
    `https://eth.blockscout.com/api/v2/transactions/${params.hash}`
  )
  const data = await res.json()

  return (
    <main className="container mx-auto pb-12">
      <section className="py-5 flex flex-col gap-y-1 border-b border-b-primary-border">
        <div className="flex items-end gap-x-2">
          <h1 className="font-normal text-lg">Transaction Detail</h1>
        </div>
      </section>

      <DetailViewCardContainer className='mt-10'>
        <ul className="*:mb-4 *:flex text-xs sm:*:text-sm">
          <ListItemWrapper>
            <ListTitle>Transaction Hash:</ListTitle>
            <ListItemValueWrapper>{data.hash}</ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Status:</ListTitle>
            <ListItemValueWrapper>
              <div className="w-fit text-[11px] py-1 px-2 border border-[#00a186] bg-[#00a186]/10 text-[#00a186] rounded capitalize">
                {data.result}
              </div>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Block:</ListTitle>
            <ListItemValueWrapper>
              <Link href={'/chain/eth/block/' + data.block}>{data.block}</Link>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Timestamp:</ListTitle>
            <ListItemValueWrapper>
              {getAgeFromTimestamp(data.timestamp)}
              <span className="pl-1">
                ({new Date(data.timestamp).toUTCString()})
              </span>
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListDivider />
          <ListItemWrapper>
            <ListTitle>Sponsored:</ListTitle>
          </ListItemWrapper>
          <ListDivider />
          <ListItemWrapper>
            <ListTitle>From:</ListTitle>
            <ListItemValueWrapper>
              <Link href={'/chain/eth/address/' + data.from.hash}>
                {data.from.ens_domain_name || data.from.hash}
              </Link>
            </ListItemValueWrapper>
          </ListItemWrapper>

          <ListItemWrapper>
            <ListTitle>To:</ListTitle>
            <ListItemValueWrapper>
              {data.to && (
                <Link href={'/chain/eth/address/' + data.to.hash}>
                  {data.to.ens_domain_name || data.to.hash}
                </Link>
              )}

              {data.created_contract && (
                <span>
                  {`[ `}
                  <Link
                    href={'/chain/eth/address/' + data.created_contract.hash}
                  >
                    {data.created_contract.ens_domain_name ||
                      data.created_contract.hash}
                  </Link> Created
                  {` ]`}
                </span>
              )}
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListDivider />
          <ListItemWrapper>
            <ListTitle>Value:</ListTitle>
            <ListItemValueWrapper>{getEtherFromWei(data.value, true, 20)}</ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Transaction Fee:</ListTitle>
            <ListItemValueWrapper>
              {getEtherFromWei(data.fee.value, true, 20)}
            </ListItemValueWrapper>
          </ListItemWrapper>
          <ListItemWrapper>
            <ListTitle>Gas Price:</ListTitle>
            <ListItemValueWrapper>
              {getGweiFromWei(data.gas_price, true, 20)}
              <span className="text-gray-bb pl-1">
                ({getEtherFromWei(data.gas_price, true, 20)})
              </span>
            </ListItemValueWrapper>
          </ListItemWrapper>
        </ul>
      </DetailViewCardContainer>
    </main>
  )
}
