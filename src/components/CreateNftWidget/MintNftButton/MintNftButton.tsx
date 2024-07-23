"use client"
import axios from "axios";
import { useWeb3Context } from "@/context/Web3Context";
import Button from "@/components/UI/Button";

interface IMintNftButton {
    imageUrl: string | null,
    setIsLoading: React.Dispatch<React.SetStateAction<{
        state: boolean;
        text: string;
    }>>,
}

export default function MintNftButton({ imageUrl, setIsLoading }: IMintNftButton) {
    const { account, minterNFTContract, isCorrectNetwork, setIsSwitchNetworkModalOpen } = useWeb3Context();

    const mintHandler = async () => {
        if (imageUrl === null) return;
        if (account === null) return;
        if (minterNFTContract === null) return;
        if (!isCorrectNetwork) {
            setIsSwitchNetworkModalOpen({
                state: true,
                text: 'Please, switch network to Sepolia Testnet'
            });
            return;
        }

        try {
            setIsLoading({
                state: true,
                text: 'Saving...'
            });
            const fileName = Number(await minterNFTContract.methods.totalSupply().call()) + 1;

            const response = await axios.post('api/uploadImageData', {
                imageUrl: imageUrl,
                fileName: fileName,
            });
            
            console.log('Upload image data response: ', response);

            setIsLoading({
                state: true,
                text: 'Minting...'
            });
            const mintPrice = Number(await minterNFTContract.methods.mintPrice().call());
            const mintRes = await minterNFTContract.methods.mint().send({
                from: account,
                value: String(mintPrice)
            });

            console.log('Mint image response: ', mintRes);
        } catch (e) {
            console.log('Mint NFT ERROR: ', e);
        } finally {
            setIsLoading({
                state: false,
                text: 'Loading...'
            });
        }
    }

    return (
        <Button 
            onClick={mintHandler}
            size='small'
            className="mt-6"
        >
            Mint
        </Button>
    );
};