"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { SiteSearchKind, SiteSearchResult } from "@/lib/search/types";
import { cn } from "@/lib/utils";

const KIND_LABELS: Record<SiteSearchKind, string> = {
  page: "Page",
  blog: "Blog",
  plan: "Plan",
  tip: "Tip",
  guide: "Guide",
  gear: "Gear",
  injury: "Injury",
};

type SiteSearchProps = {
  className?: string;
  inputClassName?: string;
  defaultQuery?: string;
  placeholder?: string;
  onNavigate?: () => void;
};

export function SiteSearch({
  className,
  inputClassName,
  defaultQuery = "",
  placeholder = "Search LetsRunNow",
  onNavigate,
}: SiteSearchProps) {
  const router = useRouter();
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState<SiteSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const fetchResults = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}&limit=8`
      );
      if (!response.ok) throw new Error("Search failed");
      const data = (await response.json()) as { results: SiteSearchResult[] };
      setResults(data.results);
      setActiveIndex(data.results.length > 0 ? 0 : -1);
    } catch {
      setResults([]);
      setActiveIndex(-1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      void fetchResults(query);
    }, 200);

    return () => window.clearTimeout(timer);
  }, [query, open, fetchResults]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target;
      if (
        target instanceof Node &&
        containerRef.current &&
        !containerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function goToSearchPage(value: string) {
    const trimmed = value.trim();
    if (trimmed.length < 2) return;
    setOpen(false);
    onNavigate?.();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function selectResult(result: SiteSearchResult) {
    setOpen(false);
    setQuery("");
    onNavigate?.();
    router.push(result.href);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        selectResult(results[activeIndex]);
      } else {
        goToSearchPage(query);
      }
      return;
    }

    if (!open || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? results.length - 1 : index - 1
      );
    }
  }

  const showDropdown =
    open && (loading || query.trim().length >= 2);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search the site"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? listboxId : undefined}
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          className={cn("h-9 w-full pl-9 pr-9", inputClassName)}
        />
        {loading && (
          <Loader2
            className="absolute top-1/2 right-2.5 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
            aria-hidden
          />
        )}
      </div>

      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute top-full right-0 z-50 mt-2 w-[min(100vw-2rem,24rem)] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg sm:left-0 sm:w-full"
        >
          {loading && results.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              Searching…
            </p>
          ) : results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((result, index) => (
                <li key={result.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={cn(
                      "flex w-full flex-col gap-0.5 px-3 py-2.5 text-left transition-colors",
                      index === activeIndex ? "bg-muted" : "hover:bg-muted/70"
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectResult(result)}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium">
                        {result.title}
                      </span>
                      <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {result.category ?? KIND_LABELS[result.kind]}
                      </span>
                    </span>
                    <span className="line-clamp-2 text-xs text-muted-foreground">
                      {result.description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              No results for &ldquo;{query.trim()}&rdquo;
            </p>
          )}

          {query.trim().length >= 2 && (
            <div className="border-t border-border px-3 py-2">
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
                onClick={() => goToSearchPage(query)}
              >
                View all results for &ldquo;{query.trim()}&rdquo;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type SiteSearchResultLinkProps = {
  result: SiteSearchResult;
};

export function SiteSearchResultLink({ result }: SiteSearchResultLinkProps) {
  return (
    <Link
      href={result.href}
      className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-muted/30"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold group-hover:text-primary">
          {result.title}
        </h2>
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {result.category ?? KIND_LABELS[result.kind]}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {result.description}
      </p>
    </Link>
  );
}
