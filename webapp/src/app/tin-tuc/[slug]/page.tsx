import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsArticle, getNewsSlugs } from "@/lib/api";
import { tx } from "@/lib/i18n";
import { NewsDetailView } from "@/components/views/news-detail-view";

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  return article ? { title: tx(article.title), description: tx(article.excerpt) } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getNewsArticle(slug))) notFound();
  return <NewsDetailView slug={slug} />;
}
