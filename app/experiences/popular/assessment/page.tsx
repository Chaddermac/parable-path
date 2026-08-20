import { PopularAssessment } from "@/components/popular/PopularAssessment";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Story Room | ParablePath",
  description: "A fast, approachable way to notice the story you may be living—and the door it might open.",
  alternates: { canonical: "https://parablepath.com/assessment" }
};

export default function PopularAssessmentPage() { return <PopularAssessment />; }
