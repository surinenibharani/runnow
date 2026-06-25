export type GearSuggestionPick = {
  name: string;
  note: string;
  weekly?: boolean;
};

export type GearNewsItem = {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  categorySlug: string;
  categoryTitle: string;
};

export type GearUpdates = {
  updatedAt: string;
  sourcesChecked: number;
  feedCount?: number;
  items: GearNewsItem[];
  suggestionsByCategory?: Record<string, GearSuggestionPick[]>;
};
