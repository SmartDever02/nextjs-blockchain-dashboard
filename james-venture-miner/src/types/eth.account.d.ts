import { IAddressTag, IWatchlistName } from './eth.block'

export interface IEthAccount {
  creator_address_hash: string
  creation_tx_hash: string
  token: IEthToken
  coin_balance: string
  exchange_rate: string
  implementation_address: string
  block_number_balance_updated_at: number
  hash: string
  implementation_name: string
  name: string
  is_contract: boolean
  private_tags: IAddressTag[]
  watchlist_names: IWatchlistName[]
  public_tags: IAddressTag[]
  is_verified: boolean
  has_beacon_chain_withdrawals: boolean
  has_custom_methods_read: boolean
  has_custom_methods_write: boolean
  has_decompiled_code: boolean
  has_logs: boolean
  has_methods_read: boolean
  has_methods_write: boolean
  has_methods_read_proxy: boolean
  has_methods_write_proxy: boolean
  has_token_transfers: boolean
  has_tokens: boolean
  has_validated_blocks: boolean
}

export interface IEthToken {
  circulating_market_cap: string
  icon_url: string
  name: string
  decimals: string
  symbol: string
  address: string
  type: string
  holders: string
  exchange_rate: string
  total_supply: string
}

export interface IEthAccountCounter {
  gas_usage_count: string
  token_transfers_count: string
  transactions_count: string
  validations_count: string
}
