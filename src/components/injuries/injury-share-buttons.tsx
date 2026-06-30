import { PostShareButtons } from "@/components/blog/post-share-buttons";
import { buildInjuryShareUrl } from "@/lib/injuries/injury-share";
import { cn } from "@/lib/utils";

type InjuryShareButtonsProps = {
  title: string;
  path: string;
  shareLabel?: string;
  className?: string;
  compact?: boolean;
};

export function InjuryShareButtons({
  title,
  path,
  shareLabel = "Share this guide",
  className,
  compact = true,
}: InjuryShareButtonsProps) {
  const url = buildInjuryShareUrl(path);

  return (
    <PostShareButtons
      title={title}
      url={url}
      shareLabel={shareLabel}
      className={cn("mt-4", className)}
      compact={compact}
    />
  );
}
