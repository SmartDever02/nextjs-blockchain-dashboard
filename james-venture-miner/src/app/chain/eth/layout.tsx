import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid';

import PriceChangeBadge from '@/components/PriceChangeBadge'
import { formatNumberWithCommas } from '@/utils/eth'

import { fetchStat } from '@/services/eth'

export default async function EtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await fetchStat();

  return (
    <>
      <section className="sticky top-0 left-0 border-b border-b-primary-border bg-dark-bg z-10">
        <div className="mx-auto container py-1 h-12 flex items-center text-xs">
          <Link href='/' className='mr-5'>
            <HomeIcon className='w-5 h-5 text-white' />
          </Link>
          <span className="text-gray-bb">ETH Price:&nbsp;</span>
          <span className="text-primary">${formatNumberWithCommas(data.coin_price)}
          <PriceChangeBadge change={data.coin_price_change_percentage}/> 
          </span>
          <span className="text-gray-bb pl-4">Gas:&nbsp;</span>
          <span className='text-primary'>{data.gas_prices.average} Gwei</span>
        </div>
      </section>
      {children}
    </>
  )
}
