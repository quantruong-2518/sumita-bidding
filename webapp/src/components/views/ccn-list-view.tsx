"use client";

import { useCcns } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { LoadingCards, ErrorState, EmptyState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";
import type { Ccn } from "@/lib/schema";

const CCN_STATUS: Record<Ccn["status"], string> = {
  "dang-cho-thue": "Đang cho thuê",
  "sap-mo-ban": "Sắp mở bán",
  "da-lap-day": "Đã lấp đầy",
};

export function CcnListView() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useCcns();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm" },
          { label: "Đất công nghiệp cho thuê" },
        ]}
        title="Đất công nghiệp cho thuê"
        description="Danh sách cụm công nghiệp đang cho thuê."
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
            {data.map((c) => (
              <EntityCard
                key={c.slug}
                href={`/san-pham/dat-cong-nghiep/${c.slug}`}
                image={c.heroImage}
                badge={CCN_STATUS[c.status]}
                title={t(c.name)}
                subtitle={t(c.tagline)}
                description={t(c.overview)}
                meta={[
                  { label: "Diện tích", value: `${c.area} ha` },
                  { label: "Tỉ lệ lấp đầy", value: c.occupancy != null ? `${c.occupancy}%` : "—" },
                  { label: "Giá thuê", value: c.priceFrom ? t(c.priceFrom) : "Liên hệ" },
                ]}
                ctaLabel="Xem chi tiết"
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
