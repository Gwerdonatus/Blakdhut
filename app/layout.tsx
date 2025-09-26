import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const siteName = "BLAKDHUT EXCHANGE";
const siteUrl = "https://www.blakdhut.com";
const siteDesc = "Fast. Secure. Reliable Crypto Trading.";
const siteImage = `${siteUrl}/images/blakdhut.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDesc,
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "Blakdhut",
    "crypto exchange Nigeria",
    "buy crypto",
    "sell crypto",
    "swap crypto",
    "secure crypto trading",
  ],
  icons: {
    icon: "/images/blakdhut.jpg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDesc,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: "Blakdhut Exchange",
      },
    ],
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
    images: [siteImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "", // ✅ Add your Google Search Console verification code here
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={siteUrl} />

        {/* ✅ Explicit fallbacks for scrapers */}
        <meta property="og:image" content={siteImage} />
        <meta name="twitter:image" content={siteImage} />
      </head>
      <body className="bg-[#181A20] text-white flex flex-col min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />

        {/* ✅ Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: siteImage,
              sameAs: [
                "https://x.com/blakdhute",
                "https://www.instagram.com/blakdhute",
                "https://t.me/blakdhutexchange",
                "https://whatsapp.com/channel/0029Vaff2PW3rZZVjeJfLr1U",
                "https://www.tiktok.com/@blakdhute",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
