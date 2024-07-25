"use client"
import { useState } from "react";
import Image from "next/image";
import GenerateImageForm from "./GenerateImageForm/GenerateImageForm";
import MintNftButton from "./MintNftButton/MintNftButton";
import Loading from "../Loading/Loading";
import Text from "../UI/Text";
import GradientBox from "../UI/GradientBox";

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
        <GradientBox className="p-5 rounded-xl flex flex-col items-center gap-10 w-full md:max-w-[1000px] md:flex-row lg:p-10 lg:gap-20">
            <div className="flex flex-col items-center justify-between ">
                <div className="w-[230px] h-[230px] rounded-xl bg-[rgba(0,0,0,0.2)] p-4 flex flex-col justify-center overflow-hidden sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:p-8 lg:w-[400px] lg:h-[400px]">
                    {isLoading.state
                        ? <div className="flex items-center justify-center text-white">
                            <Loading text={isLoading.text}/> 
                        </div>
                        : imageUrl 
                            ? <>
                                <div className="rounded-xl overflow-hidden relative flex flex-[1_1_auto]">
                                    <Image src={imageUrl} alt="generated nft" fill={true} objectFit="cover"/>
                                </div>
                            </>
                            : <><Text className="text-center">
                                Enter your text prompt to generate image, you can also enter a negative prompt that will be a filter for the AI
                            </Text>
                            <Text className="text-center mt-6">
                                After the AI generate the image you will be able to claim this image as NFT
                            </Text></>
                    }
                </div>
                <div className="mt-6">
                    {imageUrl && <MintNftButton imageUrl={imageUrl} setIsLoading={setIsLoading}/>}
                </div>
            </div>
            <GenerateImageForm 
                setImageUrl={setImageUrl} 
                setIsLoading={setIsLoading}
            />
        </GradientBox>
    </>);
};