import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { pageMetadata } from "@/lib/seo/metadata";

const TeamDashboardContent = dynamic(
  () =>
    import("@/components/teams/team-dashboard").then((m) => ({
      default: m.TeamDashboardContent,
    })),
  { loading: () => <div className="py-20 text-center text-muted-foreground">Loading team...</div> }
);

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata({
    title: `Team · ${slug}`,
    description: "Private team dashboard for coaches and athletes.",
    path: `/teams/${slug}`,
    noindex: true,
  });
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  return <TeamDashboardContent slug={slug} />;
}
