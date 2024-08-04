"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WalletButton from "../WalletButton/WalletButton";
import LogoImage from "../../assets/images/logo.webp";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[99] w-full px-5 py-2 backdrop-blur-md transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-button-gradient`}
      >
        <div className="mx-auto flex max-w-[1425px] items-center justify-between">
          <div className="relative z-[100] flex w-[120px] flex-col items-center md:w-[150px]">
            <Image
              src={LogoImage}
              alt="logo image"
              objectFit="cover"
              fill={false}
            />
          </div>
          <nav
            className={`fixed top-0 z-[99] flex h-screen max-h-screen w-screen flex-col items-center bg-purple py-10 transition-all duration-300 md:static md:mx-3 md:h-auto md:w-auto md:bg-transparent md:py-0 ${isMenuOpen ? "left-0" : "left-[100%]"}`}
          >
            <ul className="my-10 flex w-full flex-[1_1_auto] flex-col items-center justify-center gap-10 overflow-auto text-white md:my-0 md:flex-row">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/mint"}>Mint</Link>
              </li>
              <li>
                <Link href={"/create"}>Create</Link>
              </li>
            </ul>
            <div className="flex md:hidden">
              <WalletButton />
            </div>
          </nav>
          <div className="hidden md:flex">
            <WalletButton />
          </div>
          <button
            className="relative z-[100] flex h-[24px] w-[34px] md:hidden"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <span
              className={`absolute left-0 h-[2px] w-full bg-white transition-all duration-300 ${isMenuOpen ? "top-[11px] rotate-[45deg]" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-[50%] h-[2px] w-full translate-y-[-50%] bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-1"}`}
            />
            <span
              className={`group-hover: group-hover: absolute left-0 h-[2px] w-full bg-white transition-all duration-300 ${isMenuOpen ? "bottom-[11px] rotate-[-45deg]" : "bottom-0"}`}
            />
          </button>
        </div>
      </header>
    </>
  );
}
