import { fetchTransactionLists } from '@/services/eth'
import TransactionlistTable from '@/components/TransactionListTable'

export interface ITransactionAllList {
  filter?: 'pending' | 'validated' | 'from | to'
  address?: string
  p?: string
  items_count?: number
  index?: number
  block_number?: number
}

export default async function TransactionAllList(props: ITransactionAllList) {
  const data = await fetchTransactionLists({
    filter: props.filter || 'validated',
    address: props.address,
    init: {
      cache: 'no-store',
    },
  })

  return (
    <TransactionlistTable {...props} {...data?.next_page_params} {...data} />
  )
}