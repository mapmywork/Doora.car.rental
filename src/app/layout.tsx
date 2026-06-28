import type { Metadata } from "next";
import { Inter, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "DOORA MOBILITY | Premium Car Rental",
  description: "Experience luxury with DOORA MOBILITY. Premium self-drive and chauffeur-driven vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable} font-sans bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
