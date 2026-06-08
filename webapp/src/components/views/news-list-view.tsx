"use client";

import { useState } from "react";
import { useNews } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { NEWS_CATEGORY_LABEL } from "@/lib/i18n/labels";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { LoadingCards, ErrorState, EmptyState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import type { NewsCategory } from "@/lib/schema";

const CATEGORIES: NewsCategory[] = ["thi-truong", "tin-du-an", "su-kien"];

export function NewsListView() {
  const t = useTx();
  const tt = useTt();
  const [activeCategory, setActiveCategory] = useState<NewsCategory | undefined>(undefined);
  const { data, isLoading, isError, refetch } = useNews(activeCategory);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tt("Trang chủ", "Home"), href: "/" }, { label: tt("Tin tức", "News") }]}
        title={tt("Tin tức & truyền thông", "News & media")}
      />

      <Section>
        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          <Button
            variant={activeCategory === undefined ? "default" : "outline"}
            onClick={() => setActiveCategory(undefined)}
          >
            {tt("Tất cả", "All")}
          </Button>
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              variant={activeCategory === c ? "default" : "outline"}
              onClick={() => setActiveCategory(c)}
            >
              {t(NEWS_CATEGORY_LABEL[c])}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <LoadingCards columns={3} count={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data?.length ? (
          <EmptyState title={tt("Chưa có dữ liệu", "No data yet")} />
        ) : (
          <CardGrid columns={3}>
            {data.map((n) => (
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
        )}
      </Section>
    </>
  );
}
