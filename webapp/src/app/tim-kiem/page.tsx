import type { Metadata } from "next";
import { SearchView } from "@/components/views/search-view";

export const metadata: Metadata = { title: "Tìm kiếm" };

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <SearchView q={q ?? ""} />;
}
