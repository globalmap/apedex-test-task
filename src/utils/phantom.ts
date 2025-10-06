import { PHANTOM_URL } from "../config/constants";
import type { PhantomProvider } from "../types";

export const getPhantomProvider = (): PhantomProvider | null => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;
    if (provider?.isPhantom) {
      return provider;
    }
  }
  window.open(PHANTOM_URL, '_blank');
  return null;
};