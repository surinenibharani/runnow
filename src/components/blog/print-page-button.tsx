"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintPageButton({ label = "Print / Save as PDF" }: { label?: string }) {
  return (
    <Button type="button" onClick={() => window.print()} className="no-print gap-2">
      <Printer className="size-4" aria-hidden />
      {label}
    </Button>
  );
}
