import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { RPC_ENDPOINT } from '../config/constants';

export const connection = new Connection(RPC_ENDPOINT, 'confirmed');

export const fetchBalance = async (address: string): Promise<number> => {
  const publicKey = new PublicKey(address);
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
};

export const testConnection = async (): Promise<{ version: string; slot: number }> => {
  const version = await connection.getVersion();
  const slot = await connection.getSlot();
  return {
    version: version['solana-core'],
    slot,
  };
};

export const createTransferTransaction = async (
  from: string,
  to: string,
  amount: number
): Promise<Transaction> => {
  const fromPubkey = new PublicKey(from);
  const toPubkey = new PublicKey(to);
  const lamports = amount * LAMPORTS_PER_SOL;

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    })
  );

  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromPubkey;

  return transaction;
};

export const confirmTransaction = async (signature: string): Promise<void> => {
  await connection.confirmTransaction(signature, 'confirmed');
};

export const shortenAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};