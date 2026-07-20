import { createComment, listComments } from "@/lib/engagement/comments-api";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return listComments("tip", slug);
}

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return createComment(request, "tip", slug);
}
