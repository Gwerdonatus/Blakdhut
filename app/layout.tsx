// app/layout.tsx
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
    <html lang="en" dir="ltr">
      <head>
        {/* ✅ Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-[#181A20] text-white">
        <Header />
        {/* ✅ removed padding here */}
        <main>{children}</main>
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
              logo: `${siteUrl}/blakdhut.jpg`,
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
