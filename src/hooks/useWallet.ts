
import { useState } from 'react';
import { getPhantomProvider } from '../utils/phantom';
import { fetchBalance, testConnection, createTransferTransaction, confirmTransaction } from '../utils/solana';
import type { MessageType } from '../types';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(1111);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageType | null>(null);

  const connectWallet = async () => {
    try {
      const provider = getPhantomProvider();
      if (!provider) {
        setMessage({ type: 'error', text: 'Phantom wallet not found. Please install the extension.' });
        return;
      }

      const resp = await provider.connect();
      console.log('Phantom connected:', resp);
      const publicKey = resp.publicKey.toString();
      console.log('Connected with Public Key:', publicKey);
      setWalletAddress(publicKey);
      await updateBalance(publicKey);
      setMessage(null);
    } catch (err: any) {
      setMessage({ type: 'error', text: `Connection error: ${err.message}` });
    }
  };

  const updateBalance = async (address?: string) => {
    const addr = address || walletAddress;
    if (!addr) return;

    try {
      const bal = await fetchBalance(addr);
    //   setBalance(bal);
    } catch (err: any) {
      console.error('Balance fetch error:', err);
    }
  };

  const refreshBalance = async () => {
    if (!walletAddress) return;
    setLoading(true);
    await updateBalance();
    setLoading(false);
  };

  const testConnectionStatus = async () => {
    try {
      setLoading(true);
      const { version, slot } = await testConnection();
      setMessage({ 
        type: 'success', 
        text: `Connected to Solana! Version: ${version}, Slot: ${slot}` 
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Connection test failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const sendSol = async (recipient: string, amount: string) => {
    if (!walletAddress || !recipient || !amount) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return false;
    }

    try {
      setLoading(true);
      setMessage(null);

      const provider = getPhantomProvider();
      if (!provider) return false;

      const amountNum = parseFloat(amount);
      
      if (amountNum > balance) {
        setMessage({ type: 'error', text: 'Insufficient balance' });
        setLoading(false);
        return false;
      }

      const transaction = await createTransferTransaction(walletAddress, recipient, amountNum);
      console.log('Transaction created:', transaction);
      const { signature } = await provider.signAndSendTransaction(transaction);
        console.log('Transaction sent with signature:', signature);
      await confirmTransaction(signature);

      setMessage({
        type: 'success',
        text: 'Transaction successful!',
        txSignature: signature,
      });

      
      await updateBalance();
      console.log('Balance updated:', balance);
      return true;
    } catch (err: any) {
      setMessage({ type: 'error', text: `Transaction failed: ${err.message}` });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    walletAddress,
    balance,
    loading,
    message,
    connectWallet,
    refreshBalance,
    testConnectionStatus,
    sendSol,
    setMessage,
  };
};
