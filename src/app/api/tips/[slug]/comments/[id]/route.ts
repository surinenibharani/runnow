import {
  deleteComment,
  updateComment,
} from "@/lib/engagement/comments-api";

type RouteContext = {
  params: Promise<{ slug: string; id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { slug, id } = await context.params;
  return updateComment(request, "tip", slug, id);
}

export async function DELETE(request: Request, context: RouteContext) {
  const { slug, id } = await context.params;
  return deleteComment(request, "tip", slug, id);
}
