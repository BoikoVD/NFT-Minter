"use client"
import Header from "@/components/Header/Header";
import PageContainer from "@/components/UI/PageContainer";
import Image from "next/image";
import axios from "axios";
import { FormEvent, useState } from "react";

interface FormElements extends HTMLFormControlsCollection {
    prompt: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
   readonly elements: FormElements
}

export default function Create() {
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
            </section>
        </PageContainer>
        </main>
    );
}