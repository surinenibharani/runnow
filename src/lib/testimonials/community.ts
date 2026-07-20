import { prisma } from "@/lib/prisma";

export type CommunityTestimonial = {
  id: string;
  authorName: string;
  quote: string;
  story: string | null;
  detail: string | null;
  milestone: string | null;
  createdAt: Date;
};

export async function getCommunityTestimonials(
  take = 50
): Promise<CommunityTestimonial[]> {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take,
      select: {
        id: true,
        authorName: true,
        quote: true,
        story: true,
        detail: true,
        milestone: true,
        createdAt: true,
      },
    });
  } catch {
    return [];
  }
}
