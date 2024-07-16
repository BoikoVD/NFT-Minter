"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface IWeb3Context {
  account: string | null;
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
    const [account, setAccount] = useState<string | null>(null);

    const connectWallet = async (isInitial = false, metamask = window?.ethereum) => {
        try {
            if (!metamask) {
                return alert('Please install metamask ');
            } else {
                const accounts = isInitial 
                    ? await metamask.request({ method: 'eth_accounts' }) as string[]
                    : await metamask.request({ method: 'eth_requestAccounts' }) as string[];
                console.log('Account ', accounts);
                if (accounts.length) {
                    setAccount(accounts[0]);
                }
            }
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object.');
        }
    };

    useEffect(() => {
        if (window?.ethereum) {
            connectWallet(true);
        }
    }, []);

  return (
    <Web3Context.Provider value={{ account, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};