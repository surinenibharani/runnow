import { generatePostOgImage, OG_IMAGE_SIZE } from "@/lib/seo/post-og-image";
import { getPublishedPostBySlug } from "@/lib/blog/posts";

export const alt = "LetsRunNow blog article";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);

  if (!post) {
    return generatePostOgImage({ title: "Running tips & training advice" });
  }

  return generatePostOgImage({
    title: post.metaTitle ?? post.title,
    category: post.category,
  });
}
