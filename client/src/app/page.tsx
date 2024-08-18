import Text from "@/components/UI/Text";
import Title from "@/components/UI/Title";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import MainAnimatedImages from "@/components/MainAnimatedImages/MainAnimatedImages";
import StepCards from "@/components/StepCards/StepCards";
import Accordion from "@/components/Acordion/Acordion";
import ScrollToButton from "@/components/ScrollToButton/ScrollToButton";
import LinkButton from "@/components/LinkButton/LinkButton";

const howItWorksData = [
  {
    title: "Get Your Pass NFT",
    description:
      "Purchase a Pass NFT to unlock unlimited access to our AI image generator and NFT claiming features.",
    redirectData: {
      to: "/mint",
      text: "Get Pass NFT"
    }
  },
  {
    title: "Generate Your Image",
    description:
      "Use our powerful AI to create unique and stunning images tailored to your vision.",
    redirectData: {
      to: "/create",
      text: "Generate"
    }
  },
  {
    title: "Claim Your NFT",
    description:
      "Secure your creation on the blockchain as an NFT and start trading."
  }
];

const faqAcordionData = [
  {
    question: "What is a Pass NFT?",
    answer:
      "A Pass NFT is your key to unlocking unlimited use of our AI image generation and NFT claiming features."
  },
  {
    question: "How do I generate an image?",
    answer:
      "Simply use our intuitive AI tool to create unique images based on your input."
  },
  {
    question: "How do I claim an NFT?",
    answer:
      "After generating your image, click 'Claim NFT' to mint it on the blockchain."
  }
];

const styles = {
  main: "contentContainer relative z-10 font-courierPrime",
  section: "flex flex-col items-center py-10",
  homeSection:
    "h-full min-h-screen w-full flex-auto pt-[100px] md:flex-row md:pt-[150px] xl:h-screen",
  textContainer: "text-center md:flex-[0_0_50%] md:pr-10 md:text-left",
  imagesContainer:
    "mt-6 flex h-[450px] flex-col items-center justify-center md:mt-0 md:h-[500px] md:flex-[0_0_50%] lg:h-[600px] xl:h-full",
  statInfoContainer:
    "text-center text-white mt-8 flex flex-col justify-center gap-8 sm:flex-row md:justify-start xl:mt-14 xl:gap-14",
  statInfoText: "text-2xl font-bold xl:text-4xl",
  advertisingContainer:
    "flex flex-col items-center bg-purple p-4 borderGradient"
};

export default function Home() {
  const hiwSectionId = "how_it_works_section_identifier";

  return (
    <main className={styles.main}>
      <section className={`${styles.section} ${styles.homeSection}`}>
        <div className={styles.textContainer}>
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
          <ScrollToButton elementId={hiwSectionId}>Explore More</ScrollToButton>
          <div className={styles.statInfoContainer}>
            <p>
              <span className={styles.statInfoText}>43 k +</span>
              <br /> NFTs created
            </p>
            <p>
              <span className={styles.statInfoText}>18 k +</span>
              <br /> Pass NFTs minted
            </p>
            <p>
              <span className={styles.statInfoText}>7 k +</span>
              <br /> Unique wallets
            </p>
          </div>
        </div>
        <div className={styles.imagesContainer}>
          <MainAnimatedImages />
          <div className={styles.advertisingContainer}>
            <Text className="mb-2 text-center">
              Hurry up to mint at a reduced price
            </Text>
            <CountdownTimer />
            <LinkButton to="/mint" className="mt-8">
              Mint
            </LinkButton>
          </div>
        </div>
      </section>
      <section className={`${styles.section}`} id={hiwSectionId}>
        <Title tag="h2">HOW IT WORKS</Title>
        <StepCards data={howItWorksData} />
      </section>
      <section className={`${styles.section}`}>
        <Title tag="h2">FAQ</Title>
        <Accordion data={faqAcordionData} />
      </section>
    </main>
  );
}
