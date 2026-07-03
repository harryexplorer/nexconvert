import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexConvert - Smart File Converter",
  description:
    "Convert, compress, merge and optimize files instantly with NexConvert. Fast, secure and easy-to-use file tools.",
  keywords: [
    "file converter",
    "image to pdf",
    "merge pdf",
    "compress pdf",
    "jpg to png",
    "png to jpg",
    "webp converter",
    "zip creator",
    "file compressor",
    "online converter",
  ],
  authors: [{ name: "NexConvert Team" }],
  creator: "NexConvert",
  publisher: "NexConvert",

  openGraph: {
    title: "NexConvert - Smart File Converter",
    description:
      "Fast, secure and modern file conversion tools for everyone.",
    url: "https://nexconvert.vercel.app",
    siteName: "NexConvert",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "NexConvert Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NexConvert - Smart File Converter",
    description:
      "Convert, compress and optimize files instantly.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0B0F] text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}