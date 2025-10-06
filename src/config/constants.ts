export const NETWORK: string = 'devnet';// 'mainnet-beta' for real transactions, 'devnet' for testing
export const RPC_ENDPOINT = 
  NETWORK === 'devnet' 
    ? 'https://api.devnet.solana.com' 
    : 'https://api.mainnet-beta.solana.com';

export const EXPLORER_URL = 'https://explorer.solana.com';
export const PHANTOM_URL = 'https://phantom.app/';