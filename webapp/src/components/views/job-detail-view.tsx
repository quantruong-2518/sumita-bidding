"use client";

import { useJob } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { DefinitionList, RichText } from "@/components/common/data-blocks";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";
import { LeadForm } from "@/components/lead/lead-form";
import type { Job } from "@/lib/schema";

const JOB_TYPE_LABEL: Record<Job["type"], string> = {
  "full-time": "Toàn thời gian",
  "part-time": "Bán thời gian",
  "thoi-vu": "Thời vụ",
};

export function JobDetailView({ slug }: { slug: string }) {
  const t = useTx();
  const { data: job, isLoading, isError, refetch } = useJob(slug);

  if (isLoading) {
    return (
      <Section>
        <LoadingLines lines={6} />
      </Section>
    );
  }
  if (isError) {
    return (
      <Section>
        <ErrorState onRetry={() => refetch()} />
      </Section>
    );
  }
  if (!job) {
    return (
      <Section>
        <EmptyState title="Không tìm thấy tin tuyển dụng" />
      </Section>
    );
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tuyển dụng", href: "/tuyen-dung" },
          { label: t(job.title) },
        ]}
        title={t(job.title)}
        description={`${t(job.department)} · ${t(job.location)}`}
      />

      <Section title="Mô tả công việc">
        <div className="space-y-6">
          <DefinitionList
            items={[
              { label: "Phòng ban", value: t(job.department) },
              { label: "Địa điểm", value: t(job.location) },
              { label: "Hình thức", value: JOB_TYPE_LABEL[job.type] },
              { label: "Mức lương", value: job.salary ? t(job.salary) : "Thoả thuận" },
              { label: "Hạn nộp", value: job.deadline ?? "—" },
            ]}
          />
          <RichText content={t(job.description)} />
          {job.requirements.length ? (
            <ul className="list-disc space-y-1 pl-5">
              {job.requirements.map((r, i) => (
                <li key={i}>{t(r)}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </Section>

      <Section title="Ứng tuyển" bordered>
        <LeadForm variant="ung-tuyen" source={`job:${slug}`} />
      </Section>
    </>
  );
}
