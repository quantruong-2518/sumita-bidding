"use client";

import { useJobs } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { JOB_TYPE_LABEL } from "@/lib/i18n/labels";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { LoadingCards, ErrorState, EmptyState } from "@/components/common/states";

export function JobsListView() {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useJobs();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tt("Trang chủ", "Home"), href: "/" }, { label: tt("Tuyển dụng", "Careers") }]}
        title={tt("Tuyển dụng", "Careers")}
        description={tt("Cơ hội nghề nghiệp tại Sumita.", "Career opportunities at Sumita.")}
      />

      <Section>
        {isLoading ? (
          <LoadingCards columns={3} count={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data?.length ? (
          <EmptyState title={tt("Chưa có dữ liệu", "No data yet")} />
        ) : (
          <CardGrid columns={3}>
            {data.map((j) => (
              <EntityCard
                key={j.slug}
                href={`/careers/${j.slug}`}
                /* Tuyển dụng không có ảnh bìa → bỏ prop image (thẻ render dạng không ảnh,
                   tránh placeholder lặp lại tiêu đề). */
                badge={t(JOB_TYPE_LABEL[j.type])}
                title={t(j.title)}
                subtitle={`${t(j.department)} · ${t(j.location)}`}
                meta={[{ label: tt("Hạn nộp", "Deadline"), value: j.deadline ?? tt("Tuyển liên tục", "Ongoing") }]}
                ctaLabel={tt("Xem & ứng tuyển", "View & apply")}
              />
            ))}
          </CardGrid>
        )}
      </Section>
    </>
  );
}
