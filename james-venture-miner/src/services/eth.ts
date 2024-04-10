import { IEthAccount } from '@/types/eth.account'
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
  const res = await fetch(`${process.env.BASE_API_URL}/blocks?type=block`, {
    next: { revalidate },
  })
  const data: IEtherBlockArrayResponse = await res.json()

  return data
}

export async function fetchTransactionLists(
  revalidate: number = 10
): Promise<IEthTransactionListResponse> {
  const res = await fetch(
    `${process.env.BASE_API_URL}/transactions?filter=validated&type=token_transfer%2Ccontract_creation%2Ccontract_call%2Ccoin_transfer&method=approve%2Ctransfer`,
    {
      next: { revalidate },
    }
  )
  const data: IEthTransactionListResponse = await res.json()

  return data
}

export async function fetchStat(revalidate: number = 60): Promise<IEtherStat> {
  const response = await fetch(`${process.env.BASE_API_URL}/stats`, {
    next: {
      revalidate,
    },
  })
  const data: IEtherStat = await response.json()

  return data
}

export async function fetchAccount(
  address: string,
  revalidate: number = 60
): Promise<IEthAccount> {
  const res = await fetch(`${process.env.BASE_API_URL}/addresses/${address}`, {
    next: {
      revalidate,
    },
  })
  const data: IEthAccount = await res.json()

  return data
}

export async function fetchBlockDetail(hash: string): Promise<IEthBlock> {
  const res = await fetch(`${process.env.BASE_API_URL}/blocks/${hash}`)
  const data: IEthBlock = await res.json()

  return data
}

export async function fetchQuickSearchResult(query: string) {
  const res = await fetch(`${process.env.BASE_API_URL}/search/quick?q=${query}`)
  const data: Array<
    | ISearchResultToken
    | ISearchResultAddressOrContract
    | ISearchResultBlock
    | ISearchResultTransaction
  > = await res.json()

  return data
}
