import Link from "next/link";
import { tipsTickerItems } from "@/lib/tips/tips";

export function TipsTicker() {
  const items = [...tipsTickerItems, ...tipsTickerItems];

  return (
    <div
      className="border-b border-border/60 bg-muted/20 overflow-hidden"
      aria-label="Tips for new runners"
    >
      <div className="tips-ticker-track py-2.5">
        <div className="tips-ticker-content flex w-max items-center gap-0">
          {items.map((item, index) => (
            <span key={`${item.href}-${index}`} className="flex shrink-0 items-center">
              <Link
                href={item.href}
                className="whitespace-nowrap px-4 text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
              <span className="text-muted-foreground/60" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
