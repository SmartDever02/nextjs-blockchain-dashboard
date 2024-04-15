import TransactionDetailList from '@/features/TransactionDetailList';
import Link from 'next/link';

export default async function Transactions() {

  return (
    <main className="container mx-auto pb-12">
      <section className="py-5 flex flex-col gap-y-1 border-b border-b-primary-border">
        <h1 className="font-normal text-lg">Transactions</h1>
      </section>

      <div className='mt-10 flex gap-x-2 mb-2'>
        <Link href='#validated'>Validated</Link>
        <Link href='#validated'>Pending</Link>
      </div>
      <TransactionDetailList />
    </main>
  )
}
