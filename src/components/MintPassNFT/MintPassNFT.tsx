"use client"
import { ethers } from "ethers";
import { useWeb3Context } from "@/context/Web3Context";
import Button from "../UI/Button";
import Text from "../UI/Text";
import passNFT from "./PassNFT.json";

const PassNFTAddress = '0x516427DcB763358617D182331a1499b01C4b0228';

export default function MintPassNFT() {
    const { account } = useWeb3Context();

    const handleMint = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(PassNFTAddress, passNFT.abi, signer);

            try {
                const res = await contract.mint(BigInt(1), {
                    value: ethers.parseEther('0.01')
                });
                console.log('Mint Pass NFT: ', res)
            } catch (e) {
                console.log('Mint Pass NFT ERROR: ', e)
            }
        }
    }

    return account
        ? <Button onClick={handleMint}>
            Mint
        </Button>
        : <Text>
            You must connect a wallet to mint!
        </Text>;
};