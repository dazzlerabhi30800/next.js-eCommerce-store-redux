import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/Components/Header";
import MenuBtn from "@/Components/MenuBtn";
import SideBar from "@/Components/SideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "E commerce App created by Abhishek Choudhary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="mx-6 sm:mx-9 md:mx-12 lg:mx-16 min-h-screen flex flex-col">
          <Header />
          <MenuBtn />
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  );
}
