"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import NFT1Image from "../../assets/images/nft_1.webp";
import NFT2Image from "../../assets/images/nft_2.webp";
import NFT3Image from "../../assets/images/nft_3.webp";
import NFT4Image from "../../assets/images/nft_4.webp";
import NFT5Image from "../../assets/images/nft_5.webp";

export default function MainAnimatedImages() {
  return (
    <div className="relative z-[-1] mb-6 h-full max-h-[500px] w-full">
      <motion.div
        className="absolute left-[25%] top-0 z-[5] w-[55%]"
        animate={{ x: [0, 15, 8, 3], y: [0, 3, 8, 5], rotate: [-2, 0, 3, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <Image
          src={NFT1Image}
          alt="The Pass NFT"
          priority
          className="rounded-xl"
        />
      </motion.div>
      <motion.div
        className="absolute right-0 top-[5%] z-[4] w-[45%]"
        initial={{ rotate: 4 }}
        animate={{ x: [5, 4, 10], y: [8, 0, 5], rotate: [4, 3] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <Image
          src={NFT2Image}
          alt="The Pass NFT"
          priority
          className="rounded-xl"
        />
      </motion.div>
      <motion.div
        className="absolute left-0 top-[10%] z-[3] w-[45%]"
        initial={{ rotate: 1 }}
        animate={{ x: [1, 8, 10], y: [1, 5, -1], rotate: [1, -1] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <Image
          src={NFT3Image}
          alt="The Pass NFT"
          priority
          className="rounded-xl"
        />
      </motion.div>
      <motion.div
        className="absolute left-[15%] top-[45%] z-[2] w-[40%]"
        initial={{ rotate: 1 }}
        animate={{ x: [1, 8, 1], y: [1, 8, -2], rotate: [3, -3] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <Image
          src={NFT4Image}
          alt="The Pass NFT"
          priority
          className="rounded-xl"
        />
      </motion.div>
      <motion.div
        className="absolute right-[15%] top-[45%] z-[1] w-[35%]"
        initial={{ rotate: 1 }}
        animate={{ x: [4, 3, 9], y: [7, 3, 4], rotate: [2, -2] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <Image
          src={NFT5Image}
          alt="The Pass NFT"
          priority
          className="rounded-xl"
        />
      </motion.div>
    </div>
  );
}
