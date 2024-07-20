import Link from "next/link";
import Image from "next/image";
import WalletButton from "../WalletButton/WalletButton";
import LogoImage from '../../assets/images/logo.webp';

interface IHeader {
    children: React.ReactNode,
};

export default function Header() {
    
    return (
        <header className="w-full flex justify-between items-center my-9 px-8 absolute top-0 left-0">
            <div className="relative flex flex-col items-center">
                <Image src={LogoImage} alt='logo image' objectFit="cover" height={90}/>
            </div>
            <nav className="mx-3 flex gap-10 text-white">
                <Link href={'/'}>Home</Link>
                <Link href={'/mint'}>Mint</Link>
                <Link href={'/create'}>Create</Link>
            </nav>
            <div className="">
                <WalletButton/>
            </div>
        </header>
    );
};