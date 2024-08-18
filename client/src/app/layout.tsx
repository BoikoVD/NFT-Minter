import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import { Web3Provider } from "@/context/Web3Context";
import { ModalManager } from "@/context/ModalManager";
import { AnimatedBg } from "@/components/AnimatedBg/AnimatedBg";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courierPrime"
});

export const metadata: Metadata = {
  title: "NFT Minter",
  description: "Create your own NFT with Minter",
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" }
  ],
  keywords: "NFT, crypto, digital products, AI, artificial intelligence",
  openGraph: {
    title: "nftminter.com",
    description: "Create your own NFT with Minter",
    url: "https://nftminter.com",
    siteName: "NFT Minter",
    type: "website",
    images: [
      {
        url: "https://nftminter.com/nft_minter_media.png",
        secureUrl: "https://nftminter.com/nft_minter_media.png",
        width: 800,
        height: 418,
        alt: "The NFT Minter social media card image"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${courierPrime.className} bg-layout-gradient`}>
        <Web3Provider>
          <ModalManager>
            <ErrorBoundary>
              <AnimatedBg />
              <Header />
              {children}
              <Footer />
            </ErrorBoundary>
          </ModalManager>
        </Web3Provider>
      </body>
    </html>
  );
}
