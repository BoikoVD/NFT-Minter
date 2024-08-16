"use client";
import { useState } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";
import { useErrorModal } from "@/hooks/modals/useErrorModal";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";

export default function MintPassNFT() {
  const {
    account,
    passNFTContract,
    isOwnerOfPassNFT,
    isCorrectNetwork,
    checkOwningOfPassNFT
  } = useWeb3Context();
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const { openModal } = useSwitchNetworkModal();
  const { openErrorModal } = useErrorModal();

  const handleMint = async () => {
    if (!isCorrectNetwork) {
      openModal();
      return;
    }

    if (account && passNFTContract) {
      setIsMinting(true);
      try {
        const mintPrice = Number(
          await passNFTContract.methods.mintPrice().call()
        );
        const res = await passNFTContract.methods
          .mint(1)
          .send({
            from: account,
            value: String(mintPrice)
          })
          .on("confirmation", ({ confirmations, receipt }) => {
            console.log(
              "on mintPassNFTContract confirmation: ",
              confirmations,
              receipt
            );
            if (Number(receipt.status)) {
              checkOwningOfPassNFT(account, passNFTContract);
            }
          });
        console.log("Mint Pass NFT response: ", res);
      } catch (e: unknown) {
        console.log("Mint Pass NFT ERROR: ", e);
        const error = e as { code?: number; message?: string };
        openErrorModal(error?.message);
      } finally {
        setIsMinting(false);
      }
    }
  };

  return isOwnerOfPassNFT ? (
    <Text>You have minted the Pass NFT!</Text>
  ) : account ? (
    <Button onClick={handleMint} isLoading={isMinting}>
      Mint
    </Button>
  ) : (
    <ConnectWalletButton />
  );
}
