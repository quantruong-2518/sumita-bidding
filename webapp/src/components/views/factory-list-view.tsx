"use client";

import { useFactories } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { FACTORY_STATUS_LABEL } from "@/lib/i18n/labels";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { LoadingCards, ErrorState, EmptyState } from "@/components/common/states";
import { ConversionCtas, LeadButton } from "@/components/lead/lead-cta";

export function FactoryListView() {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useFactories();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tt("Trang chủ", "Home"), href: "/" },
          { label: tt("Sản phẩm", "Products") },
          { label: tt("Nhà xưởng xây sẵn", "Ready-built factories") },
        ]}
        title={tt("Nhà xưởng xây sẵn cho thuê", "Ready-built factories for lease")}
        description={tt("Nhà xưởng tiêu chuẩn, bàn giao nhanh.", "Standard factories with fast handover.")}
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
            {data.map((f) => (
              <EntityCard
                key={f.slug}
                image={f.image}
                badge={t(FACTORY_STATUS_LABEL[f.status])}
                title={t(f.name)}
                meta={[
                  { label: tt("Diện tích", "Area"), value: `${f.area.toLocaleString("vi-VN")} m²` },
                  { label: tt("Giá thuê", "Lease price"), value: f.priceFrom ? t(f.priceFrom) : tt("Liên hệ", "Contact us") },
                ]}
                footer={
                  <LeadButton
                    size="sm"
                    variant="outline"
                    lead={{ variant: "tu-van", title: tt("Tư vấn thuê nhà xưởng", "Factory leasing consultation"), source: "factory-list" }}
                  >
                    {tt("Đăng ký thuê", "Register to lease")}
                  </LeadButton>
                }
              />
            ))}
          </CardGrid>
        )}
      </Section>

      <Section bordered>
        <ConversionCtas source="factory-list" />
      </Section>
    </>
  );
}
