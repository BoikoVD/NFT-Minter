import Header from "@/components/Header/Header";
import MintPassNFT from "@/components/MintPassNFT/MintPassNFT";
import PageContainer from "@/components/UI/PageContainer";
import Image from "next/image";
import PassNFTImage from "../../assets/images/PassNFT.webp";
import Title from "@/components/UI/Title";
import Text from "@/components/UI/Text";
import GradientBox from "@/components/UI/GradientBox";

const liStyle =
  "pl-6 relative before:absolute before:top-[50%] before:left-0 before:bg-white before:w-[6px] before:h-[6px] before:rounded-full before:translate-y-[-50%]";

export default function Mint() {
  return (
    <main className="relative z-10 font-courierPrime">
      <PageContainer>
        <Header />
        <section className="flex min-h-screen w-full flex-auto flex-col items-center justify-center pb-6 pt-[100px] md:pt-[150px]">
          <GradientBox className="flex flex-col items-center gap-10 p-6 md:p-10 lg:flex-row lg:items-start lg:gap-20">
            <div className="max-w-[300px] lg:min-w-[300px] lg:max-w-[500px]">
              <Image src={PassNFTImage} alt="pass nft" />
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <Title
                tag="h1"
                size="medium"
                className="text-center lg:text-left"
              >
                Unlock unlimited creativity and secure your digital art with our
                Pass NFT
              </Title>
              <Text className="mt-6 text-center lg:text-left">
                Enjoy unrestricted access to our AI image generator and NFT
                claiming features
              </Text>
              <ul className="mb-10 mt-6">
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
