import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Text from "@/components/UI/Text";
import LogoImage from "@/assets/images/logo.webp";

const styles = {
  footer: "bg-footer-bg relative mt-10 w-full pb-4 backdrop-blur-sm",
  footerBeforeEl:
    "before:absolute before:top-0 before:left-0 before:h-[2px] before:w-full before:bg-button-gradient",
  contentWrapper:
    "contentContainer items-center pt-4 sm:flex-row sm:justify-between",
  infoContainer: "flex flex-col items-center sm:items-start",
  logo: "relative flex w-[120px] flex-col items-center md:w-[140px]",
  infoText: "mt-4 max-w-[240px] text-center sm:max-w-[300px] sm:text-left",
  contactsContainer: "mt-3 flex flex-col gap-4 sm:mt-0",
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
        </div>
        <div className={`${styles.contactsContainer}`}>
          <div className={`${styles.contactItem}`}>
            <Text className="mr-3 mt-1">
              Made by{" "}
              <Link
                href="https://github.com/BoikoVD/NFT-Minter"
                target="_blank"
                className="text-pink"
              >
                BoikoVD
              </Link>
            </Text>
            <Link href="https://github.com/BoikoVD/NFT-Minter" target="_blank">
              <FaGithub size={30} className="fill-pink" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
