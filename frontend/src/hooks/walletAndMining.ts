import React from 'react';
import axios from 'axios';

export function useAuthToken() {
  const [token, setToken] = React.useState<string | null>(null);
  return { token, setToken };
}

export function useWalletLinking(apiBase: string, token: string | null) {
  const requestNonce = async (): Promise<string> => {
    const resp = await axios.post(
      `${apiBase}/wallet/request-nonce`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp.data?.data?.nonce;
  };

  const linkWithMetaMask = async (): Promise<string> => {
    if (!window.ethereum) throw new Error('MetaMask not detected');
    const accounts: string[] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];

    const nonce = await requestNonce();
    const signature = await (window as any).ethereum.request({
      method: 'personal_sign',
      params: [nonce, address],
    });

    const resp = await axios.post(
      `${apiBase}/wallet/verify-signature`,
      { address, signature },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp.data?.data?.address || address;
  };

  return { linkWithMetaMask };
}

export function useMining(apiBase: string, token: string | null) {
  const claimDaily = async () => {
    const resp = await axios.post(
      `${apiBase}/mining/claim`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp.data?.data;
  };
  return { claimDaily };
}

