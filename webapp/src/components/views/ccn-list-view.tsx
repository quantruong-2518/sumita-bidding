"use client";

import { useCcns } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { CCN_STATUS_LABEL } from "@/lib/i18n/labels";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { LoadingCards, ErrorState, EmptyState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";

export function CcnListView() {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useCcns();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tt("Trang chủ", "Home"), href: "/" },
          { label: tt("Sản phẩm", "Products") },
          { label: tt("Đất công nghiệp cho thuê", "Industrial land for lease") },
        ]}
        title={tt("Đất công nghiệp cho thuê", "Industrial land for lease")}
        description={tt("Danh sách cụm công nghiệp đang cho thuê.", "List of industrial clusters available for lease.")}
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
            {data.map((c) => (
              <EntityCard
                key={c.slug}
                href={`/products/industrial-land/${c.slug}`}
                image={c.heroImage}
                badge={t(CCN_STATUS_LABEL[c.status])}
                title={t(c.name)}
                subtitle={t(c.tagline)}
                description={t(c.overview)}
                meta={[
                  { label: tt("Diện tích", "Area"), value: `${c.area} ha` },
                  { label: tt("Tỉ lệ lấp đầy", "Occupancy rate"), value: c.occupancy != null ? `${c.occupancy}%` : tt("Đang cập nhật", "Updating") },
                  { label: tt("Giá thuê", "Lease price"), value: c.priceFrom ? t(c.priceFrom) : tt("Liên hệ", "Contact us") },
                ]}
                ctaLabel={tt("Xem chi tiết", "View details")}
              />
            ))}
          </CardGrid>
        )}
      </Section>

      <Section bordered>
        <ConversionCtas source="ccn-list" />
      </Section>
    </>
  );
}
