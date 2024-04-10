export interface IEtherStat {
  total_blocks: string
  total_addresses: string
  total_transactions: string
  average_block_time: number
  coin_price: string
  total_gas_used: string
  transactions_today: string
  gas_used_today: string
  gas_prices: IEtherGasPrices
  static_gas_price: string
  market_cap: string
  network_utilization_percentage: number
  coin_price_change_percentage: number | string
}

export interface IEtherGasPrices {
  average: number
  fast: number
  slow: number
}

export interface ISearchResultToken {
  address: string
  address_url: string
  circulating_market_cap: string
  exchange_rate: string
  icon_url: string
  is_smart_contract_verified: boolean
  is_verified_via_admin_panel: boolean
  name: string
  symbol: string
  token_type: string
  token_url: string
  total_supply: string
  type: 'token'
}

export interface ISearchResultAddressOrContract {
  address: string
  is_smart_contract_verified: boolean
  name: string
  type: 'address' | 'contract'
  url: string
}

export interface ISearchResultBlock {
  block_hash: string
  block_number: number
  timestamp: string
  type: 'block'
  url: string
}

export interface ISearchResultTransaction {
  timestamp: string
  tx_hash: string
  type: 'transaction'
  url: string
}

export type IQuickSearchResult =
  | ISearchResultToken
  | ISearchResultAddressOrContract
  | ISearchResultBlock
  | ISearchResultTransaction
