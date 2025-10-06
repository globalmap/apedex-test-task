import React from 'react';
import '../styles/Message.scss';
import { EXPLORER_URL, NETWORK } from '../config/constants';
import type { MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`message ${message.type}`}>
      <div className="message-text">{message.text}</div>
      {message.txSignature && (
        <a
          href={`${EXPLORER_URL}/tx/${message.txSignature}${NETWORK === 'devnet' ? '?cluster=devnet' : ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="explorer-link"
        >
          View on Explorer →
        </a>
      )}
    </div>
  );
};