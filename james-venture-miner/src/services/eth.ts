import { IEtherBlockArrayResponse } from '@/types/eth.block'
import { IEthTransactionListResponse } from '@/types/eth.tx'

export async function fetchBlockLists(
  revalidate: number = 15
): Promise<IEtherBlockArrayResponse> {
  const res = await fetch(
    `${process.env.BASE_API_URL}/blocks?type=block`,
    {
      next: { revalidate },
    }
  )
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

export async function fetchStat(revalidate: number = 60) {
  const response = await fetch(`${process.env.BASE_API_URL}/stats`, {
    next: {
      revalidate,
    },
  })
  const data = await response.json()

  return data
}
