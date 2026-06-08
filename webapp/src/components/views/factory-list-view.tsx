"use client";

import { useFactories } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { LoadingCards, ErrorState, EmptyState } from "@/components/common/states";
import { ConversionCtas, LeadButton } from "@/components/lead/lead-cta";
import type { Factory } from "@/lib/schema";

const FACTORY_STATUS: Record<Factory["status"], string> = {
  "con-trong": "Còn trống",
  "da-thue": "Đã thuê",
  "sap-ban-giao": "Sắp bàn giao",
};

export function FactoryListView() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useFactories();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm" },
          { label: "Nhà xưởng xây sẵn" },
        ]}
        title="Nhà xưởng xây sẵn cho thuê"
        description="Nhà xưởng tiêu chuẩn, bàn giao nhanh."
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
            {data.map((f) => (
              <EntityCard
                key={f.slug}
                image={f.image}
                badge={FACTORY_STATUS[f.status]}
                title={t(f.name)}
                meta={[
                  { label: "Diện tích", value: `${f.area.toLocaleString("vi-VN")} m²` },
                  { label: "Giá thuê", value: f.priceFrom ? t(f.priceFrom) : "Liên hệ" },
                ]}
                footer={
                  <LeadButton
                    size="sm"
                    variant="outline"
                    lead={{ variant: "tu-van", title: "Tư vấn thuê nhà xưởng", source: "factory-list" }}
                  >
                    Đăng ký thuê
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
