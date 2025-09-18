import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NAPPS Alimosho | Promoting Excellence in Private Education",
  description:
    "The National Association of Proprietors of Private Schools (NAPPS) Alimosho promotes excellence, collaboration, and quality education across private schools.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${afacad.variable} antialiased bg-white`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
