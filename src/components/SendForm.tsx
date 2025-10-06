
import React, { useState } from 'react';
import '../styles/SendForm.scss';

interface SendFormProps {
  loading: boolean;
  onSend: (recipient: string, amount: string) => Promise<boolean>;
}

export const SendForm: React.FC<SendFormProps> = ({ loading, onSend }) => {
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = async () => {
    const success = await onSend(recipient, amount);
    if (success) {
      setRecipient('');
      setAmount('');
    }
  };

  return (
    <div className="send-section">
      <h2 className="section-title">Send SOL</h2>
      <div className="form">
        <div className="form-group">
          <label>Recipient Address</label>
          <input
            type="text"
            placeholder="Enter wallet address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Amount (SOL)</label>
          <input
            type="number"
            step="0.0001"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          className="btn btn-send"
          onClick={handleSubmit}
          disabled={loading || !recipient || !amount}
        >
          {loading ? 'Sending...' : 'Send SOL'}
        </button>
      </div>
    </div>
  );
};
