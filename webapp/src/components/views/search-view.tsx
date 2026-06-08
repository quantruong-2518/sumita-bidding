"use client";

import Link from "next/link";
import { useSearch } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import type { SearchHit } from "@/lib/api";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";

/* O-04 Kết quả tìm kiếm — nhận q từ server page, tự fetch bằng React Query. */
const TYPE_LABEL: Record<SearchHit["type"], string> = {
  ccn: "Cụm CN",
  factory: "Nhà xưởng",
  news: "Tin tức",
  job: "Tuyển dụng",
};

export function SearchView({ q }: { q: string }) {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useSearch(q);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Kết quả tìm kiếm" }]}
        title="Kết quả tìm kiếm"
        description={q ? `Từ khoá: "${q}"` : "Nhập từ khoá để tìm."}
      />

      <Section>
        {q.length < 2 ? (
          <EmptyState title="Nhập ít nhất 2 ký tự" />
        ) : isLoading ? (
          <LoadingLines lines={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data?.length ? (
          <EmptyState title="Không tìm thấy kết quả" />
        ) : (
          <ul className="divide-y divide-border border border-border">
            {data.map((hit, i) => (
              <li key={i}>
                <Link href={hit.href} className="flex items-center gap-3 p-4 hover:bg-accent">
                  <span className="min-w-0 flex-1 truncate font-medium">{t(hit.title)}</span>
                  <span className="shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
                    {TYPE_LABEL[hit.type]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
