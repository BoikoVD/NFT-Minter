import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from 'next/font/google'
import { Web3Provider } from "@/context/Web3Context";
import { ModalManager } from "@/context/ModalManager";
import "./globals.css";
 
const spaceGrotesk = Space_Grotesk({ 
    subsets: ["latin"],
    weight: ['300', '400', '700'],
    variable: '--font-spaceGrotesk',
});
const poppins = Poppins({ 
    subsets: ["latin"],
    weight: ['400', '700'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "NFT Minter",
  description: "Create your own NFT with Minter",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${spaceGrotesk.variable} bg-layout-gradient`}>
        <Web3Provider>
          <ModalManager>
            {children}
          </ModalManager>
        </Web3Provider>
      </body>
    </html>
  );
}
