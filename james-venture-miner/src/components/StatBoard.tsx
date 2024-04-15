import cx from 'classnames'
import { PropsWithChildren, Suspense } from 'react'
import Image from 'next/image'

import TransactionChart from '@/features/TransactionChart'
import {
  ArrowsRightLeftIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

import { formatNumberWithCommas } from '@/utils/eth'
import PriceChangeBadge from '@/components/PriceChangeBadge'
import { IEtherStat } from '@/types/eth.stat'

interface IStatBoard extends IEtherStat {
  chain: 'ETH' | 'OPT'
}

export default function StatBoard(props: IStatBoard) {
  return (
    <StatContainer>
      <EtherPriceMarketContainer>
        <StatItem
          imageSrc={
            'https://etherscan.io/images/svg/brands/ethereum-original-light.svg'
          }
          imageAlt="eth"
          label="ETHER PRICE"
          value={() => (
            <p className="text-sm">
              ${props.coin_price}
              <PriceChangeBadge change={props.coin_price_change_percentage} />
            </p>
          )}
        />
        <StatHorizontalDivider />
        <StatItem
          svgNode={<GlobeAltIcon className="w-6 h-6" />}
          label="MARKET CAP"
          value={() => (
            <p className="text-sm">
              $
              {Number(props.market_cap).toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        />
      </EtherPriceMarketContainer>
      <TransactionBlockContainer>
        <StatItem
          svgNode={<ArrowsRightLeftIcon className="w-6 h-6" />}
          label="TRANSACTIONS"
          value={() => (
            <p className="text-sm">
              {formatNumberWithCommas(props.total_transactions)}
            </p>
          )}
          renderMore={() => (
            <div className="ml-auto flex flex-col items-end text-end">
              <ItemTitleGrayXs>MED GAS PRICE</ItemTitleGrayXs>
              <p className="text-sm">{props.gas_prices.average} Gwei</p>
            </div>
          )}
        />
        <StatHorizontalDivider />
        <StatItem
          svgNode={<CubeTransparentIcon className="w-6 h-6" />}
          label="LAST FINALIZED BLOCK"
          value={() => (
            <p className="text-sm">
              {formatNumberWithCommas(props.total_blocks)}
            </p>
          )}
        />
      </TransactionBlockContainer>
      <TransactionHistoryContainer>
        <Suspense fallback={<>Loading history...</>}>
          <TransactionChart chain={props.chain} />
        </Suspense>
      </TransactionHistoryContainer>
    </StatContainer>
  )
}

interface StatItemProps {
  imageSrc?: string
  imageAlt?: string
  svgNode?: React.ReactNode
  label: string
  value: () => React.ReactNode | React.ReactNode
  renderMore?: () => React.ReactNode
}

function StatItem(props: StatItemProps) {
  return (
    <div className="flex items-center gap-x-3">
      {props.imageSrc && (
        <Image
          src={props.imageSrc}
          alt={props.imageAlt || ''}
          width={48}
          height={48}
          className="bg-[#121212] rounded-md p-2 xl:p-3 w-8 h-8 xl:w-12 xl:h-12"
          quality={100}
          draggable={false}
        />
      )}

      {props.svgNode && (
        <div className="bg-[#121212] w-8 h-8 xl:w-12 xl:h-12 rounded-md p-2 xl:p-3 flex items-center justify-center">
          {props.svgNode}
        </div>
      )}

      <div className={cx(props.renderMore ? '' : 'flex-grow')}>
        <ItemTitleGrayXs>{props.label}</ItemTitleGrayXs>
        {typeof props.value === 'function' ? props.value() : props.value}
      </div>

      {props.renderMore && props.renderMore()}
    </div>
  )
}

function ItemTitleGrayXs(props: PropsWithChildren) {
  return <p className="text-xs text-gray-bb uppercase">{props.children}</p>
}

function StatHorizontalDivider() {
  return <hr className="my-5 border-primary-border" />
}

function StatContainer(props: PropsWithChildren) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-dark-bg border border-primary-border shadow-primary-card rounded-2xl p-5 sm:*:border-r *:border-r-primary-border">
      {props.children}
    </section>
  )
}

function EtherPriceMarketContainer(props: PropsWithChildren) {
  return <div className="flex flex-col sm:pr-5">{props.children}</div>
}

function TransactionBlockContainer(props: PropsWithChildren) {
  return (
    <div className="md:px-5 max-lg:!border-r-0 max-lg:!pr-0 max-sm:mt-5 max-sm:pt-5 max-sm:border-t max-sm:border-t-primary-border">
      {props.children}
    </div>
  )
}

function TransactionHistoryContainer(props: PropsWithChildren) {
  return (
    <div className="lg:pl-5 !border-r-0 sm:max-lg:col-span-2 max-lg:mt-5 max-lg:border-t max-lg:border-t-primary-border max-lg:pt-5 max-lg:pb-6">
      {props.children}
    </div>
  )
}

export function StatLoadingUI() {
  const skeletonP = (
    <p className="w-24 h-5 rounded bg-card-bg animate-pulse"></p>
  )
  return (
    <StatContainer>
      <EtherPriceMarketContainer>
        <StatItem
          imageSrc={
            'https://etherscan.io/images/svg/brands/ethereum-original-light.svg'
          }
          imageAlt="eth"
          label="ETHER PRICE"
          value={() => skeletonP}
        />
        <StatHorizontalDivider />
        <StatItem
          svgNode={<GlobeAltIcon className="w-6 h-6" />}
          label="MARKET CAP"
          value={() => skeletonP}
        />
      </EtherPriceMarketContainer>
      <TransactionBlockContainer>
        <StatItem
          svgNode={<ArrowsRightLeftIcon className="w-6 h-6" />}
          label="TRANSACTIONS"
          value={() => skeletonP}
          renderMore={() => (
            <div className="ml-auto flex flex-col items-end">
              <ItemTitleGrayXs>MED GAS PRICE</ItemTitleGrayXs>
              {skeletonP}
            </div>
          )}
        />
        <StatHorizontalDivider />
        <StatItem
          svgNode={<CubeTransparentIcon className="w-6 h-6" />}
          label="LAST FINALIZED BLOCK"
          value={() => skeletonP}
        />
      </TransactionBlockContainer>
      <TransactionHistoryContainer></TransactionHistoryContainer>
    </StatContainer>
  )
}
