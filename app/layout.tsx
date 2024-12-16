import { Metadata } from "next";
import { Snow } from "@/components/SnowCanvas";
import "./globals.css";

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
      <body className="page">
        <div className="container max-w-4xl mx-auto flex flex-col h-svh justify-center items-center">
          {children}
        </div>
        <Snow />
      </body>
    </html>
  );
}
