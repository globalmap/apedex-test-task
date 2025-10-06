export interface MessageType {
  type: 'success' | 'error';
  text: string;
  txSignature?: string;
}

export interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  signAndSendTransaction: (transaction: any) => Promise<{ signature: string }>;
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomProvider;
    };
  }
}