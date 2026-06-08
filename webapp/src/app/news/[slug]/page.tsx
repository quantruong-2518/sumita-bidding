import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsArticle, getNewsSlugs } from "@/lib/api";
import { tx } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { resolveImage } from "@/lib/images";
import { NewsDetailView } from "@/components/views/news-detail-view";

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  return article
    ? pageMeta({
        title: tx(article.title),
        description: tx(article.excerpt),
        path: `/news/${slug}`,
        type: "article",
        image: resolveImage(article.cover),
      })
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getNewsArticle(slug))) notFound();
  return <NewsDetailView slug={slug} />;
}
