import Header from "@/components/Header/Header";
import Button from "@/components/UI/Button";
import PageContainer from "@/components/UI/PageContainer";
import Text from "@/components/UI/Text";
import Title from "@/components/UI/Title";
import Image from "next/image";
import MainImage from '../assets/images/main.webp';

export default function Home() {
  return (
    <main className="font-poppins">
      <PageContainer>
        <Header />
        <section className="w-full h-screen flex-auto flex items-center pt-[80px]">
          <div className="flex-[1_1_50%] pr-10">
            <Title tag="h1">
              GATHER YOUR <span className="font-bold">RARE NFT</span> HAS ARIVED
            </Title>
            <Text className="my-10 w-[420px]">
              Get started with the easiest and most secured platform to buy and trade digital <span className="font-bold">ART and NFT</span>
            </Text>
            <Button>
              Explore More
            </Button>
          </div>
          <div className="flex-[1_1_50%]">
            <Image src={MainImage} alt='The Pass NFT' priority/>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
