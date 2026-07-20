import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Page not found",
  description:
    "This page does not exist. Head back to LetsRunNow for free beginner running plans, tips, and gear advice.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for may have moved or no longer exists.
        Don&apos;t know where to start? Start here.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button nativeButton={false} render={<Link href="/start" />}>
          Start here
        </Button>
        <Button nativeButton={false} render={<Link href="/" />} variant="outline">
          Home
        </Button>
        <Button nativeButton={false} render={<Link href="/plan" />} variant="outline">
          Training plans
        </Button>
      </div>
    </div>
  );
}
