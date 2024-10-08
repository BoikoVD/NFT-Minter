"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { AbiItem, Contract, Web3 } from "web3";
import constants from "@/config/constants";
import abi from "@/config/abi/abi";

interface IWeb3Context {
  isMetaMaskInstalled: boolean;
  web3: Web3 | null;
  account: string | null;
  networkId: string | null;
  isCorrectNetwork: boolean;
  passNFTContract: Contract<AbiItem[]> | null;
  minterNFTContract: Contract<AbiItem[]> | null;
  isOwnerOfPassNFT: boolean;
  connectWallet: () => Promise<void>;
  checkOwningOfPassNFT: (
    accountAddress: string,
    contractInstance: Contract<AbiItem[]>
  ) => Promise<void>;
  switchToCorrectNetwork: (callback: () => void) => void;
  error: { code?: Number; message: string } | null;
  clearError: () => void;
}

const Web3Context = createContext<IWeb3Context | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] =
    useState<boolean>(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);

  const [passNFTContract, setPassNFTContract] = useState<Contract<
    AbiItem[]
  > | null>(null);
  const [minterNFTContract, setMinterNFTContract] = useState<Contract<
    AbiItem[]
  > | null>(null);
  const [isOwnerOfPassNFT, setIsOwnerOfPassNFT] = useState<boolean>(false);

  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const [error, setError] = useState<{ code?: Number; message: string } | null>(
    null
  );

  const mode = process.env.NEXT_PUBLIC_MODE;

  const clearError = () => {
    setError(null);
  };

  const connectWallet = async () => {
    if (isMetaMaskInstalled && !isConnecting) {
      setIsConnecting(true);

      try {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        console.log("[Web3Context]: Accounts: ", accounts);
        console.log("[Web3Context]: Account connected: ", accounts[0]);

        const netId = await web3.eth.getChainId();
        setNetworkId(Number(netId).toString());
        console.log("[Web3Context]: Network Id: ", Number(netId).toString());

        const passNFTContract = new web3.eth.Contract(
          abi.passNftAbi,
          constants.PASS_NFT_CONTRACT_ADDRESS
        );
        setPassNFTContract(passNFTContract);

        const minterNFTContract = new web3.eth.Contract(
          abi.minterNftAbi,
          constants.MINTER_NFT_CONTRACT_ADDRESS
        );
        setMinterNFTContract(minterNFTContract);
      } catch (e: unknown) {
        console.log("[Web3Context]: ConnectWallet ERROR: ", e);
        const error = e as { code?: number; message?: string };
        if (error?.code !== constants.MM_ERROR_CODE__USER_REJECT_REQUEST) {
          setError({
            message: error?.message ?? "Something went wrong. Please try later!"
          });
        }
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const checkOwningOfPassNFT = async (
    accountAddress: string,
    contractInstance: Contract<AbiItem[]>
  ) => {
    try {
      const amount = await contractInstance.methods
        .balanceOf(accountAddress)
        .call();
      if (Number(amount) && Number(amount) >= 1) {
        setIsOwnerOfPassNFT(true);
      } else {
        setIsOwnerOfPassNFT(false);
      }
      console.log("[Web3Context]: Check owning of pass NFT response: ", amount);
    } catch (e: unknown) {
      console.log("[Web3Context]: Check owning of pass NFT ERROR: ", e);
      const error = e as { code?: number; message?: string };
      setError({
        message: error?.message ?? "Something went wrong. Please try later!"
      });
    }
  };

  const switchToCorrectNetwork = async (callback?: () => void) => {
    const correctNetwork =
      mode === "dev"
        ? constants.LOCAL_NETWORK_ID
        : constants.SEPOLIA_NETWORK_ID;

    if (
      web3 &&
      web3.currentProvider &&
      networkId &&
      networkId !== correctNetwork
    ) {
      try {
        await web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(BigInt(correctNetwork)) }]
        });
        if (callback) {
          callback();
        }
      } catch (e: unknown) {
        console.log("[Web3Context]: Switch to correct network ERROR: ", e);
        const error = e as { code?: number; message?: string };
        setError({
          message: error?.message ?? "Something went wrong. Please try later!"
        });
      }
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window?.ethereum !== "undefined"
    ) {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
    }
  }, []);

  useEffect(() => {
    if (isMetaMaskInstalled) {
      connectWallet();
    }
  }, [isMetaMaskInstalled]);

  useEffect(() => {
    if (account && web3 && web3.provider) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("[Web3Context]: Account changed: ", accounts);
        setAccount(accounts[0]);
      };
      const handleNetworkChanged = (networkId: string) => {
        console.log(
          "[Web3Context]: Network changed: ",
          Number(networkId).toString()
        );
        setNetworkId(Number(networkId).toString());
      };
      web3.provider.on("accountsChanged", handleAccountsChanged);
      web3.provider.on("chainChanged", handleNetworkChanged);

      return () => {
        web3.provider?.removeListener("accountsChanged", handleAccountsChanged);
        web3.provider?.removeListener("chainChanged", handleNetworkChanged);
      };
    }
  }, [account, web3]);

  useEffect(() => {
    const correctNetwork =
      mode === "dev"
        ? constants.LOCAL_NETWORK_ID
        : constants.SEPOLIA_NETWORK_ID;

    if (networkId && networkId === correctNetwork) {
      setIsCorrectNetwork(true);
    } else {
      setIsCorrectNetwork(false);
    }
  }, [networkId]);

  useEffect(() => {
    if (isCorrectNetwork && account && passNFTContract) {
      checkOwningOfPassNFT(account, passNFTContract);
    }
  }, [account, isCorrectNetwork, passNFTContract]);

  return (
    <Web3Context.Provider
      value={{
        isMetaMaskInstalled,
        web3,
        account,
        networkId,
        isCorrectNetwork,
        passNFTContract,
        minterNFTContract,
        isOwnerOfPassNFT,
        connectWallet,
        checkOwningOfPassNFT,
        switchToCorrectNetwork,
        error,
        clearError
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = (): IWeb3Context => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
