import Header from "@/components/Header/Header";
import MintPassNFT from "@/components/MintPassNFT/MintPassNFT";
import Button from "@/components/UI/Button";
import PageContainer from "@/components/UI/PageContainer";
import Text from "@/components/UI/Text";
import Title from "@/components/UI/Title";

export default function Mint() {
  return (
    <main className="font-poppins">
      <PageContainer>
        <Header />
        <section className="w-full h-screen flex-auto flex items-center justify-center pt-[80px]">
          <div className="">
            <MintPassNFT />
          </div>
        </section>
      </PageContainer>
    </main>
  );
}