"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WalletButton from "../WalletButton/WalletButton";
import LogoImage from '../../assets/images/logo.webp';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<>
        <header className={`px-5 w-full py-2 fixed top-0 left-0 z-10 transition-all duration-300 backdrop-blur-md after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-button-gradient`}>
            <div className="max-w-[1425px] mx-auto flex justify-between items-center">
                <div className="relative flex flex-col items-center z-[100] w-[120px] md:w-[150px]">
                    <Image src={LogoImage} alt='logo image' objectFit="cover" fill={false} />
                </div>
                <nav
                    className={
                        `fixed top-0 w-screen h-screen max-h-screen bg-purple z-[99] flex flex-col items-center transition-all duration-300 py-10 
                        md:static md:w-auto md:h-auto md:mx-3 md:py-0 md:bg-transparent
                        ${isMenuOpen ? 'left-0' : 'left-[100%]'}`
                    }
                >
                    <ul className="w-full flex-[1_1_auto] flex flex-col items-center justify-center gap-10 my-10 overflow-auto text-white md:flex-row md:my-0">
                        <li>
                            <Link href={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link href={'/mint'}>Mint</Link>
                        </li>
                        <li>
                            <Link href={'/create'}>Create</Link>
                        </li>
                    </ul>
                    <div className="flex md:hidden">
                        <WalletButton />
                    </div>
                </nav>
                <div className="hidden md:flex">
                    <WalletButton />
                </div>
                <button className="flex md:hidden relative w-[34px] h-[24px] z-[100]" onClick={() => setIsMenuOpen((prev) => !prev)}>
                    <span className={
                        `absolute left-0 w-full h-[2px] bg-white transition-all duration-300
                        ${isMenuOpen ? 'rotate-[45deg] top-[11px]' : 'top-0'}`
                    } />
                    <span className={
                        `absolute top-[50%] left-0 w-full h-[2px] bg-white transition-all duration-300 translate-y-[-50%]
                        ${isMenuOpen ? 'opacity-0' : 'opacity-1'}`
                    } />
                    <span className={
                        `absolute left-0 w-full h-[2px] bg-white transition-all duration-300 group-hover: group-hover:
                        ${isMenuOpen ? 'rotate-[-45deg] bottom-[11px]' : 'bottom-0'}`
                    } />
                </button>
            </div>
        </header>
    </>);
};