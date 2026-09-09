"use client";

import Link from "next/link";
import { useState } from "react";

export function PopularResultActions({ storyId, storyName, callingName }: { storyId: string; storyName: string; callingName: string }) {
  const [notice, setNotice] = useState("");
  const share = async () => {
    const text = `I may be inhabiting the ${storyName} Story. I’m being invited to become a ${callingName}. Discover your story at ParablePath.app.`;
    try {
      if (navigator.share) await navigator.share({ title: "My ParablePath Result", text, url: "https://parablepath.app" });
      else { await navigator.clipboard.writeText(text); setNotice("Result copied to your clipboard."); }
    } catch (error) { if ((error as Error).name !== "AbortError") setNotice("Sharing is unavailable. Please copy the page address."); }
  };
  return <section className="typology-actions" aria-label="Result actions">
    <Link className="typology-action typology-action-primary" href="https://parablepath.app/assessment">Begin the STORY Path <span aria-hidden="true">→</span></Link>
    <Link className="typology-action" href="/assessment">Retake Assessment</Link>
    <a className="typology-action" href={`/api/result-card/${storyId}`} download={`parablepath-${storyId}-result.png`}>Download My Result</a>
    <button className="typology-action" type="button" onClick={() => void share()}>Share My Result</button>
    <p className="typology-action-notice" role="status" aria-live="polite">{notice}</p>
  </section>;
}
