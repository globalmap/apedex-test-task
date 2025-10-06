import { Connection } from '@solana/web3.js';
import { useState } from 'react';

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string; txSignature?: string } | null>(null);


  const NETWORK = 'devnet';// or 'mainnet-beta' for production

  const connection = new Connection(
    NETWORK === 'devnet'
      ? 'https://api.devnet.solana.com'
      : 'https://api.mainnet-beta.solana.com',
    'confirmed'
  );

  const testConnection = async () => {
    try {
      setLoading(true);
      const version = await connection.getVersion();
      const slot = await connection.getSlot();
      setMessage({
        type: 'success',
        text: `Connected to Solana ${NETWORK}! Version: ${version['solana-core']}, Slot: ${slot}`
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Connection test failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Phantom Wallet</h1>
        <p className="subtitle">Solana Transfer</p>

        <button className="btn btn-test" onClick={testConnection} disabled={loading}>
          {loading ? 'Testing...' : 'Test Connection'}
        </button>

        <div className="wallet-info">
          <div className="info-card">
            <div className="info-label">Address</div>
          </div>
          <div className="info-card">
            <div className="info-label">Balance</div>
            <div className="info-value">
              {balance.toFixed(4)} SOL
              <button className="btn-refresh">
                Refresh
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            <div className="message-text">{message.text}</div>
          </div>
        )}
      </div>
    </div>

  )
}

export default App
