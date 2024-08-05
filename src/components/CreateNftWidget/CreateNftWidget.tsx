"use client";
import { useState } from "react";
import Image from "next/image";
import GradientBox from "@/components/UI/GradientBox";
import Loading from "@/components/Loading/Loading";
import Text from "@/components/UI/Text";
import GenerateImageForm from "./GenerateImageForm/GenerateImageForm";
import MintNftButton from "./MintNftButton/MintNftButton";

const styles = {
  wrapper: "w-full md:max-w-[1000px]",
  contentContainer:
    "flex w-full flex-col items-center gap-10 rounded-xl p-5 md:flex-row lg:gap-20 lg:p-10",
  mintBox: "flex flex-col items-center justify-between",
  imageGeneratingArea:
    "flex h-[230px] w-[230px] flex-col justify-center overflow-hidden rounded-xl bg-[rgba(0,0,0,0.2)] p-4 sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] lg:p-8",
  loadingWrapper: "flex items-center justify-center text-white",
  imageWrapper: "relative flex flex-[1_1_auto] overflow-hidden rounded-xl"
};

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
    <GradientBox
      wrapperClassName={styles.wrapper}
      className={styles.contentContainer}
    >
      <div className={styles.mintBox}>
        <div className={styles.imageGeneratingArea}>
          {isLoading.state ? (
            <div className={styles.loadingWrapper}>
              <Loading text={isLoading.text} />
            </div>
          ) : imageUrl ? (
            <>
              <div className={styles.imageWrapper}>
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
                negative prompt that will be a filter for the AI.
              </Text>
              <Text className="mt-2 text-center sm:mt-6">
                After the AI generate the image you will be able to claim this
                image as NFT.
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
  );
}
