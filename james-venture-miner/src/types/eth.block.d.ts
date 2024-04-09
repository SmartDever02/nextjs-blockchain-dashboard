export interface IEthBlock {
  base_fee_per_gas: string;
  burnt_fees: string;
  burnt_fees_percentage: number;
  difficulty: string;
  extra_data: string;
  gas_limit: string;
  gas_target_percentage: number;
  gas_used: string;
  gas_used_percentage: number;
  hash: string;
  height: number;
  miner: IEthMiner;
  nonce: string;
  parent_hash: string;
  priority_fee: string;
  rewards: IBlockReward[];
  size: number;
  state_root: string;
  timestamp: string;
  total_difficulty: string;
  tx_count: number;
  tx_fees: string;
  type: string;
  uncles_hashes: string[];
  withdrawals_count: number;
}

export interface IEtherBlockArrayResponse {
  items: IEthBlock[];
  next_page_params: {
    block_number: number;
    items_count: number;
  }
}

export interface IEthMiner {
  hash: string;
  implementation_name: string;
  name: string;
  is_contract: boolean;
  private_tags: IAddressTag[];
  watchlist_names: IWatchlistName[];
  public_tags: IAddressTag[];
  is_verified: boolean;
}

export interface IAddressTag {
  address_hash: string;
  display_name: string;
  label: string;
}

export interface IWatchlistName {
  display_name: string;
  label: string;
}

export interface IBlockReward {
  reward: number;
  type: 'Miner Reward' | 'Emission Reward' | 'Chore Reward' | 'Uncle Reward';
}

