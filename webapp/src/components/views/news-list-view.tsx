"use client";

import { useState } from "react";
import { useNews } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { LoadingCards, ErrorState, EmptyState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import type { NewsCategory } from "@/lib/schema";

const CATEGORY_LABEL: Record<NewsCategory, string> = {
  "thi-truong": "Thị trường",
  "tin-du-an": "Tin dự án",
  "su-kien": "Sự kiện",
};

const CATEGORIES: NewsCategory[] = ["thi-truong", "tin-du-an", "su-kien"];

export function NewsListView() {
  const t = useTx();
  const [activeCategory, setActiveCategory] = useState<NewsCategory | undefined>(undefined);
  const { data, isLoading, isError, refetch } = useNews(activeCategory);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức" }]}
        title="Tin tức & truyền thông"
      />

      <Section>
        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          <Button
            variant={activeCategory === undefined ? "default" : "outline"}
            onClick={() => setActiveCategory(undefined)}
          >
            Tất cả
          </Button>
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              variant={activeCategory === c ? "default" : "outline"}
              onClick={() => setActiveCategory(c)}
            >
              {CATEGORY_LABEL[c]}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <LoadingCards columns={3} count={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data?.length ? (
          <EmptyState title="Chưa có dữ liệu" />
        ) : (
          <CardGrid columns={3}>
            {data.map((n) => (
              <EntityCard
                key={n.slug}
                href={`/tin-tuc/${n.slug}`}
                image={n.cover}
                badge={CATEGORY_LABEL[n.category]}
                title={t(n.title)}
                subtitle={n.date}
                description={t(n.excerpt)}
                ctaLabel="Đọc tiếp"
              />
            ))}
          </CardGrid>
        )}
      </Section>
    </>
  );
}
