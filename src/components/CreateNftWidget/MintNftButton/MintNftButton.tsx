"use client"
import axios from "axios";
import { useWeb3Context } from "@/context/Web3Context";

interface IMintNftButton {
    imageUrl: string | null,
}

export default function MintNftButton({ imageUrl }: IMintNftButton) {
    const { account, minterNFTContract } = useWeb3Context();

    const mintHandler = async () => {
        if (imageUrl === null) return;
        if (account === null) return;
        if (minterNFTContract === null) return;

        try {
            const fileName = Number(await minterNFTContract.methods.totalSupply().call()) + 1;

            const response = await axios.post('api/uploadImageData', {
                imageUrl: imageUrl,
                fileName: fileName,
            });
            
            console.log('Upload image data response: ', response);

            const mintPrice = Number(await minterNFTContract.methods.mintPrice().call());
            const mintRes = await minterNFTContract.methods.mint().send({
                from: account,
                value: String(mintPrice)
            });

            console.log('Mint image response: ', mintRes);
        } catch (e) {
            console.log('Mint NFT ERROR: ', e);
        }
    }

    return (
        <button onClick={mintHandler}>Mint</button>
    );
};