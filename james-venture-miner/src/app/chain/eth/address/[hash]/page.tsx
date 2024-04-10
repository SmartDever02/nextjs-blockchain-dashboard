import Link from 'next/link'

import { DetailViewCardContainer } from '@/components/DetailViewCard'
import { getEtherFromWei, shortenAddress } from '@/utils/eth'

import { fetchAccount } from '@/services/eth'


export default async function AccountDetail({
  params,
}: {
  params: { hash: string }
}) {
  const data = await fetchAccount(params.hash);

  return (
    <main className="container mx-auto pb-12">
      <section className="py-5 flex flex-col gap-y-1 border-b border-b-primary-border">
        <div className="flex items-end gap-x-2">
          <h1 className="font-normal text-lg">Contract</h1>
          <span className="text-gray-bb text-sm leading-7">{params.hash}</span>
        </div>
      </section>

      <div className="mt-10 grid grid-cols-3 gap-x-2">
        <DetailViewCardContainer>
          <div className="flex flex-col gap-5 text-sm">
            <div className="font-semibold">Overview</div>
            <div>
              <p className="text-gray-bb text-xs mb-1">ETH BALANCE</p>
              <p>{getEtherFromWei(data.coin_balance, true, 20)}</p>
            </div>
            <div>
              <p className="text-gray-bb text-xs mb-1">ETH VALUE</p>
              <p>{getEtherFromWei(data.coin_balance, true, 20)}</p>
            </div>
          </div>
        </DetailViewCardContainer>

        <DetailViewCardContainer>
          <div className="flex flex-col gap-5 text-sm">
            <div className="font-semibold">More Info</div>
            {data.creator_address_hash && data.creation_tx_hash && (
              <div>
                <p className="text-gray-bb text-xs mb-1">CONTRACT CREATOR</p>
                <p>
                  <Link
                    href={'/chain/eth/address/' + data.creator_address_hash}
                  >
                    {shortenAddress(data.creator_address_hash)}
                  </Link>{' '}
                  at txn{' '}
                  <Link href={'/chain/eth/tx/' + data.creation_tx_hash}>
                    {shortenAddress(data.creation_tx_hash)}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </DetailViewCardContainer>
      </div>
    </main>
  )
}
