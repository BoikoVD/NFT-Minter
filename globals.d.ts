import { MetaMaskProvider } from "web3";

declare global {
  interface Window {
    ethereum: MetaMaskProvider;
  }
}