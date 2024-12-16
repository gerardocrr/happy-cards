import { Metadata } from "next";
import { Snow } from "@/components/SnowCanvas";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Happy Cards",
  description: "Genera cartas increibles para compartir con tus amigos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT}`}
        crossOrigin="anonymous"
      ></Script>
      <body className="page">
        <div className="container max-w-4xl mx-auto flex flex-col h-svh justify-center items-center">
          {children}
        </div>
        <Snow />
      </body>
    </html>
  );
}
