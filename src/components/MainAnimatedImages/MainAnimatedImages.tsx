'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import NFT1Image from '../../assets/images/nft_1.webp';
import NFT2Image from '../../assets/images/nft_2.webp';
import NFT3Image from '../../assets/images/nft_3.webp';
import NFT4Image from '../../assets/images/nft_4.webp';
import NFT5Image from '../../assets/images/nft_5.webp';

export default function MainAnimatedImages() {

    return (
        <div className="w-full relative h-full max-h-[500px] mb-6 z-[-1]">
            <motion.div
                className="absolute z-[5] top-0 left-[25%] w-[55%]"
                animate={{ x: [0, 15, 8, 3], y: [0, 3, 8, 5], rotate: [-2, 0, 3, 0] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: "reverse",
                }}
            >
                <Image src={NFT1Image} alt='The Pass NFT' priority className="rounded-xl"/>
            </motion.div>
            <motion.div
                className="absolute top-[5%] z-[4] right-0 w-[45%]"
                initial={{ rotate: 4 }}
                animate={{ x: [5, 4, 10], y: [8, 0, 5], rotate: [4, 3] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: "reverse",
                }}
            >
                <Image src={NFT2Image} alt='The Pass NFT' priority className="rounded-xl"/>
            </motion.div>
            <motion.div
                className="absolute top-[10%] z-[3] left-0 w-[45%]"
                initial={{ rotate: 1 }}
                animate={{ x: [1, 8, 10], y: [1, 5, -1], rotate: [1, -1] }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: "reverse",
                }}
            >
                <Image src={NFT3Image} alt='The Pass NFT' priority className="rounded-xl"/>
            </motion.div>
            <motion.div
                className="absolute top-[45%] z-[2] left-[15%] w-[40%]"
                initial={{ rotate: 1 }}
                animate={{ x: [1, 8, 1], y: [1, 8, -2], rotate: [3, -3] }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: "reverse",
                }}
            >
                <Image src={NFT4Image} alt='The Pass NFT' priority className="rounded-xl"/>
            </motion.div>
            <motion.div
                className="absolute top-[45%] z-[1] right-[15%] w-[35%]"
                initial={{ rotate: 1 }}
                animate={{ x: [4, 3, 9], y: [7, 3, 4], rotate: [2, -2] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: "reverse",
                }}
            >
                <Image src={NFT5Image} alt='The Pass NFT' priority className="rounded-xl"/>
            </motion.div>
        </div>
    );
};