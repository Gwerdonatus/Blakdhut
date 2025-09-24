import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "BLAKDHUT EXCHANGE",
  description: "Fast. Secure. Reliable Crypto Trading.",
  keywords: [
    "Blakdhut",
    "Crypto Exchange",
    "Bitcoin",
    "Ethereum",
    "BNB",
    "Solana",
    "Crypto Trading Nigeria",
    "Buy and Sell Crypto",
  ],
  authors: [{ name: "Blakdhut Team" }],
  icons: {
    icon: "/blakdhut.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://www.blakdhut.com",
    title: "BLAKDHUT EXCHANGE",
    description: "Fast. Secure. Reliable Crypto Trading.",
    siteName: "Blakdhut Exchange",
    images: [
      {
        url: "https://www.blakdhut.com/blakdhut.jpg",
        width: 1200,
        height: 630,
        alt: "Blakdhut Exchange Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@blakdhute",
    title: "BLAKDHUT EXCHANGE",
    description: "Fast. Secure. Reliable Crypto Trading.",
    images: ["https://www.blakdhut.com/blakdhut.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#181A20] text-white">
        {/* Global Header */}
        <Header />

        {/* Page content */}
        <main className="pt-20">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
