import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { LegalView } from "@/components/views/legal-view";

const LEGAL_META: Record<string, { title: string; description: string }> = {
  "chinh-sach-bao-mat": {
    title: "Chính sách bảo mật",
    description: "Cách Sumita thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.",
  },
  "dieu-khoan": {
    title: "Điều khoản sử dụng",
    description: "Điều khoản và điều kiện khi sử dụng website Sumita.",
  },
};

export function generateStaticParams() {
  return [{ slug: "chinh-sach-bao-mat" }, { slug: "dieu-khoan" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = LEGAL_META[slug];
  return meta ? pageMeta({ title: meta.title, description: meta.description, path: `/legal/${slug}` }) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ok = ["chinh-sach-bao-mat", "dieu-khoan"].includes(slug);
  if (!ok) notFound();
  return <LegalView slug={slug} />;
}
