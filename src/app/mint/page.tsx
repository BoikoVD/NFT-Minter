import Header from "@/components/Header/Header";
import MintPassNFT from "@/components/MintPassNFT/MintPassNFT";
import PageContainer from "@/components/UI/PageContainer";
import Image from "next/image";
import PassNFTImage from '../../assets/images/PassNFT.webp';

export default function Mint() {
  return (
    <main className="font-poppins z-10 relative">
      <PageContainer>
        <Header />
        <section className="w-full h-screen flex-auto flex flex-col items-center justify-center pt-[80px]">
          <Image src={PassNFTImage} alt="pass nft" height={500}/>
          <div className="mt-10">
            <MintPassNFT />
          </div>
        </section>
      </PageContainer>
    </main>
  );
}