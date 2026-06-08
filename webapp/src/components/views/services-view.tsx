"use client";

import { useServices } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { IconFeatureGrid } from "@/components/common/data-blocks";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";

/* P-07 Dịch vụ & hỗ trợ đầu tư — danh sách dịch vụ + CTA chuyển đổi cuối trang. */
export function ServicesView() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useServices();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ & hỗ trợ đầu tư" }]}
        title="Dịch vụ & hỗ trợ đầu tư"
        description="Đồng hành cùng nhà đầu tư từ pháp lý, xây dựng tới vận hành."
      />

      <Section>
        {isLoading ? (
          <LoadingLines lines={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data?.length ? (
          <EmptyState title="Chưa có dịch vụ" />
        ) : (
          <IconFeatureGrid
            columns={3}
            items={data.map((s) => ({ icon: s.icon, title: t(s.title), desc: t(s.desc) }))}
          />
        )}
      </Section>

      <Section bordered>
        <ConversionCtas source="services" />
      </Section>
    </>
  );
}
