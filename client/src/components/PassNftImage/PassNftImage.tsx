"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export default function PassNftImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const getImage = async () => {
    const imgRef = ref(storage, `images/PassNFT.png`);
    const imageUrl = await getDownloadURL(imgRef);
    setImageSrc(imageUrl);
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
    </div>
  );
}
