import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const satoshi = localFont({
  src: "../src/assets/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chishty Foundation | Empowering Lives Through Compassion & Service",
  description:
    "Chishty Foundation is dedicated to uplifting communities through education, healthcare, humanitarian aid, and social welfare initiatives. Join us in making a meaningful difference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${cormorant.variable}
        ${dancingScript.variable}
        ${satoshi.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}