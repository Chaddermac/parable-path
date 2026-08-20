"use client";

import Link from "next/link";
import { useState } from "react";

export function PopularResultActions({ room, exploreUrl }: { room: string; exploreUrl: string }) {
  const [shared, setShared] = useState(false);
  const share = async () => {
    const assessmentUrl = "https://parablepath.com/assessment";
    const data = { title: `My ParablePath Story Room: ${room}`, text: `I may be living in ${room}. What Story Room are you in?`, url: assessmentUrl };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(`${data.text} ${assessmentUrl}`);
      setShared(true);
    } catch { /* A cancelled share does not need an error state. */ }
  };
  return <div className="popular-result-actions mt-8 grid gap-3 sm:flex">
    <Link className="popular-result-primary" href={exploreUrl}>Explore My Story <span aria-hidden="true">→</span></Link>
    <button className="popular-result-secondary" onClick={share}>{shared ? "Link copied!" : "Share My Result"}</button>
  </div>;
}
