import Image from "next/image";
import { RiMailFill, RiMapPinFill } from "react-icons/ri";
import PageContainer from "../UI/PageContainer";
import Text from "../UI/Text";
import Button from "../UI/Button";
import LogoImage from "../../assets/images/logo.webp";

export default function Footer() {
  return (
    <>
      <footer
        className={"bg-footer-bg relative mt-10 w-full pb-10 backdrop-blur-sm"}
      >
        <hr className="h-[2px] w-full border-none bg-button-gradient" />
        <PageContainer>
          <div className="flex flex-col items-center pt-6 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center sm:items-start">
              <div className="relative z-[100] flex w-[150px] flex-col items-center md:w-[180px]">
                <Image
                  src={LogoImage}
                  alt="logo image"
                  objectFit="cover"
                  fill={false}
                />
              </div>
              <Text className="mt-4 max-w-[240px] text-center sm:max-w-[300px] sm:text-left">
                Get started with the easiest and most secured platform to create
                digital ART and NFT’s
              </Text>
              <Button size="small" className="mt-4">
                Get Started
              </Button>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center">
                <RiMapPinFill size={30} color="#FF00BF" />
                <Text className="ml-2">40.7128° N, 74.0060° W</Text>
              </div>
              <div className="flex items-center">
                <RiMailFill size={30} color="#FF00BF" />
                <Text className="ml-2">artbloc@ai.com</Text>
              </div>
            </div>
          </div>
        </PageContainer>
      </footer>
    </>
  );
}
