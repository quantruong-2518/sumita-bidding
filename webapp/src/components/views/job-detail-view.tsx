"use client";

import { useJob } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { JOB_TYPE_LABEL } from "@/lib/i18n/labels";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { DefinitionList, RichText } from "@/components/common/data-blocks";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";
import { LeadForm } from "@/components/lead/lead-form";

export function JobDetailView({ slug }: { slug: string }) {
  const t = useTx();
  const tt = useTt();
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
        <EmptyState title={tt("Không tìm thấy tin tuyển dụng", "Job posting not found")} />
      </Section>
    );
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tt("Trang chủ", "Home"), href: "/" },
          { label: tt("Tuyển dụng", "Careers"), href: "/careers" },
          { label: t(job.title) },
        ]}
        title={t(job.title)}
        description={`${t(job.department)} · ${t(job.location)}`}
      />

      <Section title={tt("Mô tả công việc", "Job description")}>
        <div className="space-y-6">
          {/* Thuộc tính tin tuyển dụng: giá trị có thể dài ("Hưng Yên (Thái Bình cũ)") →
              layout stacked (nhãn trên, giá trị dưới canh trái) thay vì justify-between. */}
          <DefinitionList
            layout="stacked"
            columns={2}
            items={[
              { label: tt("Phòng ban", "Department"), value: t(job.department) },
              { label: tt("Địa điểm", "Location"), value: t(job.location) },
              { label: tt("Hình thức", "Employment type"), value: t(JOB_TYPE_LABEL[job.type]) },
              { label: tt("Mức lương", "Salary"), value: job.salary ? t(job.salary) : tt("Thoả thuận", "Negotiable") },
              { label: tt("Hạn nộp", "Deadline"), value: job.deadline ?? tt("Tuyển liên tục", "Ongoing") },
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

      <Section title={tt("Ứng tuyển", "Apply")} bordered>
        <LeadForm variant="ung-tuyen" source={`job:${slug}`} />
      </Section>
    </>
  );
}
