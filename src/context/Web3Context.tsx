"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AbiItem, Contract, Web3 } from 'web3';
import passNFT from "./PassNFT.json";
import minterNFT from "./MinterNFT.json";

interface IWeb3Context {
  account: string | null;
  networkId: string | null;
  isCorrectNetwork: boolean;
  passNFTContract: Contract<AbiItem[]> | null,
  minterNFTContract: Contract<AbiItem[]> | null,
  isOwnerOfPassNFT: boolean,
  isSwitchNetworkModalOpen: {state: boolean, text: string},
  connectWallet: () => Promise<void>,
  checkOwningOfPassNFT: (accountAddress: string, contractInstance: Contract<AbiItem[]>) => Promise<void>,
  setIsSwitchNetworkModalOpen: React.Dispatch<React.SetStateAction<{
    state: boolean;
    text: string;
  }>> ,
  switchToCorrectNetwork: () => void,
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
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);

  const [passNFTContract, setPassNFTContract] = useState<Contract<AbiItem[]> | null>(null);
  const [minterNFTContract, setMinterNFTContract] = useState<Contract<AbiItem[]> | null>(null);
  const [isOwnerOfPassNFT, setIsOwnerOfPassNFT] = useState<boolean>(false);

  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const [isSwitchNetworkModalOpen, setIsSwitchNetworkModalOpen] = useState<{
    state: boolean,
    text: string
  }>({
    state: false,
    text: 'Please, switch network to Sepolia Testnet'
  });

  const connectWallet = async () => {
    if (isMetaMaskInstalled && !isConnecting) {
      setIsConnecting(true);
      
      try {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        await window.ethereum.send('eth_requestAccounts');
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log('[Web3Context]: Account connected: ', accounts[0]);

        const netId = await web3.eth.getChainId();
        setNetworkId(Number(netId).toString());
        console.log('[Web3Context]: Network Id: ', Number(netId).toString());

        const passNFTContract = new web3.eth.Contract(passNFT.abi, process.env.NEXT_PUBLIC_PASS_NFT_CONTRACT_ADDRESS);
        setPassNFTContract(passNFTContract);

        const minterNFTContract = new web3.eth.Contract(minterNFT.abi, process.env.NEXT_PUBLIC_MINTER_NFT_CONTRACT_ADDRESS);
        setMinterNFTContract(minterNFTContract);
      } catch (error) {
        console.log('[Web3Context]: ConnectWallet ERROR: ', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const checkOwningOfPassNFT = async(accountAddress: string, contractInstance: Contract<AbiItem[]>) => {
    try {
      const amount = await contractInstance.methods.balanceOf(accountAddress).call();
      if (Number(amount) && Number(amount) >= 1) {
        setIsOwnerOfPassNFT(true)
      } else {
        setIsOwnerOfPassNFT(false)
      }
      console.log('[Web3Context]: Check owning of pass NFT response: ', amount)
    } catch (error) {
      console.log('[Web3Context]: Check owning of pass NFT ERROR: ', error);
    }
  };

  const switchToCorrectNetwork = async () => {
    if (web3 && web3.currentProvider && networkId && networkId !== '11155111') {
      try {
        await web3.currentProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(BigInt(`11155111`)) }],
        });
        setIsSwitchNetworkModalOpen({
          state: false,
          text: 'Please, switch network to Sepolia Testnet'
        });
      } catch (e: unknown) {
        console.log('[Web3Context]: Switch to correct network ERROR: ', e);
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

  useEffect(() => {
    if (networkId && networkId === '11155111') {
      setIsCorrectNetwork(true);
      if (account && passNFTContract) {
        checkOwningOfPassNFT(account, passNFTContract);
      }
    } else {
      setIsCorrectNetwork(false);
    }
  }, [networkId]);

  return (
    <Web3Context.Provider 
      value={{ 
        account, 
        networkId, 
        isCorrectNetwork, 
        passNFTContract, 
        minterNFTContract,
        isOwnerOfPassNFT, 
        isSwitchNetworkModalOpen, 
        connectWallet,
        checkOwningOfPassNFT,
        setIsSwitchNetworkModalOpen,
        switchToCorrectNetwork
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};