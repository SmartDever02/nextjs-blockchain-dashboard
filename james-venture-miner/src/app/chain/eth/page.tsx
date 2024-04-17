import { Suspense } from 'react'
import { StatLoadingUI } from '@/components/StatBoard'

import Stat from '@/features/Stat'
import TransactionList from '@/features/TransactionList'
import BlockList from '@/features/BlockList'
import Banner from '@/features/Banner'
import Spinner from '@/components/Spinner'

export default async function Ethereum() {
  return (
    <main className="pb-32">
      <Banner />
      <main className="container mx-auto -translate-y-10">
        <Suspense fallback={<StatLoadingUI />}>
          <Stat />
        </Suspense>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-x-4 xl:gap-x-10 gap-y-8">
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <BlockList />
          </Suspense>

          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <TransactionList />
          </Suspense>
        </section>
      </main>
    </main>
  )
}
