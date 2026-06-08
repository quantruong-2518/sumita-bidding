import type { Doc, NewsCategory } from "@/lib/schema";

/* Query key factory tập trung — tránh trùng/lệch key giữa các hook. */
export const qk = {
  ccns: ["ccns"] as const,
  ccn: (slug: string) => ["ccn", slug] as const,
  factories: (ccnSlug?: string) => ["factories", ccnSlug ?? "all"] as const,
  news: (category?: NewsCategory) => ["news", category ?? "all"] as const,
  newsArticle: (slug: string) => ["news-article", slug] as const,
  jobs: ["jobs"] as const,
  job: (slug: string) => ["job", slug] as const,
  utilities: ["utilities"] as const,
  services: ["services"] as const,
  partners: ["partners"] as const,
  mapPins: ["map-pins"] as const,
  docs: (opts?: { ccnSlug?: string; category?: Doc["category"] }) =>
    ["docs", opts?.ccnSlug ?? "all", opts?.category ?? "all"] as const,
  search: (q: string) => ["search", q] as const,
};
