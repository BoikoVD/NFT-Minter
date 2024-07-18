"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AbiItem, Contract, Web3 } from 'web3';
import passNFT from "./PassNFT.json";

const PassNFTAddress = '0x516427DcB763358617D182331a1499b01C4b0228';

interface IWeb3Context {
  account: string | null;
  networkId: string | null;
  contract: Contract<AbiItem[]> | null,
  connectWallet: () => Promise<void>;
}

const Web3Context = createContext<IWeb3Context | undefined>(undefined);

export const useWeb3Context = (): IWeb3Context => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract<AbiItem[]> | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectWallet = async () => {
    if (isMetaMaskInstalled && !isConnecting) {
      setIsConnecting(true);
      
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.send('eth_requestAccounts');
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log('[Web3Context]: Account connected: ', accounts[0]);

        const netId = await web3.eth.getChainId();
        setNetworkId(Number(netId).toString());
        console.log('[Web3Context]: Network Id: ', Number(netId).toString());

        const contract = new web3.eth.Contract(passNFT.abi, PassNFTAddress);
        setContract(contract);
      } catch (error) {
        console.log('[Web3Context]: ConnectWallet ERROR: ', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        setIsMetaMaskInstalled(true);
    } else {
      return alert('Please install metamask ');
    }
  }, []);

  useEffect(() => {
    connectWallet();
  }, [isMetaMaskInstalled]);

  useEffect(() => {
    if (account) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('[Web3Context]: Account changed: ', accounts);
        setAccount(accounts[0]);
      };
      const handleNetworkChanged = (networkId: string) => {
        console.log('[Web3Context]: Network changed: ', networkId);
        setNetworkId(networkId);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('networkChanged', handleNetworkChanged);
      }
    }
  }, [account]);

  return (
    <Web3Context.Provider value={{ account, networkId, contract, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};