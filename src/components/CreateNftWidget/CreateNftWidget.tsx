"use client";
import { useState } from "react";
import Image from "next/image";
import GenerateImageForm from "./GenerateImageForm/GenerateImageForm";
import MintNftButton from "./MintNftButton/MintNftButton";
import Loading from "../Loading/Loading";
import Text from "../UI/Text";
import GradientBox from "../UI/GradientBox";

export default function CreateNftWidget() {
  const [isLoading, setIsLoading] = useState<{
    state: boolean;
    text: string;
  }>({
    state: false,
    text: "Loading..."
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <>
      <GradientBox className="flex w-full flex-col items-center gap-10 rounded-xl p-5 md:max-w-[1000px] md:flex-row lg:gap-20 lg:p-10">
        <div className="flex flex-col items-center justify-between">
          <div className="flex h-[230px] w-[230px] flex-col justify-center overflow-hidden rounded-xl bg-[rgba(0,0,0,0.2)] p-4 sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] lg:p-8">
            {isLoading.state ? (
              <div className="flex items-center justify-center text-white">
                <Loading text={isLoading.text} />
              </div>
            ) : imageUrl ? (
              <>
                <div className="relative flex flex-[1_1_auto] overflow-hidden rounded-xl">
                  <Image
                    src={imageUrl}
                    alt="generated nft"
                    fill={true}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      objectFit: "cover"
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <Text className="text-center">
                  Enter your text prompt to generate image, you can also enter a
                  negative prompt that will be a filter for the AI
                </Text>
                <Text className="mt-6 text-center">
                  After the AI generate the image you will be able to claim this
                  image as NFT
                </Text>
              </>
            )}
          </div>
          <div className="mt-6">
            {imageUrl && (
              <MintNftButton imageUrl={imageUrl} setIsLoading={setIsLoading} />
            )}
          </div>
        </div>
        <GenerateImageForm
          setImageUrl={setImageUrl}
          setIsLoading={setIsLoading}
        />
      </GradientBox>
    </>
  );
}
