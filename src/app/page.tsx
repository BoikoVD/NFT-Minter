import Header from "@/components/Header/Header";
import Button from "@/components/UI/Button";
import PageContainer from "@/components/UI/PageContainer";
import Text from "@/components/UI/Text";
import Title from "@/components/UI/Title";
import GradientBox from "@/components/UI/GradientBox";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import MainAnimatedImages from "@/components/MainAnimatedImages/MainAnimatedImages";
import HowItWorksContent from "@/components/HowItWorksContent/HowItWorksContent";
import Accordion from "@/components/Acordion/Acordion";

export default function Home() {
  return (
    <main className="relative z-10 font-courierPrime">
      <PageContainer>
        <Header />
        <section className="flex h-full min-h-screen w-full flex-auto flex-col items-center pb-10 pt-[100px] md:flex-row md:pt-[150px] xl:h-screen">
          <div className="text-center md:flex-[0_0_50%] md:pr-10 md:text-left">
            <Title tag="h1">
              UNLEASH YOUR IMAGINATION WITH{" "}
              <span className="whitespace-nowrap">AI-GENERATED</span> NFTS
            </Title>
            <Text className="my-10 lg:w-[420px]">
              Generate unsique images with AI, claim them as NFTs, and unlock
              limitless potential with our{" "}
              <span className="whitespace-nowrap font-bold">
                exclusive Pass NFT
              </span>
            </Text>
            <Button>Explore More</Button>
            <div className="mt-8 flex flex-col justify-center gap-8 sm:flex-row md:justify-start xl:mt-14 xl:gap-14">
              <p className="text-center text-white">
                <span className="text-2xl font-bold xl:text-4xl">43 k +</span>
                <br /> NFTs created
              </p>
              <p className="text-center text-white">
                <span className="text-2xl font-bold xl:text-4xl">18 k +</span>
                <br /> Pass NFTs minted
              </p>
              <p className="text-center text-white">
                <span className="text-2xl font-bold xl:text-4xl">7 k +</span>
                <br /> Unique wallets
              </p>
            </div>
          </div>
          <div className="mt-6 flex h-[450px] flex-col items-center justify-center md:mt-0 md:h-[500px] md:flex-[0_0_50%] lg:h-[600px] xl:h-full">
            <MainAnimatedImages />
            <GradientBox className="flex flex-col items-center bg-purple p-4">
              <Text className="mb-2 text-center">
                Hurry up to mint at a reduced price
              </Text>
              <CountdownTimer />
              <Button size="small" className="mt-8">
                Mint
              </Button>
            </GradientBox>
          </div>
        </section>
        <section className="flex flex-col items-center py-10">
          <Title tag="h2">HOW IT WORKS</Title>
          <HowItWorksContent />
        </section>
        <section className="flex flex-col items-center py-10">
          <Title tag="h2">FAQ</Title>
          <Accordion />
        </section>
      </PageContainer>
    </main>
  );
}
