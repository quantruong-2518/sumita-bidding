"use client";

import { useUtilityGroups } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { IconFeatureGrid } from "@/components/common/data-blocks";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";

/* P-06 Tiện ích & hạ tầng — mỗi nhóm tiện ích là 1 Section + IconFeatureGrid. */
export function UtilitiesView() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useUtilityGroups();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tiện ích & hạ tầng" }]}
        title="Tiện ích & hạ tầng"
      />

      {isLoading ? (
        <Section>
          <LoadingLines lines={6} />
        </Section>
      ) : isError ? (
        <Section>
          <ErrorState onRetry={() => refetch()} />
        </Section>
      ) : !data?.length ? (
        <Section>
          <EmptyState title="Chưa có dữ liệu" />
        </Section>
      ) : (
        data.map((group) => (
          <Section key={group.id} title={t(group.title)} bordered>
            <IconFeatureGrid
              items={group.items.map((i) => ({
                icon: i.icon,
                title: t(i.label),
                desc: i.desc ? t(i.desc) : undefined,
              }))}
            />
          </Section>
        ))
      )}
    </>
  );
}
