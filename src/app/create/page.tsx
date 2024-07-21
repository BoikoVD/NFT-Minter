"use client"
import { FormEvent, useState } from "react";
import { Web3 } from 'web3';
import axios from "axios";
import Image from "next/image";
import { useWeb3Context } from "@/context/Web3Context";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/UI/PageContainer";
import minterNFT from "./MinterNFT.json";

interface FormElements extends HTMLFormControlsCollection {
    prompt: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
   readonly elements: FormElements
}

export default function Create() {
    const { account } = useWeb3Context();

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const submitHandler = async (e: FormEvent<FormElement>) => {
        e.preventDefault();
        const resp = await axios.post('api/createImage', {
            prompt: e.currentTarget.prompt.value
        });

        console.log('[LimeWire]: Create Image response: ', resp);

        if (resp?.data?.apiResponse?.data[0]?.asset_url) {
            setImageUrl(resp.data.apiResponse.data[0].asset_url);
        }
    }

    const mint = async () => {
        if (imageUrl === null) return;
        if (account === null) return;

        try {
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(minterNFT.abi, process.env.NEXT_PUBLIC_MINTER_NFT_CONTRACT_ADDRESS);
            const fileName = Number(await contract.methods.totalSupply().call()) + 1;

            const response = await axios.post('api/uploadImageData', {
                imageUrl: imageUrl,
                fileName: fileName,
            });
            
            console.log('Upload image data response: ', response);

            const mintPrice = Number(await contract.methods.mintPrice().call());
            const mintRes = await contract.methods.mint().send({
                from: account,
                value: String(mintPrice)
            });

            console.log('Mint image response: ', mintRes);
        } catch (e) {
            console.log('Mint NFT ERROR: ', e);
        }
    }

    return (
        <main className="font-poppins">
        <PageContainer>
            <Header />
            <section className="w-full h-screen flex-auto flex flex-col items-center justify-center pt-[80px]">
            <form onSubmit={submitHandler}>
                <input type='text' name="prompt"/>
                <button type='submit'>
                    Create
                </button>
            </form>
            {imageUrl && <div className="w-[300px] h-[300px] rounded-[20px] overflow-hidden">
                <Image src={imageUrl} alt="created nft" height={300} width={300}/>
            </div>}
            <button onClick={mint}>Mint</button>
            </section>
        </PageContainer>
        </main>
    );
}