import { IEthAccount, IEthAccountCounter } from '@/types/eth.account'
import { IEthBlock, IEtherBlockArrayResponse } from '@/types/eth.block'
import {
  IEtherStat,
  ISearchResultAddressOrContract,
  ISearchResultBlock,
  ISearchResultToken,
  ISearchResultTransaction,
} from '@/types/eth.stat'
import { IEthTransactionListResponse } from '@/types/eth.tx'

export async function fetchBlockLists(
  revalidate: number = 15
): Promise<IEtherBlockArrayResponse> {
  const res = await fetch(`${process.env.BASE_ETH_API_URL}/blocks?type=block`, {
    next: { revalidate },
  })
  const data: IEtherBlockArrayResponse = await res.json()

  return data
}

interface IFetchTransactions {
  filter: 'validated' | 'pending'
  index?: number
  block_number?: number
  items_count?: number
  init?: RequestInit
}

export async function fetchTransactionLists(
  props?: IFetchTransactions
): Promise<IEthTransactionListResponse> {
  const { init, ...other } = props || {}

  let url = `${process.env.BASE_ETH_API_URL}/transactions?`
  Object.entries(other).forEach(([key, value]) => {
    if (!!value) {
      url += `${key}=${value}&`
    }
  })

  const res = await fetch(url, init)
  const data: IEthTransactionListResponse = await res.json()

  return data
}

export async function fetchStat(revalidate: number = 60): Promise<IEtherStat> {
  const response = await fetch(`${process.env.BASE_ETH_API_URL}/stats`, {
    next: {
      revalidate,
    },
  })
  const data: IEtherStat = await response.json()

  return data
}

export async function fetchAccountInfo(
  address: string,
  revalidate: number = 60
): Promise<IEthAccount> {
  const res = await fetch(
    `${process.env.BASE_ETH_API_URL}/addresses/${address}`,
    {
      next: {
        revalidate,
      },
    }
  )
  const data: IEthAccount = await res.json()

  return data
}

export async function fetchBlockDetail(hash: string): Promise<IEthBlock> {
  const res = await fetch(`${process.env.BASE_ETH_API_URL}/blocks/${hash}`)
  const data: IEthBlock = await res.json()

  return data
}

export async function fetchQuickSearchResult(query: string) {
  const res = await fetch(
    `${process.env.BASE_ETH_API_URL}/search/quick?q=${query}`
  )
  const data: Array<
    | ISearchResultToken
    | ISearchResultAddressOrContract
    | ISearchResultBlock
    | ISearchResultTransaction
  > = await res.json()

  return data
}

export async function fetchAccountCounterInfo(
  address: string,
  revalidate: number = 60
) {
  const res = await fetch(
    `${process.env.BASE_ETH_API_URL}/addresses/${address}/counters`,
    {
      next: {
        revalidate,
      },
    }
  )
  const data: IEthAccountCounter = await res.json()

  return data
}

export async function fetchTransactionChart() {
  const response = await fetch(
    `${process.env.BASE_ETH_API_URL}/stats/charts/transactions`,
    {
      next: { revalidate: 3600 },
    }
  )
  const data = await response.json()

  return data
}
