import Image from "next/image";
import { RiMailFill, RiMapPinFill } from "react-icons/ri";
import Text from "@/components/UI/Text";
import Button from "@/components/UI/Button";
import LogoImage from "@/assets/images/logo.webp";

const styles = {
  footer: "bg-footer-bg relative mt-10 w-full pb-10 backdrop-blur-sm",
  footerBeforeEl:
    "before:absolute before:top-0 before:left-0 before:h-[2px] before:w-full before:bg-button-gradient",
  contentWrapper:
    "contentContainer items-center pt-6 sm:flex-row sm:justify-between",
  infoContainer: "flex flex-col items-center sm:items-start",
  logo: "relative flex w-[150px] flex-col items-center md:w-[180px]",
  infoText: "mt-4 max-w-[240px] text-center sm:max-w-[300px] sm:text-left",
  contactsContainer: "mt-6 flex flex-col gap-4 sm:mt-0",
  contactItem: "flex items-center"
};

export default function Footer() {
  return (
    <footer className={`${styles.footer} ${styles.footerBeforeEl}`}>
      <div className={`${styles.contentWrapper}`}>
        <div className={`${styles.infoContainer}`}>
          <div className={`${styles.logo}`}>
            <Image
              src={LogoImage}
              alt="logo image"
              fill={false}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover"
              }}
            />
          </div>
          <Text className={`${styles.infoText}`}>
            Get started with the easiest and most secured platform to create
            digital ART and NFT’s
          </Text>
          <Button size="small" className="mt-4">
            Get Started
          </Button>
        </div>
        <div className={`${styles.contactsContainer}`}>
          <div className={`${styles.contactItem}`}>
            <RiMapPinFill size={30} className="fill-pink" />
            <Text className="ml-2">40.7128° N, 74.0060° W</Text>
          </div>
          <div className={`${styles.contactItem}`}>
            <RiMailFill size={30} className="fill-pink" />
            <Text className="ml-2">artbloc@ai.com</Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
