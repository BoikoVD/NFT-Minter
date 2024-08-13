"use client";
import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import Text from "@/components/UI/Text";
import { storage } from "@/firebase/firebase";

export default function PassNftImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const getImage = async () => {
    try {
      const imgRef = ref(storage, `images/PassNFT.png`);
      const imageUrl = await getDownloadURL(imgRef);
      setImageSrc(imageUrl);
      setFetchError(null);
    } catch (e: unknown) {
      console.log("Fetch pass nft image Error: ", e);
      setFetchError("Something went wrong");
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="max-w-[300px] overflow-hidden rounded-xl lg:min-w-[300px] lg:max-w-[500px]">
      {imageSrc && (
        <Image
          src={imageSrc}
          width={1000}
          height={1000}
          alt="pass nft"
          style={{
            maxWidth: "100%",
            height: "auto"
          }}
        />
      )}
      {!imageSrc && fetchError && (
        <div className="flex flex-col items-center">
          <IoIosWarning size={80} className="fill-red" />
          <Text className="mt-6" color="red">
            {fetchError}
          </Text>
        </div>
      )}
    </div>
  );
}
