"use client";

import { useDocs } from "@/lib/query/hooks";
import { useTt } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";
import { DownloadList } from "@/components/lead/download-list";

/* F2/O-02 Tài liệu — danh sách tài liệu có lead-gate trước khi tải. */
export function DownloadsView() {
  const tt = useTt();
  const { data: docs, isLoading, isError, refetch } = useDocs();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tt("Trang chủ", "Home"), href: "/" },
          { label: tt("Tài liệu", "Downloads") },
        ]}
        title={tt("Tài liệu", "Downloads")}
        description={tt(
          "Tải brochure, quy hoạch, chính sách. Điền thông tin trước khi tải.",
          "Download brochures, master plans and policies. Fill in your details before downloading.",
        )}
      />

      <Section>
        {isLoading ? (
          <LoadingLines lines={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !docs?.length ? (
          <EmptyState title={tt("Chưa có tài liệu", "No documents yet")} />
        ) : (
          <DownloadList docs={docs ?? []} source="downloads-page" />
        )}
      </Section>
    </>
  );
}
