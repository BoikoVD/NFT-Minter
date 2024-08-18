"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import NetworkButton from "@/components/NetworkButton/NetworkButton";
import LogoImage from "@/assets/images/logo.webp";

const styles = {
  header:
    "fixed left-0 top-0 z-[99] w-full py-2 backdrop-blur-md transition-all duration-300",
  headerAfterEl:
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-button-gradient",
  container: "contentContainer flex-row items-center justify-between",
  logo: "relative z-[100] flex w-[120px] flex-col items-center md:w-[150px]",
  nav: "fixed top-0 z-[99] flex h-screen max-h-screen w-screen flex-col items-center bg-purple py-10 transition-all duration-300 md:static md:mx-3 md:h-auto md:w-auto md:bg-transparent md:py-0",
  navList:
    "my-10 mx-1 flex w-full flex-[1_1_auto] flex-col items-center justify-center gap-10 overflow-auto text-white md:my-0 md:flex-row",
  walletBtnWrapperMobile: "flex flex-col items-center gap-4 md:hidden",
  walletBtnWrapperDesktop: "hidden md:flex gap-6",
  burgerBtn: "relative z-[99] flex h-[24px] w-[34px] md:hidden",
  burgerSpanEl:
    "absolute left-0 h-[2px] w-full bg-white transition-all duration-300",
  burgerSpanElMiddle: "top-[50%] translate-y-[-50%]"
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} ${styles.headerAfterEl}`}>
      <div className={`${styles.container}`}>
        <Link href={"/"} className={`${styles.logo}`} tabIndex={1}>
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
        </Link>
        <nav
          className={`${styles.nav} ${isMenuOpen ? "pointer-events-auto visible left-0" : "pointer-events-none invisible left-[100%] md:pointer-events-auto md:visible md:left-0"}`}
        >
          <ul className={`${styles.navList}`}>
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
          <div className={`${styles.walletBtnWrapperMobile}`}>
            <NetworkButton />
            <ConnectWalletButton />
          </div>
        </nav>
        <div className={`${styles.walletBtnWrapperDesktop}`}>
          <NetworkButton />
          <ConnectWalletButton />
        </div>
        <button
          className={`${styles.burgerBtn}`}
          onClick={() => setIsMenuOpen(prev => !prev)}
          tabIndex={1}
        >
          <span
            className={`${styles.burgerSpanEl} ${isMenuOpen ? "top-[11px] rotate-[45deg]" : "top-0"}`}
          />
          <span
            className={`${styles.burgerSpanEl} ${styles.burgerSpanElMiddle} ${isMenuOpen ? "opacity-0" : "opacity-1"}`}
          />
          <span
            className={`${styles.burgerSpanEl} ${isMenuOpen ? "bottom-[11px] rotate-[-45deg]" : "bottom-0"}`}
          />
        </button>
      </div>
    </header>
  );
}
