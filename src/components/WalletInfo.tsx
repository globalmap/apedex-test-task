
import React from 'react';
import { shortenAddress } from '../utils/solana';
import '../styles/WalletInfo.scss';

interface WalletInfoProps {
  address: string;
  balance: number;
  loading: boolean;
  onRefresh: () => void;
}

export const WalletInfo: React.FC<WalletInfoProps> = ({ address, balance, loading, onRefresh }) => {
  return (
    <div className="wallet-info">
      <div className="info-card">
        <div className="info-label">Address</div>
        <div className="info-value">{shortenAddress(address)}</div>
      </div>
      <div className="info-card">
        <div className="info-label">Balance</div>
        <div className="info-value">
          {balance.toFixed(4)} SOL
          <button className="btn-refresh" onClick={onRefresh} disabled={loading}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};