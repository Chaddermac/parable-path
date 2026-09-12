"use client";

import Link from "next/link";
import { useState } from "react";
import type { PopularTypologyProfile } from "@/lib/parablepath/popular/results";

export function PopularResultActions({ profile }: { profile: PopularTypologyProfile }) {
  const [notice, setNotice] = useState("");
  const share = async () => {
    const contribution = profile.callingTagline.replace(/^You /, "I ");
    const text = `I’m a ${profile.callingName}. ${contribution} Discover your ParablePath at https://parablepath.com.`;
    try {
      if (navigator.share) await navigator.share({ title: "My ParablePath Result", text, url: "https://parablepath.com" });
      else { await navigator.clipboard.writeText(text); setNotice("Result copied to your clipboard."); }
    } catch (error) { if ((error as Error).name !== "AbortError") setNotice("Sharing is unavailable. Please copy the page address."); }
  };
  return <section className="typology-actions" aria-label="Result actions">
    <Link className="typology-action" href="/assessment">Retake Assessment</Link>
    <a className="typology-action" href={`/api/result-card/${profile.id}`} download={`parablepath-${profile.id}-result.png`}>Download My Result</a>
    <button className="typology-action" type="button" onClick={() => void share()}>Share My Result</button>
    <p className="typology-action-notice" role="status" aria-live="polite">{notice}</p>
  </section>;
}
