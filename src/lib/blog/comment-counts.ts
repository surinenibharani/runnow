import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getCommentCount(postSlug: string): Promise<number> {
  try {
    return await prisma.blogComment.count({ where: { postSlug } });
  } catch {
    return 0;
  }
}

async function fetchCommentCountsBySlug(): Promise<Record<string, number>> {
  try {
    const rows = await prisma.blogComment.groupBy({
      by: ["postSlug"],
      _count: { id: true },
    });

    return Object.fromEntries(
      rows.map((row) => [row.postSlug, row._count.id])
    );
  } catch {
    return {};
  }
}

export const getCommentCountsBySlug = unstable_cache(
  fetchCommentCountsBySlug,
  ["blog-comment-counts"],
  { revalidate: 300 }
);
