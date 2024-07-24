"use client"
import axios from "axios";
import { useWeb3Context } from "@/context/Web3Context";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";
import { useErrorModal } from "@/hooks/modals/useErrorModal";
import Button from "@/components/UI/Button";

interface IMintNftButton {
    imageUrl: string | null,
    setIsLoading: React.Dispatch<React.SetStateAction<{
        state: boolean;
        text: string;
    }>>,
}

export default function MintNftButton({ imageUrl, setIsLoading }: IMintNftButton) {
    const { account, minterNFTContract, isCorrectNetwork } = useWeb3Context();
    const { openModal } = useSwitchNetworkModal();
    const { openErrorModal } = useErrorModal();

    const getFileName = async () => {
        try {
            if (minterNFTContract) {
                const fileName = Number(await minterNFTContract.methods.totalSupply().call()) + 1;
                return fileName.toString();
            } else {
                throw new Error('Minter NFT contract is not defined!');
            }
        } catch (e) {
            console.log('Get file name ERROR: ', e);
            const error = e as { code?: number, message?: string };
            openErrorModal(error?.message ?? 'Something went wrong...');
        }
    }

    const mintHandler = async () => {
        if (imageUrl === null || account === null || minterNFTContract === null) {
            openErrorModal();
            return;
        };
        if (!isCorrectNetwork) {
            openModal();
            return;
        }

        const fileName = await getFileName();

        if (fileName) {
            try {
                setIsLoading({
                    state: true,
                    text: 'Saving...'
                });
    
                const response = await axios.post('api/uploadImageData', {
                    imageUrl: imageUrl,
                    fileName: fileName,
                });
                
                console.log('Upload image data response: ', response);
    
                if (!response.data.success) {
                    throw new Error(response.data?.message ?? 'Something went wrong...');
                }
    
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
                const error = e as { code?: number, message?: string };
                openErrorModal(error?.message ?? 'Something went wrong...');

                const removeImageDataResponse = await axios.post('api/removeImageData', {
                    fileName: fileName,
                });
                console.log('Remove image data response: ', removeImageDataResponse);
            } finally {
                setIsLoading({
                    state: false,
                    text: 'Loading...'
                });
            }
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