import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function hasEthereum() {
  return (
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  );
}

export default function useMetaMask() {
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState('');

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState('MetaMask unavailable');
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState('No wallet connected');
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  // Request access to MetaMask account
  async function requestAccount() {
    if (hasEthereum()) {
      const provider = window.ethereum as any;
      await provider.request({ method: 'eth_requestAccounts' });
    }
  }
  const handleConnectWallet = (wallet: any) =>
    setConnectedWalletAddressState(wallet);

  return {
    connectedWalletAddress,
    handleConnectWallet,
    requestAccount,
    hasEthereum,
  };
}
