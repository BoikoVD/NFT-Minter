import Header from "@/components/Header/Header";
import Button from "@/components/UI/Button";
import PageContainer from "@/components/UI/PageContainer";
import Text from "@/components/UI/Text";
import Title from "@/components/UI/Title";
import GradientBox from "@/components/UI/GradientBox";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import MainAnimatedImages from "@/components/MainAnimatedImages/MainAnimatedImages";

export default function Home() {
  return (
    <main className="font-courierPrime z-10 relative">
      <PageContainer>
        <Header />
        <section className="w-full min-h-screen flex-auto flex flex-col items-center pt-[100px] pb-10 h-full md:flex-row md:pt-[150px] xl:h-screen">
          <div className="text-center md:pr-10 md:text-left md:flex-[0_0_50%]">
            <Title tag="h1">
              UNLEASH YOUR IMAGINATION WITH <span className="whitespace-nowrap">AI-GENERATED</span> NFTS
            </Title>
            <Text className="my-10 lg:w-[420px]">
              Generate unique images with AI, claim them as NFTs, and unlock limitless potential with our <span className="font-bold whitespace-nowrap">exclusive Pass NFT</span>
            </Text>
            <Button >
              Explore More
            </Button>
            <div className="flex flex-col justify-center gap-8 mt-8 sm:flex-row md:justify-start xl:gap-14 xl:mt-14">
              <p className="text-white text-center">
                <span className="text-2xl font-bold xl:text-4xl">43 k +</span><br/> NFTs created
              </p>
              <p className="text-white text-center">
                <span className="text-2xl font-bold xl:text-4xl">18 k +</span><br/> Pass NFTs minted
              </p>
              <p className="text-white text-center">
                <span className="text-2xl font-bold xl:text-4xl">7 k +</span><br/> Unique wallets
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-[450px] mt-6 md:mt-0 md:flex-[0_0_50%] md:h-[500px] lg:h-[600px] xl:h-full">
            <MainAnimatedImages />
            <GradientBox className="flex flex-col p-4 items-center bg-purple">
              <Text className="mb-2 text-center">
                Hurry up to mint at a reduced price
              </Text>
              <CountdownTimer/>
              <Button size='small' className="mt-8">
                Mint
              </Button>
            </GradientBox>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
