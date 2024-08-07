"use client";
import { useWeb3Context } from "@/context/Web3Context";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";
import { useInstallMetamaskModal } from "@/hooks/modals/useInstallMetamaskModal";
import { useErrorModal } from "@/hooks/modals/useErrorModal";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";

export default function MintPassNFT() {
  const {
    isMetaMaskInstalled,
    account,
    passNFTContract,
    isOwnerOfPassNFT,
    isCorrectNetwork,
    checkOwningOfPassNFT,
    connectWallet
  } = useWeb3Context();
  const { openInstallMetamaskModal } = useInstallMetamaskModal();
  const { openModal } = useSwitchNetworkModal();
  const { openErrorModal } = useErrorModal();

  const handleMint = async () => {
    if (!isCorrectNetwork) {
      openModal();
      return;
    }

    if (account && passNFTContract) {
      try {
        const mintPrice = Number(
          await passNFTContract.methods.mintPrice().call()
        );
        const res = await passNFTContract.methods.mint(1).send({
          from: account,
          value: String(mintPrice)
        });
        console.log("Mint Pass NFT response: ", res);
        checkOwningOfPassNFT(account, passNFTContract);
      } catch (e: unknown) {
        console.log("Mint Pass NFT ERROR: ", e);
        const error = e as { code?: number; message?: string };
        openErrorModal(error?.message);
      }
    }
  };

  return isOwnerOfPassNFT ? (
    <Text>You have minted the Pass NFT!</Text>
  ) : account ? (
    <Button onClick={handleMint}>Mint</Button>
  ) : (
    <Button
      onClick={isMetaMaskInstalled ? connectWallet : openInstallMetamaskModal}
    >
      Connect Wallet
    </Button>
  );
}
