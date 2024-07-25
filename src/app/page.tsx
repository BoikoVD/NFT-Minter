import Header from "@/components/Header/Header";
import Button from "@/components/UI/Button";
import PageContainer from "@/components/UI/PageContainer";
import Text from "@/components/UI/Text";
import Title from "@/components/UI/Title";
import Image from "next/image";
import MainImage from '../assets/images/main.webp';

export default function Home() {
  return (
    <main className="font-poppins z-10 relative">
      <PageContainer>
        <Header />
        <section className="w-full min-h-screen flex-auto flex flex-col items-center mt-[150px] md:flex-row md:mt-0">
          <div className="text-center md:pr-10 md:text-left md:flex-[1_1_40%] lg:flex-[0_0_50%]">
            <Title tag="h1">
              UNLEASH YOUR IMAGINATION WITH <span className="whitespace-nowrap">AI-GENERATED NFTS</span>
            </Title>
            <Text className="my-10 lg:w-[420px]">
              Generate unique images with AI, claim them as NFTs, and unlock limitless potential with our <span className="font-bold whitespace-nowrap">exclusive Pass NFT</span>
            </Text>
            <Button >
              Explore More
            </Button>
          </div>
          <div className="md:flex-[1_1_60%] lg:flex-[0_0_50%]">
            <Image src={MainImage} alt='The Pass NFT' priority/>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
