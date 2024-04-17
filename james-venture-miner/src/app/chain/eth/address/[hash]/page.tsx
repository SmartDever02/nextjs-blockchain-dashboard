import Link from 'next/link'
import Image from 'next/image'

import { DetailViewCardContainer } from '@/components/DetailViewCard'
import {
  formatNumberWithCommas,
  getEtherFromWei,
  shortenAddress,
} from '@/utils/eth'

import { fetchAccountCounterInfo, fetchAccountInfo } from '@/services/eth'
import { Suspense, type PropsWithChildren } from 'react'
import {
  ArrowTrendingUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import TransactionDetailList from '@/features/TransactionAllList'
import Spinner from '@/components/Spinner'

export default async function AccountDetail({
  params,
}: {
  params: { hash: string }
}) {
  const data = await fetchAccountInfo(params.hash)
  const counterData = await fetchAccountCounterInfo(params.hash)

  const animatableIconClass =
    'opacity-20 translate-x-5 translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-50 group-hover:scale-110 transition-all duration-300 w-20 h-20 absolute bottom-0 right-0'

  return (
    <main className="container mx-auto pb-12">
      <section className="py-5 flex flex-col gap-y-1 border-b border-b-primary-border">
        <div className="flex flex-col sm:flex-row sm:items-end gap-2">
          <h1 className="font-normal text-lg">Contract</h1>
          <span className="text-gray-bb text-sm leading-7">{params.hash}</span>
        </div>
      </section>

      <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3">
        <DetailViewCardContainer className="relative group overflow-hidden">
          <AddressInfoCard heading="Overview">
            <div>
              <InfoTitle>ETH BALANCE</InfoTitle>
              <p>{getEtherFromWei(data.coin_balance, true, 20)}</p>
            </div>
            <div>
              <InfoTitle>ETH VALUE</InfoTitle>
              <p>
                $
                {Number(
                  (
                    Number(getEtherFromWei(data.coin_balance, false, 20)) *
                    Number(data.exchange_rate)
                  ).toFixed(2)
                ).toLocaleString('en-US')}
                {` @( $${data.exchange_rate}/ETH)`}
              </p>
            </div>
          </AddressInfoCard>
          <Image
            src={`https://etherscan.io/images/svg/brands/ethereum-original-light.svg`}
            alt="ethereum"
            width={80}
            height={80}
            draggable={false}
            quality={100}
            className={animatableIconClass}
          />
        </DetailViewCardContainer>

        <DetailViewCardContainer className="relative group overflow-hidden">
          <AddressInfoCard heading="More Info">
            {/* Contract creation */}
            {data.creator_address_hash && data.creation_tx_hash && (
              <div>
                <InfoTitle>CONTRACT CREATOR</InfoTitle>
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

            {/* Last balance update */}
            {
              <div>
                <InfoTitle>Last balance update</InfoTitle>
                <Link
                  href={
                    '/chain/eth/block/' + data.block_number_balance_updated_at
                  }
                >
                  {data.block_number_balance_updated_at}
                </Link>{' '}
              </div>
            }
          </AddressInfoCard>
          <InformationCircleIcon className={animatableIconClass} />
        </DetailViewCardContainer>

        <DetailViewCardContainer className="relative group overflow-hidden sm:col-span-2 lg:col-span-1">
          <AddressInfoCard heading="Counting Info">
            <div className="flex flex-col gap-y-2">
              <div>
                <InfoTitle>Gas usage</InfoTitle>
                {formatNumberWithCommas(counterData.gas_usage_count)}
              </div>

              <div>
                <InfoTitle>Token Transfers</InfoTitle>
                {formatNumberWithCommas(counterData.token_transfers_count)}
              </div>

              <div>
                <InfoTitle>Transactions</InfoTitle>
                {formatNumberWithCommas(counterData.transactions_count)}
              </div>
            </div>
          </AddressInfoCard>
          <ArrowTrendingUpIcon
            className={`-rotate-[125deg] ${animatableIconClass}`}
          />
        </DetailViewCardContainer>
      </section>

      <section className="mt-10">
        <Suspense
          fallback={
            <div className='pt-20 sm:pt-40 w-full flex justify-center'>
              <Spinner />
            </div>
          }
        >
          <TransactionDetailList address={params.hash} filter="from | to" />
        </Suspense>
      </section>
    </main>
  )
}

interface Props extends PropsWithChildren {
  heading: string
}

function AddressInfoCard(props: Props) {
  return (
    <div className="flex flex-col gap-5 text-sm sticky z-10">
      <div className="font-semibold">{props.heading}</div>
      {props.children}
    </div>
  )
}

function InfoTitle(props: PropsWithChildren) {
  return <p className="text-sm mb-1 text-gray-bb">{props.children}</p>
}
