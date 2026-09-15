import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Merriweather } from "next/font/google";
import { SiteHeader } from "@/components/site-header";

const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "500", "600", "700", "800"] });
const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", weight: ["400", "700"] });

export const metadata: Metadata = { title: "Rusinga Clubs", description: "Find your people. Make your mark." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${poppins.variable} ${merriweather.variable}`}><SiteHeader />{children}</body></html>;
}
