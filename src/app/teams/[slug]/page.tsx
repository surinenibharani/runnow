import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TeamsComingSoon } from "@/components/teams/teams-coming-soon";
import { pageMetadata } from "@/lib/seo/metadata";
import { TEAMS_ROLLOUT_ENABLED } from "@/lib/teams/rollout";

const TeamDashboardContent = dynamic(
  () =>
    import("@/components/teams/team-dashboard").then((m) => ({
      default: m.TeamDashboardContent,
    })),
  {
    loading: () => (
      <div className="py-20 text-center text-muted-foreground">Loading team...</div>
    ),
  }
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

  if (!TEAMS_ROLLOUT_ENABLED) {
    return (
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Teams", href: "/teams" },
              { label: slug },
            ]}
          />
          <TeamsComingSoon />
        </div>
      </div>
    );
  }

  return <TeamDashboardContent slug={slug} />;
}
