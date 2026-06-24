import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function TipsBackLink() {
  return (
    <Link
      href="/tips"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
    >
      <ArrowLeft className="size-4" />
      Back to all tips
    </Link>
  );
}
