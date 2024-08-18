import PassNftImage from "@/components/PassNftImage/PassNftImage";
import MintPassNFT from "@/components/MintPassNFT/MintPassNFT";
import Title from "@/components/UI/Title";
import Text from "@/components/UI/Text";

const styles = {
  main: "contentContainer relative z-10 font-courierPrime",
  section:
    "flex min-h-screen w-full flex-auto flex-col items-center justify-center pb-6 pt-[100px] md:pt-[150px]",
  contentContainer:
    "flex flex-col items-center gap-10 p-6 borderGradient md:p-10 lg:flex-row lg:gap-20",
  textBox: "flex flex-col items-center lg:items-start",
  listItem: "pl-6 relative",
  beforeElementOfListItem:
    "before:absolute before:top-[50%] before:left-0 before:bg-white before:w-[6px] before:h-[6px] before:rounded-full before:translate-y-[-50%]"
};

export default function Mint() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.contentContainer}>
          <PassNftImage />
          <div className={styles.textBox}>
            <Title tag="h1" size="medium" className="text-center lg:text-left">
              Unlock unlimited creativity and secure your digital art with our
              Pass NFT
            </Title>
            <Text className="mt-6 text-center lg:text-left">
              Enjoy unrestricted access to our AI image generator and NFT
              claiming features
            </Text>
            <ul className="mb-10 mt-6">
              <li
                className={`${styles.listItem} ${styles.beforeElementOfListItem}`}
              >
                <Text>Unlimited access to AI image generation</Text>
              </li>
              <li
                className={`${styles.listItem} ${styles.beforeElementOfListItem}`}
              >
                <Text>Unlimited NFT claims</Text>
              </li>
              <li
                className={`${styles.listItem} ${styles.beforeElementOfListItem}`}
              >
                <Text>Priority support</Text>
              </li>
              <li
                className={`${styles.listItem} ${styles.beforeElementOfListItem}`}
              >
                <Text>Early access to new features</Text>
              </li>
            </ul>
            <MintPassNFT />
          </div>
        </div>
      </section>
    </main>
  );
}
