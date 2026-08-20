import FormationResult from "@/app/results/[id]/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Formation Reflection | ParablePath",
    description: "Your deeper ParablePath narrative reflection.",
    alternates: { canonical: `https://parablepath.app/results/${id}` }
  };
}

export default FormationResult;
