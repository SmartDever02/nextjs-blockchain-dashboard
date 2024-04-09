export const shortenAddress = (address: string) => {
  return `${address?.substring(0, 6)}...${address?.substring(address.length - 6)}`
}

export const getAgeFromTimestamp = (date: number) => {
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

export const getEtherFromWei = (value: number, unit: boolean = false, maxFraction: number = 5) => {
  let eth = (value / 1000000000 / 1000000000).toLocaleString('en-US', {
    maximumFractionDigits: maxFraction,
    minimumFractionDigits: 2,
  })

  if (unit) {
    eth = `${eth} ETH`
  }

  return eth
}

export const getGweiFromWei = (value: number, unit: boolean = false, maxFraction: number = 5) => {
  let gwei = (value / 1000000000).toLocaleString('en-US', {
    maximumFractionDigits: maxFraction,
    minimumFractionDigits: 2,
  })

  if (unit) {
    gwei = `${gwei} Gwei`
  }

  return gwei
}

export function formatNumberWithCommas(value: string | number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}