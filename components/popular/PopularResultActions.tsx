"use client";

import Link from "next/link";
import { useState } from "react";

export function PopularResultActions({ room }: { room: string }) {
  const [shared, setShared] = useState(false);
  const share = async () => {
    const data = { title: `My ParablePath Story Room: ${room}`, text: `I may be inhabiting the ${room} story. You are not a type—you may be inhabiting a story.`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(window.location.href);
      setShared(true);
    } catch { /* A cancelled share does not need an error state. */ }
  };
  return <div className="mt-9 flex flex-wrap gap-3">
    <button className="button-primary" onClick={share}>{shared ? "Link copied" : "Share this result"}</button>
    <Link className="button-secondary" href="https://parablepath.app/start">Explore My Story →</Link>
  </div>;
}
