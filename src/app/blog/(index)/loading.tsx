import { SITE_NAME } from "@/lib/site";

export default function BlogLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-sm text-muted-foreground">Home / Blog</p>
        <h1 className="mt-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          The {SITE_NAME} Blog
        </h1>
      </div>
    </div>
  );
}
