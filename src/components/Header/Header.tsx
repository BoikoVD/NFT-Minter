"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WalletButton from "@/components/WalletButton/WalletButton";
import LogoImage from "@/assets/images/logo.webp";

const styles = {
  header:
    "fixed left-0 top-0 z-[99] w-full py-2 backdrop-blur-md transition-all duration-300",
  headerAfterEl:
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-button-gradient",
  container:
    "mx-auto flex max-w-[1425px] items-center justify-between px-5 md:px-8",
  logo: "relative z-[100] flex w-[120px] flex-col items-center focus:ring-0 focus:ring-offset-0 md:w-[150px]",
  nav: "fixed top-0 z-[99] flex h-screen max-h-screen w-screen flex-col items-center bg-purple py-10 transition-all duration-300 md:static md:mx-3 md:h-auto md:w-auto md:bg-transparent md:py-0",
  navList:
    "my-10 flex w-full flex-[1_1_auto] flex-col items-center justify-center gap-10 overflow-auto text-white md:my-0 md:flex-row",
  walletBtnWrapperMobile: "flex md:hidden",
  walletBtnWrapperDesktop: "hidden md:flex",
  burgerBtn:
    "relative z-[99] flex h-[24px] w-[34px] outline-offset-2 md:hidden",
  burgerSpanEl:
    "absolute left-0 h-[2px] w-full bg-white transition-all duration-300",
  burgerSpanElMiddle: "top-[50%] translate-y-[-50%]"
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} ${styles.headerAfterEl}`}>
      <div className={`${styles.container}`}>
        <Link href={"/"} className={`${styles.logo}`}>
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
          className={`${styles.nav} ${isMenuOpen ? "left-0" : "left-[100%]"}`}
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
            <WalletButton />
          </div>
        </nav>
        <div className={`${styles.walletBtnWrapperDesktop}`}>
          <WalletButton />
        </div>
        <button
          className={`${styles.burgerBtn}`}
          onClick={() => setIsMenuOpen(prev => !prev)}
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
