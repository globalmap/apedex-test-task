import React from 'react';
import { useWallet } from './hooks/useWallet';
import { WalletInfo } from './components/WalletInfo';
import { SendForm } from './components/SendForm';
import { Message } from './components/Message';

const App: React.FC = () => {
  const {
    walletAddress,
    balance,
    loading,
    message,
    connectWallet,
    refreshBalance,
    sendSol,
  } = useWallet();

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🌟 Phantom Wallet</h1>
        <p className="subtitle">Solana Transfer</p>

        {/* <button className="btn btn-test" onClick={testConnectionStatus} disabled={loading}>
          {loading ? 'Testing...' : 'Test Connection'}
        </button> */}

        {!walletAddress ? (
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <>
            <WalletInfo
              address={walletAddress}
              balance={balance}
              loading={loading}
              onRefresh={refreshBalance}
            />
            <SendForm loading={loading} onSend={sendSol} />
          </>
        )}

        {message && <Message message={message} />}
      </div>
    </div>
  );
};

export default App;