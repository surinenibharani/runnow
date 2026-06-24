"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StravaConnectBanner() {
  const { status } = useSession();
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setConnected(null);
      return;
    }

    fetch("/api/strava/status")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setConnected(data?.connected ?? false))
      .catch(() => setConnected(false));
  }, [status]);

  if (status !== "authenticated" || connected !== false) return null;

  return (
    <div className="rounded-xl border border-[#fc4c02]/30 bg-[#fc4c02]/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <Activity className="size-5 text-[#fc4c02] shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Connect Strava</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Sync your runs to auto-match workouts with your training plan on the dashboard.
          </p>
        </div>
      </div>
      <Button
        nativeButton={false}
        render={<a href="/api/strava/connect" />}
        size="sm"
        className="bg-[#fc4c02] hover:bg-[#e34402] text-white shrink-0"
      >
        Connect Strava
      </Button>
    </div>
  );
}
