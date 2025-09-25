import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const siteName = "BLAKDHUT EXCHANGE";
const siteUrl = "https://www.blakdhut.com";
const siteDesc = "Fast. Secure. Reliable Crypto Trading.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDesc,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/blakdhut.jpg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDesc,
    images: [
      {
        url: "/blakdhut-og.jpg",
        width: 1200,
        height: 630,
        alt: "BLAKDHUT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
    images: ["/blakdhut-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#181A20] text-white">
        <Header />
        {/* slightly reduced top padding on desktop */}
        <main className="pt-16 lg:pt-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
