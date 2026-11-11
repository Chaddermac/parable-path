"use client";
import { usePathname, useRouter } from "next/navigation";
import { WinterTree } from "./WinterArtwork";
export function HolidayHeader() {
  const pathname = usePathname();
  const router = useRouter();
  function begin() {
    if (pathname === "/holidayedition") window.dispatchEvent(new Event("holiday:start"));
    else router.push("/holidayedition?start=1#quiz");
  }
  return <header className="winter-header"><a className="winter-brand" href="/holidayedition" aria-label="ParablePath Holiday Edition home"><img src="/holiday/reference-wordmark.png" width="210" height="52" alt="ParablePath"/><span className="winter-edition"><WinterTree/>Holiday Edition</span></a><nav aria-label="Holiday navigation"><a href="/holidayedition#quiz" onClick={e => { e.preventDefault(); begin(); }}>The Quiz</a><a href="/holidayedition#holiday-types">The Types</a><a href="/holidayedition#share-invite">Share &amp; Invite</a></nav><button className="winter-nav-cta" onClick={begin}>Start the Holiday Quiz <span aria-hidden="true">→</span></button></header>;
}
