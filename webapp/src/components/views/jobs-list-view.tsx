"use client";

import { useJobs } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { LoadingCards, ErrorState, EmptyState } from "@/components/common/states";
import type { Job } from "@/lib/schema";

const JOB_TYPE_LABEL: Record<Job["type"], string> = {
  "full-time": "Toàn thời gian",
  "part-time": "Bán thời gian",
  "thoi-vu": "Thời vụ",
};

export function JobsListView() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useJobs();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tuyển dụng" }]}
        title="Tuyển dụng"
        description="Cơ hội nghề nghiệp tại Sumita."
      />

      <Section>
        {isLoading ? (
          <LoadingCards columns={3} count={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data?.length ? (
          <EmptyState title="Chưa có dữ liệu" />
        ) : (
          <CardGrid columns={3}>
            {data.map((j) => (
              <EntityCard
                key={j.slug}
                href={`/tuyen-dung/${j.slug}`}
                image={t(j.title)}
                title={t(j.title)}
                subtitle={`${t(j.department)} · ${t(j.location)}`}
                meta={[
                  { label: "Hình thức", value: JOB_TYPE_LABEL[j.type] },
                  { label: "Hạn nộp", value: j.deadline ?? "—" },
                ]}
                ctaLabel="Xem & ứng tuyển"
              />
            ))}
          </CardGrid>
        )}
      </Section>
    </>
  );
}
