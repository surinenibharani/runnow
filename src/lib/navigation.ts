import { TEAMS_ROLLOUT_ENABLED } from "@/lib/teams/rollout";

export type NavLink = {
  href: string;
  label: string;
  /** Highlight when pathname equals href or starts with href/ */
  matchPrefix?: boolean;
  /** Hide unless the user is signed in */
  authRequired?: boolean;
  /** Grey out in nav and show a coming-soon label */
  comingSoon?: boolean;
};

export type NavGroup = {
  /** Screen-reader label for grouped links */
  ariaLabel?: string;
  links: NavLink[];
};

/** Primary header navigation — grouped for scanability. Logo links home; no separate Home item. */
export const mainNavGroups: NavGroup[] = [
  {
    ariaLabel: "Training",
    links: [
      { href: "/start", label: "Start here", matchPrefix: true },
      { href: "/plan", label: "Plans", matchPrefix: true },
      {
        href: "/dashboard",
        label: "Dashboard",
        matchPrefix: true,
        authRequired: true,
      },
    ],
  },
  {
    ariaLabel: "Learn",
    links: [
      { href: "/blog", label: "Blog", matchPrefix: true },
      { href: "/tips", label: "Tips", matchPrefix: true },
      { href: "/tools", label: "Tools", matchPrefix: true },
      { href: "/gear", label: "Gear", matchPrefix: true },
      { href: "/injuries", label: "Injuries", matchPrefix: true },
      { href: "/instagram", label: "Instagram", matchPrefix: true },
      { href: "/stories", label: "Stories", matchPrefix: true },
    ],
  },
  {
    links: [
      {
        href: "/teams",
        label: "Teams",
        matchPrefix: true,
        comingSoon: !TEAMS_ROLLOUT_ENABLED,
      },
    ],
  },
];

export type FooterLink = {
  href: string;
  label: string;
  comingSoon?: boolean;
};

export const tipsSectionNav = [
  { href: "/tips", label: "All tips" },
  { href: "/tips/bad-weather", label: "Bad weather" },
  { href: "/tips/specific-situations", label: "Specific situations" },
] as const;

export const footerTrainLinks = [
  { href: "/start", label: "Start here" },
  { href: "/plan", label: "Training Plans" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export const footerLearnLinks: FooterLink[] = [
  { href: "/blog", label: "Blog" },
  { href: "/tips", label: "Running Tips" },
  { href: "/tools", label: "Tools" },
  { href: "/gear", label: "Gear Guide" },
  { href: "/injuries", label: "Injury Prevention" },
  { href: "/instagram", label: "Instagram" },
  { href: "/stories", label: "Success Stories" },
  {
    href: "/teams",
    label: "Coach Teams",
    comingSoon: !TEAMS_ROLLOUT_ENABLED,
  },
];

export const footerCompanyLinks = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerTipsLinks = [
  { href: "/tips", label: "All tips" },
  { href: "/tips/bad-weather", label: "Bad weather tips" },
  { href: "/tips/specific-situations", label: "Specific situations" },
] as const;

export function filterNavLinks(
  links: NavLink[],
  options: { isAuthenticated: boolean }
): NavLink[] {
  return links.filter(
    (link) => !link.authRequired || options.isAuthenticated
  );
}

export function flattenNavGroups(
  groups: NavGroup[],
  options: { isAuthenticated: boolean }
): NavLink[] {
  return groups.flatMap((group) => filterNavLinks(group.links, options));
}

export function isNavLinkActive(
  pathname: string,
  href: string,
  matchPrefix = false
): boolean {
  if (href === "/") return pathname === "/";
  if (matchPrefix) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return pathname === href;
}
