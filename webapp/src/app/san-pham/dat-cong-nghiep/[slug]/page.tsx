import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCcn, getCcnSlugs } from "@/lib/api";
import { tx } from "@/lib/i18n";
import { CcnDetailView } from "@/components/views/ccn-detail-view";

export function generateStaticParams() {
  return getCcnSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCcn(slug);
  return item ? { title: tx(item.name), description: tx(item.tagline) } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getCcn(slug))) notFound(); // 404 phía server
  return <CcnDetailView slug={slug} />; // view tự fetch lại bằng React Query
}
