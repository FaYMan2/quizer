import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  weight : "600",
  subsets :['latin']
})

export const metadata: Metadata = {
  title: "Quizer",
  description: "Quiz yourself on anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={playfair.className}>
        <Navbar/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
