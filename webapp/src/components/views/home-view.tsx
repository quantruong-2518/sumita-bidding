"use client";

import Link from "next/link";
import { HOME } from "@/lib/mock";
import { useTx } from "@/lib/i18n/use-tx";
import { useCcns, useMapPins, useServices, useNews } from "@/lib/query/hooks";
import { Section } from "@/components/common/section";
import { PageHero } from "@/components/common/page-hero";
import { StatList, IconFeatureGrid } from "@/components/common/data-blocks";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { MapPlaceholder } from "@/components/common/map-placeholder";
import { LoadingCards, LoadingLines, EmptyState, ErrorState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";
import { Button } from "@/components/ui/button";
import type { Ccn, NewsCategory } from "@/lib/schema";

/* P-01 Trang chủ. Lắp ghép từ các section tái dùng; mọi LocalizedText resolve qua t() trước khi truyền. */

const CCN_STATUS_LABEL: Record<Ccn["status"], string> = {
  "dang-cho-thue": "Đang cho thuê",
  "sap-mo-ban": "Sắp mở bán",
  "da-lap-day": "Đã lấp đầy",
};

const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  "thi-truong": "Thị trường",
  "tin-du-an": "Tin dự án",
  "su-kien": "Sự kiện",
};

function FeaturedCcns() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useCcns();

  if (isLoading) return <LoadingCards columns={3} count={3} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title="Chưa có cụm công nghiệp" />;

  return (
    <CardGrid columns={3}>
      {data.slice(0, 3).map((c) => (
        <EntityCard
          key={c.slug}
          href={`/san-pham/dat-cong-nghiep/${c.slug}`}
          image={c.heroImage}
          badge={CCN_STATUS_LABEL[c.status]}
          title={t(c.name)}
          subtitle={t(c.tagline)}
          meta={[
            { label: "Diện tích", value: `${c.area} ha` },
            { label: "Lấp đầy", value: c.occupancy != null ? `${c.occupancy}%` : "—" },
          ]}
          ctaLabel="Xem chi tiết"
        />
      ))}
    </CardGrid>
  );
}

function SystemMap() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useMapPins();

  if (isLoading) return <LoadingLines lines={4} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title="Chưa có dữ liệu bản đồ" />;

  return (
    <MapPlaceholder
      pins={data.map((p) => ({
        id: p.ccnSlug,
        label: t(p.name),
        x: p.x,
        y: p.y,
        href: `/san-pham/dat-cong-nghiep/${p.ccnSlug}`,
      }))}
    />
  );
}

function InvestmentServices() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useServices();

  if (isLoading) return <LoadingLines lines={6} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title="Chưa có dịch vụ" />;

  return (
    <IconFeatureGrid
      items={data.slice(0, 6).map((s) => ({ icon: s.icon, title: t(s.title), desc: t(s.desc) }))}
    />
  );
}

function LatestNews() {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useNews();

  if (isLoading) return <LoadingCards columns={3} count={3} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title="Chưa có tin tức" />;

  return (
    <CardGrid columns={3}>
      {data.slice(0, 3).map((n) => (
        <EntityCard
          key={n.slug}
          href={`/tin-tuc/${n.slug}`}
          image={n.cover}
          badge={NEWS_CATEGORY_LABEL[n.category]}
          title={t(n.title)}
          subtitle={n.date}
          description={t(n.excerpt)}
          ctaLabel="Đọc tiếp"
        />
      ))}
    </CardGrid>
  );
}

export function HomeView() {
  const t = useTx();

  return (
    <>
      <PageHero
        eyebrow={t(HOME.hero.eyebrow)}
        title={t(HOME.hero.title)}
        tagline={t(HOME.hero.tagline)}
        actions={<ConversionCtas source="home-hero" />}
      />

      <Section>
        <StatList items={HOME.stats.map((s) => ({ label: t(s.label), value: t(s.value) }))} />
      </Section>

      <Section
        title="Cụm công nghiệp nổi bật"
        actions={
          <Button asChild variant="outline">
            <Link href="/san-pham/dat-cong-nghiep">Xem tất cả</Link>
          </Button>
        }
      >
        <FeaturedCcns />
      </Section>

      <Section title="Bản đồ hệ thống">
        <SystemMap />
      </Section>

      <Section title="Dịch vụ & hỗ trợ đầu tư">
        <InvestmentServices />
      </Section>

      <Section title="Tin tức mới">
        <LatestNews />
      </Section>

      <Section bordered contentClassName="flex flex-col items-center gap-5 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Sẵn sàng đầu tư cùng Sumita?</h2>
        <ConversionCtas source="home-bottom" className="justify-center" />
      </Section>
    </>
  );
}
