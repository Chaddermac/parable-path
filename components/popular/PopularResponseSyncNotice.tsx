"use client";

import { POPULAR_COMPLETION_KEY } from "@/lib/parablepath/popular/completion";
import { readPendingResponses } from "@/lib/response-outbox";
import type { RoomId } from "@/lib/types";
import { useEffect, useState } from "react";

export function PopularResponseSyncNotice({ room }: { room: RoomId }) {
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    try {
      const completion = JSON.parse(window.localStorage.getItem(POPULAR_COMPLETION_KEY) || "null") as { responseId?: unknown; room?: unknown } | null;
      setIsPending(Boolean(
        completion
        && completion.room === room
        && typeof completion.responseId === "string"
        && readPendingResponses().some((item) => item.endpoint === "/api/responses/popular" && item.id === completion.responseId)
      ));
    } catch {
      setIsPending(false);
    }
  }, [room]);

  if (!isPending) return null;
  return <p className="compact-result-sync" role="status">Your result is available. Your anonymous response will sync when storage reconnects. You do not need to retake the assessment.</p>;
}
