"use client";

import { ABOUT } from "@/lib/mock";
import { useTx } from "@/lib/i18n/use-tx";
import { usePartners } from "@/lib/query/hooks";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { RichText, DefinitionList } from "@/components/common/data-blocks";
import { CardGrid } from "@/components/common/entity-card";
import { Media } from "@/components/common/media";
import { LoadingCards, EmptyState, ErrorState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";

/* P-02 Giới thiệu. */

function Partners() {
  const { data, isLoading, isError, refetch } = usePartners();

  if (isLoading) return <LoadingCards columns={4} count={4} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title="Chưa có đối tác" />;

  return (
    <CardGrid columns={4}>
      {data.map((p) => (
        <Media key={p.id} src={p.logo} label={p.name} alt={p.name} ratio={3 / 2} sizes="(max-width: 640px) 50vw, 25vw" />
      ))}
    </CardGrid>
  );
}

export function AboutView() {
  const t = useTx();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]}
        title="Giới thiệu"
        description={t(ABOUT.intro)}
      />

      <Section title="Sứ mệnh & tầm nhìn" contentClassName="space-y-8">
        <RichText content={`${t(ABOUT.mission)}\n${t(ABOUT.vision)}`} />
        <DefinitionList
          columns={3}
          items={ABOUT.values.map((v) => ({ label: t(v.label), value: t(v.value) }))}
        />
      </Section>

      <Section title="Khách hàng & đối tác">
        <Partners />
      </Section>

      <Section bordered>
        <ConversionCtas source="about-bottom" />
      </Section>
    </>
  );
}
