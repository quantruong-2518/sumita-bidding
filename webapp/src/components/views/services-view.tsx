"use client";

import { useServices } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { IconFeatureGrid } from "@/components/common/data-blocks";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";

/* P-07 Dịch vụ & hỗ trợ đầu tư — danh sách dịch vụ + CTA chuyển đổi cuối trang. */
export function ServicesView() {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useServices();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tt("Trang chủ", "Home"), href: "/" },
          { label: tt("Dịch vụ & hỗ trợ đầu tư", "Investment services & support") },
        ]}
        title={tt("Dịch vụ & hỗ trợ đầu tư", "Investment services & support")}
        description={tt(
          "Đồng hành cùng nhà đầu tư từ pháp lý, xây dựng tới vận hành.",
          "Supporting investors from legal and construction through to operations.",
        )}
      />

      <Section>
        {isLoading ? (
          <LoadingLines lines={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data?.length ? (
          <EmptyState title={tt("Chưa có dịch vụ", "No services yet")} />
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
