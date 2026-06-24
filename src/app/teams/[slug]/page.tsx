import type { Metadata } from "next";
import { TeamDashboardContent } from "@/components/teams/team-dashboard";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Team · ${slug}` };
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  return <TeamDashboardContent slug={slug} />;
}
