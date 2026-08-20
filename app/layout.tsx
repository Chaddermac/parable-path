import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const popularBody = DM_Sans({ subsets: ["latin"], variable: "--font-popular-body", display: "swap" });
const popularDisplay = Space_Grotesk({ subsets: ["latin"], variable: "--font-popular-display", display: "swap" });

export const metadata: Metadata = { title: "ParablePath — Find Your Room", description: "A guided spiritual reflection for the House of Stories." };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const experience = (await headers()).get("x-parablepath-experience") === "popular" ? "popular" : "formation";
  return <html lang="en" className={`${popularBody.variable} ${popularDisplay.variable}`}><body className={`experience-${experience}`}><SiteHeader experience={experience} />{children}<footer className={`shell mt-16 flex min-h-20 items-center justify-between border-t text-[10px] uppercase tracking-[.15em] ${experience === "popular" ? "popular-footer" : "border-ink/10 text-ink/50"}`}><span>House of Stories</span><span>{experience === "popular" ? "Find · Name · Share" : "Reflection, not a label"}</span></footer></body></html>;
}
