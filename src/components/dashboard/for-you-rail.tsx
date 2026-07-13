import Link from "next/link";
import { BookOpen, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { PersonalizedContent } from "@/lib/personalized-content";

type ForYouRailProps = {
  content: PersonalizedContent;
};

export function ForYouRail({ content }: ForYouRailProps) {
  if (content.tips.length === 0 && content.posts.length === 0) return null;

  return (
    <section className="space-y-4" aria-labelledby="for-you-heading">
      <div>
        <h2 id="for-you-heading" className="text-xl font-bold">
          For you
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Ranked from your plan, season, and recovery — not a generic feed.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {content.tips.length > 0 && (
          <Card className="border-border/60">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Lightbulb className="size-4 text-primary" />
                Tips that fit right now
              </div>
              <ul className="space-y-3">
                {content.tips.map((tip) => (
                  <li key={tip.slug}>
                    <Link
                      href={tip.href}
                      className="group block rounded-lg border border-transparent hover:border-border/60 hover:bg-muted/30 -mx-1 px-2 py-1.5 transition-colors"
                    >
                      <p className="font-medium group-hover:text-primary transition-colors">
                        {tip.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {tip.reason}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {content.posts.length > 0 && (
          <Card className="border-border/60">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="size-4 text-primary" />
                Guides worth opening
              </div>
              <ul className="space-y-3">
                {content.posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={post.href}
                      className="group block rounded-lg border border-transparent hover:border-border/60 hover:bg-muted/30 -mx-1 px-2 py-1.5 transition-colors"
                    >
                      <p className="font-medium group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {post.reason}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
