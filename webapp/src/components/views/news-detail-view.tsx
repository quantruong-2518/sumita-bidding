"use client";

import { useNews, useNewsArticle } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Container, Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { Media } from "@/components/common/media";
import { RichText } from "@/components/common/data-blocks";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";
import type { NewsCategory } from "@/lib/schema";

const CATEGORY_LABEL: Record<NewsCategory, string> = {
  "thi-truong": "Thị trường",
  "tin-du-an": "Tin dự án",
  "su-kien": "Sự kiện",
};

export function NewsDetailView({ slug }: { slug: string }) {
  const t = useTx();
  const { data: article, isLoading, isError, refetch } = useNewsArticle(slug);
  const { data: relatedAll } = useNews(article?.category);

  if (isLoading) {
    return (
      <Section>
        <LoadingLines lines={6} />
      </Section>
    );
  }
  if (isError) {
    return (
      <Section>
        <ErrorState onRetry={() => refetch()} />
      </Section>
    );
  }
  if (!article) {
    return (
      <Section>
        <EmptyState title="Không tìm thấy bài viết" />
      </Section>
    );
  }

  const categoryLabel = CATEGORY_LABEL[article.category];
  const related = (relatedAll ?? []).filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/tin-tuc" },
          { label: t(article.title) },
        ]}
        title={t(article.title)}
        description={`${categoryLabel} · ${article.date}${article.author ? " · " + article.author : ""}`}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <Media src={article.cover} label="Ảnh bài viết" alt={t(article.title)} sizes="(max-width: 768px) 100vw, 768px" priority />
          <RichText content={t(article.body)} />
        </div>
      </Section>

      {related.length ? (
        <Section title="Tin liên quan" bordered>
          <CardGrid columns={3}>
            {related.map((n) => (
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
        </Section>
      ) : null}
    </>
  );
}
