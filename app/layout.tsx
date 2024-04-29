import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Karrot Market",
    default: "Karrot Market"
  },
  description: "Sell and Buy all the things! ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}
        bg-neutral-900 max-w-screen-sm text-white mx-auto
      `}>
        {children}
      </body>
    </html>
  );
}
