"use client";
import { useState } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";
import { useModal } from "@/context/ModalManager";

export default function MintPassNFT() {
  const {
    account,
    passNFTContract,
    isOwnerOfPassNFT,
    isCorrectNetwork,
    checkOwningOfPassNFT,
    switchToCorrectNetwork
  } = useWeb3Context();
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const { openModal, closeModal } = useModal();

  const handleMint = async () => {
    if (!isCorrectNetwork) {
      openModal({
        content: <Text>Please, switch network to Sepolia Testnet</Text>,
        modalName: "switchNetworkModal",
        type: "default",
        actionText: "Switch",
        actionHandler: () => switchToCorrectNetwork(closeModal)
      });
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
        openModal({
          content: <Text>{error?.message ?? "Something went wrong..."}</Text>,
          modalName: "errorModal",
          type: "error"
        });
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
