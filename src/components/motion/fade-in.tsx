import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "div" | "section" | "article";
}

/** Layout wrapper kept for existing call sites — no motion, so hubs paint immediately. */
export function FadeIn({
  children,
  className,
  as: Tag = "div",
}: FadeInProps) {
  return <Tag className={cn(className)}>{children}</Tag>;
}

export function StaggerChildren({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}
