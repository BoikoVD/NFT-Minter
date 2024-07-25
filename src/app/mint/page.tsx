import Header from "@/components/Header/Header";
import MintPassNFT from "@/components/MintPassNFT/MintPassNFT";
import PageContainer from "@/components/UI/PageContainer";
import Image from "next/image";
import PassNFTImage from '../../assets/images/PassNFT.webp';
import Title from "@/components/UI/Title";
import Text from "@/components/UI/Text";
import GradientBox from "@/components/UI/GradientBox";

const liStyle = "pl-6 relative before:absolute before:top-[50%] before:left-0 before:bg-white before:w-[6px] before:h-[6px] before:rounded-full before:translate-y-[-50%]";

export default function Mint() {
  return (
    <main className="font-poppins z-10 relative">
      <PageContainer>
        <Header />
        <section className="w-full min-h-screen flex-auto flex flex-col items-center justify-center pt-[95px] pb-6 md:pt-[150px]">
          <GradientBox className="p-6 flex flex-col items-center gap-10 md:p-10 lg:flex-row lg:items-start lg:gap-20">
            <div className="max-w-[300px] lg:max-w-[500px] lg:min-w-[300px]">
              <Image src={PassNFTImage} alt="pass nft"/>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <Title tag="h1" size='medium' className="text-center lg:text-left">
                Unlock unlimited creativity and secure your digital art with our Pass NFT
              </Title>
              <Text className="mt-6 text-center lg:text-left">
                Enjoy unrestricted access to our AI image generator and NFT claiming features
              </Text>
              <ul className="mt-6 mb-10">
                <li className={liStyle}>
                  <Text>Unlimited access to AI image generation</Text>
                </li>
                <li className={liStyle}>
                  <Text>Unlimited NFT claims</Text>
                </li>
                <li className={liStyle}>
                  <Text>Priority support</Text>
                </li>
                <li className={liStyle}>
                  <Text>Early access to new features</Text>
                </li>
              </ul>
              <MintPassNFT />
            </div>
          </GradientBox>
        </section>
      </PageContainer>
    </main>
  );
}