"use client";
import axios from "axios";
import { useWeb3Context } from "@/context/Web3Context";
import { useModal } from "@/context/ModalManager";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";

interface IMintNftButton {
  imageUrl: string | null;
  setIsLoading: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      text: string;
    }>
  >;
}

export default function MintNftButton({
  imageUrl,
  setIsLoading
}: IMintNftButton) {
  const {
    account,
    minterNFTContract,
    isCorrectNetwork,
    switchToCorrectNetwork
  } = useWeb3Context();
  const { openModal, closeModal } = useModal();

  const getFileName = async () => {
    try {
      if (minterNFTContract) {
        const fileName =
          Number(await minterNFTContract.methods.totalSupply().call()) + 1;
        return fileName.toString();
      } else {
        throw new Error("Minter NFT contract is not defined!");
      }
    } catch (e) {
      console.log("Get file name ERROR: ", e);
      const error = e as { code?: number; message?: string };
      openModal({
        content: <Text>{error?.message ?? "Something went wrong..."}</Text>,
        modalName: "errorModal",
        type: "error"
      });
    }
  };

  const mintHandler = async () => {
    if (imageUrl === null || account === null || minterNFTContract === null) {
      openModal({
        content: <Text>Something went wrong...</Text>,
        modalName: "errorModal",
        type: "error"
      });
      return;
    }
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

    const fileName = await getFileName();

    if (fileName) {
      try {
        setIsLoading({
          state: true,
          text: "Saving..."
        });

        const response = await axios.post("api/uploadImageData", {
          imageUrl: imageUrl,
          fileName: fileName
        });

        console.log("Upload image data response: ", response);

        if (!response.data.success) {
          throw new Error(response.data?.message ?? "Something went wrong...");
        }

        setIsLoading({
          state: true,
          text: "Minting..."
        });
        const mintPrice = Number(
          await minterNFTContract.methods.mintPrice().call()
        );
        const mintRes = await minterNFTContract.methods.mint().send({
          from: account,
          value: String(mintPrice)
        });

        console.log("Mint image response: ", mintRes);
      } catch (e) {
        console.log("Mint NFT ERROR: ", e);
        const error = e as { code?: number; message?: string };
        openModal({
          content: <Text>{error?.message ?? "Something went wrong..."}</Text>,
          modalName: "errorModal",
          type: "error"
        });

        const removeImageDataResponse = await axios.post(
          "api/removeImageData",
          {
            fileName: fileName
          }
        );
        console.log("Remove image data response: ", removeImageDataResponse);
      } finally {
        setIsLoading({
          state: false,
          text: "Loading..."
        });
      }
    }
  };

  return (
    <Button onClick={mintHandler} size="small">
      Mint
    </Button>
  );
}
