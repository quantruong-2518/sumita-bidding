import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob, getJobSlugs } from "@/lib/api";
import { tx } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { JobDetailView } from "@/components/views/job-detail-view";

export function generateStaticParams() {
  return getJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  return job
    ? pageMeta({ title: tx(job.title), description: `${tx(job.department)} · ${tx(job.location)}`, path: `/careers/${slug}` })
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getJob(slug))) notFound();
  return <JobDetailView slug={slug} />;
}
