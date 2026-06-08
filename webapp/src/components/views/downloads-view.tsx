"use client";

import { useDocs } from "@/lib/query/hooks";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";
import { DownloadList } from "@/components/lead/download-list";

/* F2/O-02 Tài liệu — danh sách tài liệu có lead-gate trước khi tải. */
export function DownloadsView() {
  const { data: docs, isLoading, isError, refetch } = useDocs();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tài liệu" }]}
        title="Tài liệu"
        description="Tải brochure, quy hoạch, chính sách. Điền thông tin trước khi tải."
      />

      <Section>
        {isLoading ? (
          <LoadingLines lines={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !docs?.length ? (
          <EmptyState title="Chưa có tài liệu" />
        ) : (
          <DownloadList docs={docs ?? []} source="downloads-page" />
        )}
      </Section>
    </>
  );
}
