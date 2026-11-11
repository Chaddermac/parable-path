"use client";
import { usePathname, useRouter } from "next/navigation";
import { WinterTree } from "./WinterArtwork";
export function HolidayHeader() {
  const pathname = usePathname();
  const router = useRouter();
  function begin() {
    if (pathname === "/holiday") window.dispatchEvent(new Event("holiday:start"));
    else router.push("/holiday?start=1#quiz");
  }
  return <header className="winter-header"><a className="winter-brand" href="/holiday" aria-label="ParablePath Holiday Edition home"><img src="/holiday/reference-wordmark.png" width="210" height="52" alt="ParablePath"/><span className="winter-edition"><WinterTree/>Holiday Edition</span></a><nav aria-label="Holiday navigation"><a href="/holiday#quiz" onClick={e => { e.preventDefault(); begin(); }}>The Quiz</a><a href="/holiday#holiday-types">The Types</a><a href="/holiday#share-invite">Share &amp; Invite</a></nav><button className="winter-nav-cta" onClick={begin}>Start the Holiday Quiz <span aria-hidden="true">→</span></button></header>;
}
