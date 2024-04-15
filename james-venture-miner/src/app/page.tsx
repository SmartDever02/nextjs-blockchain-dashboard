import EthStat from '@/features/Stat'
import OptimismStat from '@/features/Stat.Optimism'
import ChainSelectLink from '@/components/ChainSelectLink'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-5 sm:px-20 2xl:px-24">
      <h1 className="mb-20 text-4xl sm:text-5xl font-semibold">Venture Miner</h1>
      <section className="w-full grid xl:grid-cols-4 gap-4">
        <ChainSelectLink
          href={'/chain/eth'}
          chainName={'Ethereum'}
          imageSrc={
            'https://cdn.worldvectorlogo.com/logos/ethereum-eth.svg'
          }
          description={
            'Explore and search the Ethereum blockchain for transactions, addresses, tokens, prices.'
          }
        />

        <div className="xl:col-span-3">
          <EthStat />
        </div>
      </section>

      <section className="mt-20 w-full grid xl:grid-cols-4 gap-4">
        <ChainSelectLink
          href={'/chain/opt'}
          chainName={'Optimism'}
          imageSrc={
            'https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg'
          }
          description={
            'Explore and search the Optimism (Ethereum L2) for transactions, addresses, tokens, prices.'
          }
        />
        <div className="xl:col-span-3">
          <OptimismStat />
        </div>
      </section>
    </main>
  )
}
