export type SiteSearchKind =
  | "page"
  | "blog"
  | "plan"
  | "tip"
  | "guide"
  | "gear"
  | "injury";

export type SiteSearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: SiteSearchKind;
  category?: string;
};
