import FilterLink from '@/components/FilterLink'
import TransactionDetailList from '@/features/TransactionDetailList'

export default async function Transactions({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const filter = searchParams?.filter?.toString();

  return (
    <main className="container mx-auto pb-12">
      <section className="py-5 flex flex-col gap-y-1 border-b border-b-primary-border">
        <h1 className="font-normal text-lg">Transactions</h1>
      </section>

      <div className="mt-10 flex gap-x-2 mb-5">
        <FilterLink isCurrentFilter={filter === 'validated'} href='/chain/eth/txs?filter=validated'>
          Validated
        </FilterLink>
        <FilterLink isCurrentFilter={filter === 'pending'} href='/chain/eth/txs?filter=pending'>
        Pending
        </FilterLink>
      </div>
      <TransactionDetailList
        p={searchParams?.p?.toString()}
        index={searchParams?.index?.toString()}
        block_number={searchParams?.block_number?.toString()}
      />
    </main>
  )
}
