import { IAddressTag } from './eth.block'

export interface IEthTransaction {
  timestamp: string
  fee: IEthTransactionFee
  gas_limit: number
  block: number
  status: 'ok' | 'error'
  method: string
  confirmations: number
  type: number
  exchange_rate: string
  to: IEthTransactionAddressParam
  tx_burnt_fee: string
  max_fee_per_gas: string
  result: string
  hash: string
  gas_price: string
  priority_fee: string
  base_fee_per_gas: string
  from: IEthTransactionAddressParam
  token_transfers: IEthTokenTransfer
  tx_types: Array<
    | 'token_transfer'
    | 'contract_creation'
    | 'contract_call'
    | 'token_creation'
    | 'coin_transfer'
  >
  gas_used: string
  created_contract: IEthTransactionAddressParam
  position: number
  nonce: number
  has_error_in_internal_txs: boolean
  actions: any
  decoded_input: IEthDecodedInput
  token_transfers_overflow: boolean
  raw_input: string
  value: string
  max_priority_fee_per_gas: string
  revert_reason: string
  confirmation_duration: any
  tx_tag: string
}

export interface IEthTransactionListResponse {
  items: IEthTransaction[];
  next_page_params: {
    block_number: number;
    items_count: number;
    index: number;
  }
}

export interface IEthTransactionFee {
  type: 'maximum' | 'actual'
  value: string
}

export interface IEthTransactionAddressParam {
  hash: string
  implementation_name: string
  name: string
  is_contract: boolean
  private_tags: IAddressTag[]
  watchlist_names: IWatchlistName[]
  public_tags: IAddressTags[]
  is_verified: boolean
}

export interface IEthTokenTransfer {
  block_hash: string
  from: IEthTransactionAddressParam
  log_index: string
  method: string
  timestamp: string
  to: IEthTransactionAddressParam
  token: IEthTokenInfo
  tx_hash: string
  type: string
  total: any // missing
}

export interface IEthTokenInfo {
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

export interface IEthDecodedInput {
  method_call: string
  method_id: string
}
