export type NavLink = {
  href: string;
  label: string;
  /** Highlight when pathname equals href or starts with href/ */
  matchPrefix?: boolean;
  /** Hide unless the user is signed in */
  authRequired?: boolean;
};

export type NavGroup = {
  /** Screen-reader label for grouped links */
  ariaLabel?: string;
  links: NavLink[];
};

/** Primary header navigation — grouped for scanability. */
export const mainNavGroups: NavGroup[] = [
  {
    links: [{ href: "/", label: "Home" }],
  },
  {
    ariaLabel: "Training",
    links: [
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
      { href: "/gear", label: "Gear", matchPrefix: true },
      { href: "/injuries", label: "Injuries", matchPrefix: true },
    ],
  },
  {
    links: [{ href: "/teams", label: "Teams", matchPrefix: true }],
  },
];

export const tipsSectionNav = [
  { href: "/tips", label: "All tips" },
  { href: "/tips/bad-weather", label: "Bad weather" },
  { href: "/tips/specific-situations", label: "Specific situations" },
] as const;

export const footerTrainLinks = [
  { href: "/plan", label: "Training Plans" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export const footerLearnLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/tips", label: "Running Tips" },
  { href: "/gear", label: "Gear Guide" },
  { href: "/injuries", label: "Injury Prevention" },
  { href: "/teams", label: "Coach Teams" },
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
