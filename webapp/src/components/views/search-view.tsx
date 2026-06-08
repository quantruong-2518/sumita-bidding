"use client";

import Link from "next/link";
import { useSearch } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { SEARCH_TYPE_LABEL } from "@/lib/i18n/labels";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";

/* O-04 Kết quả tìm kiếm — nhận q từ server page, tự fetch bằng React Query. */

export function SearchView({ q }: { q: string }) {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useSearch(q);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tt("Trang chủ", "Home"), href: "/" }, { label: tt("Kết quả tìm kiếm", "Search results") }]}
        title={tt("Kết quả tìm kiếm", "Search results")}
        description={q ? `${tt("Từ khoá", "Keyword")}: "${q}"` : tt("Nhập từ khoá để tìm.", "Enter a keyword to search.")}
      />

      <Section>
        {q.length < 2 ? (
          <EmptyState title={tt("Nhập ít nhất 2 ký tự", "Enter at least 2 characters")} />
        ) : isLoading ? (
          <LoadingLines lines={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data?.length ? (
          <EmptyState title={tt("Không tìm thấy kết quả", "No results found")} />
        ) : (
          <ul className="divide-y divide-border border border-border">
            {data.map((hit, i) => (
              <li key={i}>
                <Link href={hit.href} className="flex items-start gap-3 p-4 hover:bg-accent">
                  <span className="min-w-0 flex-1 break-words font-medium">{t(hit.title)}</span>
                  <span className="mt-0.5 shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
                    {t(SEARCH_TYPE_LABEL[hit.type])}
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
