import Image from "next/image";
import { RiMailFill, RiMapPinFill } from 'react-icons/ri';
import PageContainer from "../UI/PageContainer";
import Text from "../UI/Text";
import Button from "../UI/Button";
import LogoImage from '../../assets/images/logo.webp';

export default function Footer() {

    return (<>
        <footer className={'pb-10 mt-10 bg-footer-bg w-full relative backdrop-blur-sm'}>
                <hr className="w-full h-[2px] border-none bg-button-gradient"/>
            <PageContainer>
                <div className="flex flex-col items-center pt-6 sm:flex-row sm:justify-between">
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="relative flex flex-col items-center z-[100] w-[150px] md:w-[180px]">
                            <Image src={LogoImage} alt='logo image' objectFit="cover" fill={false} />
                        </div>
                        <Text className="max-w-[240px] mt-4 text-center sm:text-left sm:max-w-[300px]">
                            Get started with the easiest and most secured platform to create digital ART and NFT’s
                        </Text>
                        <Button size="small" className="mt-4">
                            Get Started
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-center">
                            <RiMapPinFill size={30} color='#FF00BF'/>
                            <Text className="ml-2">
                                40.7128° N, 74.0060° W
                            </Text>
                        </div>
                        <div className="flex items-center">
                            <RiMailFill size={30} color='#FF00BF'/>
                            <Text className="ml-2">
                                artbloc@ai.com
                            </Text>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </footer>
    </>);
};