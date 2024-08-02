'use client'
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import GradientBox from "../UI/GradientBox";
import Text from "../UI/Text";
import Title from "../UI/Title";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function HowItWorksContent() {
    const [params, setParams] = useState<number[]>([]);
    const { width } = useWindowSize();

    useEffect(() => {
        const htwEl1 = document.getElementById("htw_el_1");
        const htwEl2 = document.getElementById("htw_el_2");
        const htwEl3 = document.getElementById("htw_el_3");

        if (htwEl1 && htwEl2 && htwEl3) {
            const p1 = htwEl1.offsetTop + (htwEl1.offsetHeight / 2);
            const p2 = htwEl2.offsetTop + (htwEl2.offsetHeight / 2) - p1;
            const p3 = htwEl3.offsetTop + (htwEl3.offsetHeight / 2) - p1;
            const newParams = [p1, p2, p3];
            setParams(newParams);
        }
    }, []);

    return <div className="flex flex-col w-full mt-10 relative gap-4 sm:gap-6 md:gap-0">
        <GradientBox wrapperClassName="md:w-[45%] md:self-start" className="p-6 flex flex-col items-center md:items-end" transparentBorder={width && width >= 768 ? "left" : undefined} id="htw_el_1">
            <Text className="mb-4 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-pink text-purple md:hidden" size="large">1</Text>
            <Title tag="h3" size='medium' className="text-center md:text-right">Get Your Pass NFT</Title>
            <Text className="mt-4 text-center md:text-right">Purchase a Pass NFT to unlock unlimited access to our AI image generator and NFT claiming features</Text>
            <Button size="small" className="mt-4">
                Get Pass NFT
            </Button>
        </GradientBox>
        <GradientBox wrapperClassName="md:w-[45%] md:self-end md:my-[-40px]" className="p-6 flex flex-col items-center md:items-start" transparentBorder={width && width >= 768 ? "right" : undefined} id="htw_el_2">
            <Text className="mb-4 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-pink text-purple md:hidden" size="large">2</Text>
            <Title tag="h3" size='medium' className="text-center md:text-left">Generate Your Image</Title>
            <Text className="mt-4 text-center md:text-left">Use our powerful AI to create unique and stunning images tailored to your vision</Text>
            <Button size="small" className="mt-4">
                Generate
            </Button>
        </GradientBox>
        <GradientBox wrapperClassName="md:w-[45%] md:self-start" className="p-6 flex flex-col items-center md:items-end" transparentBorder={width && width >= 768 ? "left" : undefined} id="htw_el_3">
            <Text className="mb-4 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-pink text-purple md:hidden" size="large">3</Text>
            <Title tag="h3" size='medium' className="text-center md:text-right">Claim Your NFT</Title>
            <Text className="mt-4 text-center md:text-right">Secure your creation on the blockchain as an NFT and start trading</Text>
        </GradientBox>
        {params.length > 0 && <div className="absolute top-[50%] left-[50%] translate-x-[-50%] w-[2px] bg-pink hidden md:block" style={{top: params[0], height: params[2]}}>
            <div className="flex justify-center items-center w-[30px] h-[30px] absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-99%] rounded-full border border-pink border-[2px] bg-pink text-purple font-bold">
                1
            </div>
            <div className="flex justify-center items-center w-[30px] h-[30px] absolute left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink border-[2px] bg-pink text-purple font-bold" style={{top: params[1]}}>
                2
            </div>
            <div className="flex justify-center items-center w-[30px] h-[30px] absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border border-pink border-[2px] bg-pink text-purple font-bold">
                3
            </div>
        </div>}
    </div>;
};