import { createComment, listComments } from "@/lib/engagement/comments-api";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return listComments("blog", slug, request);
}

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return createComment(request, "blog", slug);
}
