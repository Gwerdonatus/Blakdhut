import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "BLAKDHUT EXCHANGE",
  description: "Fast. Secure. Reliable Crypto Trading.",
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
