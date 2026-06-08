"use client";

import { ABOUT } from "@/lib/mock";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { usePartners } from "@/lib/query/hooks";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { RichText, DescriptionList } from "@/components/common/data-blocks";
import { CardGrid } from "@/components/common/entity-card";
import { Media } from "@/components/common/media";
import { LoadingCards, EmptyState, ErrorState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";

/* P-02 Giới thiệu. */

function Partners() {
  const tt = useTt();
  const { data, isLoading, isError, refetch } = usePartners();

  if (isLoading) return <LoadingCards columns={3} count={3} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title={tt("Chưa có đối tác", "No partners yet")} />;

  return (
    <CardGrid columns={3}>
      {data.map((p) => (
        <Media key={p.id} src={p.logo} label={p.name} alt={p.name} ratio={3 / 2} sizes="(max-width: 640px) 50vw, 33vw" />
      ))}
    </CardGrid>
  );
}

export function AboutView() {
  const t = useTx();
  const tt = useTt();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tt("Trang chủ", "Home"), href: "/" }, { label: tt("Giới thiệu", "About") }]}
        title={tt("Giới thiệu", "About")}
        description={t(ABOUT.intro)}
      />

      <Section title={tt("Sứ mệnh & tầm nhìn", "Mission & vision")} contentClassName="space-y-8">
        <RichText content={`${t(ABOUT.mission)}\n${t(ABOUT.vision)}`} />
        {/* Giá trị cốt lõi = tên + mô tả → DescriptionList (xếp dọc, canh trái) thay vì
            DefinitionList justify-between vốn đẩy mô tả sang phải gây gãy dòng. */}
        <DescriptionList
          columns={3}
          items={ABOUT.values.map((v) => ({ label: t(v.label), value: t(v.value) }))}
        />
      </Section>

      <Section title={tt("Khách hàng & đối tác", "Clients & partners")}>
        <Partners />
      </Section>

      <Section bordered>
        <ConversionCtas source="about-bottom" />
      </Section>
    </>
  );
}
