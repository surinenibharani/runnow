import { NextResponse } from "next/server";
import { searchSite } from "@/lib/search/search";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  const limitParam = new URL(request.url).searchParams.get("limit");
  const limit = limitParam ? Math.min(Number(limitParam) || 12, 50) : 12;

  if (query.length < 2) {
    return NextResponse.json({ query, results: [] });
  }

  const results = searchSite(query, limit);

  return NextResponse.json(
    { query, results },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
