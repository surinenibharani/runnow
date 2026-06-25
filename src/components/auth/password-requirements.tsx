"use client";

import { Check, Circle } from "lucide-react";
import { getPasswordRequirements } from "@/lib/security/validation";
import { cn } from "@/lib/utils";

export function PasswordRequirements({ password }: { password: string }) {
  const requirements = getPasswordRequirements(password);

  return (
    <ul className="space-y-1.5" aria-label="Password requirements">
      {requirements.map((req) => (
        <li
          key={req.id}
          className={cn(
            "flex items-center gap-2 text-xs transition-colors",
            req.met ? "text-muted-foreground" : "text-foreground"
          )}
        >
          {req.met ? (
            <Check className="size-3.5 shrink-0 text-green-600 dark:text-green-500" />
          ) : (
            <Circle className="size-3.5 shrink-0 text-muted-foreground/60" />
          )}
          <span>{req.label}</span>
        </li>
      ))}
    </ul>
  );
}
