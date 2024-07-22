"use client"
import { useState } from "react";
import Image from "next/image";
import GenerateImageForm from "./GenerateImageForm/GenerateImageForm";
import MintNftButton from "./MintNftButton/MintNftButton";
import Loading from "../Loading/Loading";

export default function CreateNftWidget() {
    const [isLoading, setIsLoading] = useState<{
        state: boolean,
        text: string
    }>({
        state: false,
        text: 'Loading...'
    });
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (<>
        <div className="bg-border-gradient p-[1px] rounded-xl w-full md:w-[500px]">
            <div className="p-5 bg-purple rounded-xl flex flex-col items-center w-full sm:p-10">
                {isLoading.state
                    ? <div className="w-[300px] h-[300px] flex items-center justify-center text-white">
                        <Loading text={isLoading.text}/> 
                    </div>
                    :   imageUrl 
                        ? <>
                            <div className="w-[300px] h-[300px] rounded-[20px] overflow-hidden">
                                <Image src={imageUrl} alt="generated nft" height={300} width={300}/>
                            </div>
                            <MintNftButton imageUrl={imageUrl} setIsLoading={setIsLoading}/>
                        </>
                        : <GenerateImageForm setImageUrl={setImageUrl} setIsLoading={setIsLoading}/>
                }
            </div>
        </div>
    </>);
};