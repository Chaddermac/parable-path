import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import "./website.css";
import { SiteHeader } from "@/components/SiteHeader";
import { PendingResponseSync } from "@/components/PendingResponseSync";
import { SiteFooter } from "@/components/website/SiteFooter";

const popularBody = DM_Sans({ subsets: ["latin"], variable: "--font-popular-body", display: "swap" });
const popularDisplay = Space_Grotesk({ subsets: ["latin"], variable: "--font-popular-display", display: "swap" });
const websiteFont = localFont({ src: [{ path: "../public/fonts/Jakarta-Regular.ttf", weight: "400" }, { path: "../public/fonts/Jakarta-Bold.ttf", weight: "700" }], variable: "--font-website", display: "swap" });

export const metadata: Metadata = { metadataBase: new URL("https://www.parablepath.com"), title: { default: "ParablePath — Discover the story you’re becoming", template: "%s | ParablePath" }, description: "Explore the parables of Jesus, discover the stories shaping your life, and take one next faithful step. A House of Stories reflection experience." };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const experience = (await headers()).get("x-parablepath-experience") === "popular" ? "popular" : "formation";
  return <html lang="en" className={`${popularBody.variable} ${popularDisplay.variable} ${websiteFont.variable}`}><body className={`experience-${experience}`}><a className="website-skip-link" href="#main-content">Skip to content</a><PendingResponseSync /><SiteHeader experience={experience} /><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter /></body></html>;
}
