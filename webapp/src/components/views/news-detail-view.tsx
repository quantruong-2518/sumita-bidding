"use client";

import { useNews, useNewsArticle } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { NEWS_CATEGORY_LABEL } from "@/lib/i18n/labels";
import { PageHeader } from "@/components/common/page-header";
import { Container, Section } from "@/components/common/section";
import { CardGrid, EntityCard } from "@/components/common/entity-card";
import { Media } from "@/components/common/media";
import { RichText } from "@/components/common/data-blocks";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";

export function NewsDetailView({ slug }: { slug: string }) {
  const t = useTx();
  const tt = useTt();
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
        <EmptyState title={tt("Không tìm thấy bài viết", "Article not found")} />
      </Section>
    );
  }

  const categoryLabel = t(NEWS_CATEGORY_LABEL[article.category]);
  const related = (relatedAll ?? []).filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tt("Trang chủ", "Home"), href: "/" },
          { label: tt("Tin tức", "News"), href: "/news" },
          { label: t(article.title) },
        ]}
        title={t(article.title)}
        description={`${categoryLabel} · ${article.date}${article.author ? " · " + article.author : ""}`}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <Media src={article.cover} label={t(article.title)} alt={t(article.title)} sizes="(max-width: 768px) 100vw, 768px" priority />
          <RichText content={t(article.body)} />
        </div>
      </Section>

      {related.length ? (
        <Section title={tt("Tin liên quan", "Related news")} bordered>
          <CardGrid columns={3}>
            {related.map((n) => (
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
        </Section>
      ) : null}
    </>
  );
}
