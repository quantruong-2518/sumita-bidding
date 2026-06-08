import { pageMeta } from "@/lib/seo";
import { SearchView } from "@/components/views/search-view";

export const metadata = {
  ...pageMeta({ title: "Tìm kiếm", path: "/search" }),
  robots: { index: false, follow: true },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <SearchView q={q ?? ""} />;
}
