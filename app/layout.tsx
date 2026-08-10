import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "ParablePath — Find Your Room", description: "A guided spiritual reflection for the House of Stories." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader />{children}<footer className="shell mt-16 flex min-h-20 items-center justify-between border-t border-ink/10 text-[10px] uppercase tracking-[.15em] text-ink/50"><span>House of Stories</span><span>Reflection, not a label</span></footer></body></html>;
}
