"use client"
import { useState } from "react";
import Image from "next/image";
import GenerateImageForm from "./GenerateImageForm/GenerateImageForm";
import MintNftButton from "./MintNftButton/MintNftButton";

export default function CreateNftWidget() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (
        <div>
            <GenerateImageForm setImageUrl={setImageUrl}/>
            {imageUrl && <div className="w-[300px] h-[300px] rounded-[20px] overflow-hidden">
                <Image src={imageUrl} alt="created nft" height={300} width={300}/>
            </div>}
            <MintNftButton imageUrl={imageUrl}/>
        </div>
    );
};