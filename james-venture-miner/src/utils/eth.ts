import {
  IQuickSearchResult,
  ISearchResultAddressOrContract,
  ISearchResultBlock,
  ISearchResultToken,
  ISearchResultTransaction,
} from '@/types/eth.stat'

export const shortenAddress = (
  address: string,
  startUntil: number = 6,
  fromEnd: number = 6
) => {
  return `${address?.substring(0, startUntil)}...${address?.substring(
    address.length - fromEnd
  )}`
}

export const getAgeFromTimestamp = (date: number | string) => {
  const currentTimestamp = Math.floor(Date.now() / 1000) // Convert milliseconds to seconds
  const difference =
    currentTimestamp - Math.floor(new Date(date).getTime() / 1000)

  const seconds = difference
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} days ago`
  } else if (hours > 0) {
    return `${hours} hrs ago`
  } else if (minutes > 0) {
    return `${minutes} mins ago`
  } else {
    return `${seconds} secs ago`
  }
}

export const getEtherFromWei = (
  value: number | string,
  unit: boolean = false,
  maxFraction: number = 5
) => {
  let eth = (Number(value) / 1000_000_000 / 1000_000_000).toLocaleString(
    'en-US',
    {
      maximumFractionDigits: maxFraction,
      minimumFractionDigits: 2,
    }
  )

  if (unit) {
    eth = `${eth} ETH`
  }

  return eth
}

export const getGweiFromWei = (
  value: number | string,
  unit: boolean = false,
  maxFraction: number = 5
) => {
  let gwei = (Number(value) / 1000_000_000).toLocaleString('en-US', {
    maximumFractionDigits: maxFraction,
    minimumFractionDigits: 2,
  })

  if (unit) {
    gwei = `${gwei} Gwei`
  }

  return gwei
}

export function formatNumberWithCommas(value: string | number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function analyzeQuickSearchResponse(res: IQuickSearchResult) {
  const type = res.type
  const uniqueKey = ['block', 'transaction'].includes(type)
    ? (res as ISearchResultBlock | ISearchResultTransaction).timestamp
    : (res as ISearchResultToken | ISearchResultAddressOrContract).address

  let generatedHref: string = ''
  let display: string | number = ''
  let moreDetail: string = ''

  switch (type) {
    case 'transaction':
      generatedHref = `/chain/eth/tx/${res.tx_hash}`
      display = res.tx_hash
      moreDetail = new Date(res.timestamp).toUTCString()
      break
    case 'block':
      generatedHref = `/chain/eth/block/${res.block_number}`
      display = res.block_number
      moreDetail =
        shortenAddress(res.block_hash, 9, 8) +
        ' ' +
        new Date(res.timestamp).toUTCString()
      break
    case 'address':
    case 'contract':
      generatedHref = `/chain/eth/address/${res.address}`
      display = res.address
      break
    case 'token':
      generatedHref = `/chain/eth/token/${res.address}`
      display = res.address
      moreDetail = `${formatNumberWithCommas(res.total_supply)} (${res.name})`
      break
    default:
      break
  }

  return {
    ...res,
    uniqueKey,
    generatedHref,
    display,
    moreDetail,
  }
}
