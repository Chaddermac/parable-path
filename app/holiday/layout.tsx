import type { Metadata } from "next";
import "./holiday.css";
export const metadata: Metadata = {
  title: "What’s Your Holiday Story? | ParablePath Holiday Edition",
  description: "Family drama. Gift exchanges. Awkward parties. 16 questions, eight holiday personalities, and one surprisingly revealing Christmas story.",
  alternates: { canonical: "https://parablepath.com/holiday" },
  openGraph: { title: "What’s Your Holiday Story?", description: "16 questions. Eight holiday personalities. Find your Christmas story.", url: "https://parablepath.com/holiday", type: "website", images: [{ url: "https://parablepath.com/api/holiday/card/quiz", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "What’s Your Holiday Story?", images: ["https://parablepath.com/api/holiday/card/quiz"] }
};
export default function HolidayLayout({ children }: { children: React.ReactNode }) { return children; }
