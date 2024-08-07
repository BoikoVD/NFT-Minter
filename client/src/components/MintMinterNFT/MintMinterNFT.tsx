"use client";
import { useWeb3Context } from "@/context/Web3Context";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";

export default function MintMinterNFT() {
  const { account, passNFTContract, isOwnerOfPassNFT } = useWeb3Context();

  const handleMint = async () => {
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
      } catch (e) {
        console.log("Mint Pass NFT ERROR: ", e);
      }
    }
  };

  return isOwnerOfPassNFT ? (
    <Text>You have minted the Pass NFT!</Text>
  ) : account ? (
    <Button onClick={handleMint}>Mint</Button>
  ) : (
    <Text>You must connect a wallet to mint!</Text>
  );
}
