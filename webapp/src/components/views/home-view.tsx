"use client";

import Link from "next/link";
import { HOME } from "@/lib/mock";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { CCN_STATUS_LABEL, NEWS_CATEGORY_LABEL } from "@/lib/i18n/labels";
import { useCcns, useMapPins, useServices, useNews } from "@/lib/query/hooks";
import { Section } from "@/components/common/section";
import { PageHero } from "@/components/common/page-hero";
import { StatList, IconFeatureGrid } from "@/components/common/data-blocks";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { MapPlaceholder } from "@/components/common/map-placeholder";
import { LoadingCards, LoadingLines, EmptyState, ErrorState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";
import { Button } from "@/components/ui/button";

/* P-01 Trang chủ. Lắp ghép từ các section tái dùng; mọi LocalizedText resolve qua t() trước khi truyền. */

function FeaturedCcns() {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useCcns();

  if (isLoading) return <LoadingCards columns={3} count={3} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title={tt("Chưa có cụm công nghiệp", "No clusters yet")} />;

  return (
    <CardGrid columns={3}>
      {data.slice(0, 3).map((c) => (
        <EntityCard
          key={c.slug}
          href={`/products/industrial-land/${c.slug}`}
          image={c.heroImage}
          badge={t(CCN_STATUS_LABEL[c.status])}
          title={t(c.name)}
          subtitle={t(c.tagline)}
          meta={[
            { label: tt("Diện tích", "Area"), value: `${c.area} ha` },
            { label: tt("Lấp đầy", "Occupancy"), value: c.occupancy != null ? `${c.occupancy}%` : tt("Đang cập nhật", "Updating") },
          ]}
          ctaLabel={tt("Xem chi tiết", "View details")}
        />
      ))}
    </CardGrid>
  );
}

function SystemMap() {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useMapPins();

  if (isLoading) return <LoadingLines lines={4} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title={tt("Chưa có dữ liệu bản đồ", "No map data yet")} />;

  return (
    <MapPlaceholder
      pins={data.map((p) => ({
        id: p.ccnSlug,
        label: t(p.name),
        x: p.x,
        y: p.y,
        lat: p.lat,
        lng: p.lng,
        href: `/products/industrial-land/${p.ccnSlug}`,
      }))}
    />
  );
}

function InvestmentServices() {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useServices();

  if (isLoading) return <LoadingLines lines={6} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title={tt("Chưa có dịch vụ", "No services yet")} />;

  return (
    <IconFeatureGrid
      items={data.slice(0, 6).map((s) => ({ icon: s.icon, title: t(s.title), desc: t(s.desc) }))}
    />
  );
}

function LatestNews() {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useNews();

  if (isLoading) return <LoadingCards columns={3} count={3} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <EmptyState title={tt("Chưa có tin tức", "No news yet")} />;

  return (
    <CardGrid columns={3}>
      {data.slice(0, 3).map((n) => (
        <EntityCard
          key={n.slug}
          href={`/news/${n.slug}`}
          image={n.cover}
          badge={t(NEWS_CATEGORY_LABEL[n.category])}
          title={t(n.title)}
          subtitle={n.date}
          description={t(n.excerpt)}
          ctaLabel={tt("Đọc tiếp", "Read more")}
        />
      ))}
    </CardGrid>
  );
}

export function HomeView() {
  const t = useTx();
  const tt = useTt();

  return (
    <>
      <PageHero
        eyebrow={t(HOME.hero.eyebrow)}
        title={t(HOME.hero.title)}
        tagline={t(HOME.hero.tagline)}
        imageAlt={tt("Toàn cảnh hạ tầng cụm công nghiệp Sumita", "Aerial view of Sumita industrial cluster infrastructure")}
        actions={<ConversionCtas source="home-hero" />}
      />

      <Section>
        <StatList items={HOME.stats.map((s) => ({ label: t(s.label), value: t(s.value) }))} />
      </Section>

      <Section
        title={tt("Cụm công nghiệp nổi bật", "Featured industrial clusters")}
        actions={
          <Button asChild variant="outline">
            <Link href="/products/industrial-land">{tt("Xem tất cả", "View all")}</Link>
          </Button>
        }
      >
        <FeaturedCcns />
      </Section>

      <Section title={tt("Bản đồ hệ thống", "Network map")}>
        <SystemMap />
      </Section>

      <Section title={tt("Dịch vụ & hỗ trợ đầu tư", "Investment services & support")}>
        <InvestmentServices />
      </Section>

      <Section title={tt("Tin tức mới", "Latest news")}>
        <LatestNews />
      </Section>

      <Section bordered contentClassName="flex flex-col items-center gap-5 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{tt("Sẵn sàng đầu tư cùng Sumita?", "Ready to invest with Sumita?")}</h2>
        <ConversionCtas source="home-bottom" className="justify-center" />
      </Section>
    </>
  );
}
