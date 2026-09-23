"use client";

import { flushPendingResponses } from "@/lib/response-outbox";
import { useEffect, useRef } from "react";

export function PendingResponseSync() {
  const flushing = useRef(false);

  useEffect(() => {
    const flush = async () => {
      if (flushing.current) return;
      flushing.current = true;
      try {
        await flushPendingResponses();
      } finally {
        flushing.current = false;
      }
    };
    const handleOnline = () => void flush();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") void flush();
    };

    void flush();
    window.addEventListener("online", handleOnline);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("online", handleOnline);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return null;
}
