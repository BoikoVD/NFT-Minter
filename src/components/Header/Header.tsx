import Link from "next/link";
import WalletButton from "../WalletButton/WalletButton";

interface IHeader {
    children: React.ReactNode,
};

export default function Header() {
    
    return (
        <header className="w-full flex justify-between items-center my-9 px-8 absolute top-0 left-0">
            <div 
                className="relative text-white font-spaceGrotesk flex flex-col items-center border rounded-md border-white bg-purple
                before:h-[1px] before:absolute before:bottom-[11px] before:w-full before:bg-white"
            >
                <span className='text-5xl'>
                    NFT
                </span>
                <span className='bg-purple px-1 mt-[-5px] z-[1]'>
                    Minter
                </span>
            </div>
            <nav className="mx-3 flex gap-10 text-white">
                <Link href={'/'}>Home</Link>
                <Link href={'/mint'}>Mint</Link>
            </nav>
            <div className="">
                <WalletButton/>
            </div>
        </header>
    );
};