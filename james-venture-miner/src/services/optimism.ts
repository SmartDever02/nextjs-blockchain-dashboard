import { IOptimismStat } from '@/types/optimism.stat'

export async function fetchStat(
  revalidate: number = 60
): Promise<IOptimismStat> {
  const response = await fetch(`${process.env.BASE_OPT_API_URL}/stats`, {
    next: {
      revalidate,
    },
  })
  const data: IOptimismStat = await response.json()

  return data
}

export async function fetchTransactionChart() {
  const response = await fetch(
    `${process.env.BASE_OPT_API_URL}/stats/charts/transactions`,
    {
      next: { revalidate: 3600 },
    }
  )
  const data = await response.json()

  return data
}
