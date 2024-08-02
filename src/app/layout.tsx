import type { Metadata } from "next";
import { Space_Grotesk, Courier_Prime } from 'next/font/google'
import { Web3Provider } from "@/context/Web3Context";
import { ModalManager } from "@/context/ModalManager";
import ErrorBoundary from "@/HOC/ErrorBoundary";
import { AnimatedBg } from "@/components/AnimatedBg/AnimatedBg";
import "./globals.css";
 
const spaceGrotesk = Space_Grotesk({ 
    subsets: ["latin"],
    weight: ['300', '400', '700'],
    variable: '--font-spaceGrotesk',
});
const courierPrime = Courier_Prime({ 
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-courierPrime',
});

export const metadata: Metadata = {
  title: "NFT Minter",
  description: "Create your own NFT with Minter",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${courierPrime.variable} ${spaceGrotesk.variable} bg-layout-gradient`}>
        <Web3Provider>
          <ModalManager>
            <ErrorBoundary>
              <AnimatedBg />
              {children}
            </ErrorBoundary>
          </ModalManager>
        </Web3Provider>
      </body>
    </html>
  );
}
