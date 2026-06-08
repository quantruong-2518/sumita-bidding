import type { Metadata } from "next";

/* Nguồn cấu hình SEO dùng chung. Domain lấy từ env (đổi khi lên domain thật),
   mặc định sumita.vn. metadataBase ở layout dùng giá trị này để sinh canonical/OG tuyệt đối. */
export const SITE = {
  name: "Sumita",
  legalName: "Công ty Cổ phần Đầu tư Hạ tầng Sumita",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sumita.vn",
  locale: "vi_VN",
  titleDefault: "Sumita — Nền tảng xúc tiến đầu tư cụm công nghiệp",
  description:
    "Sumita — nền tảng xúc tiến đầu tư cụm công nghiệp: quỹ đất công nghiệp & nhà xưởng xây sẵn cho thuê. Nhận brochure, đặt lịch khảo sát, tư vấn đầu tư.",
  keywords: [
    "cụm công nghiệp",
    "đất công nghiệp cho thuê",
    "nhà xưởng xây sẵn",
    "khu công nghiệp Hưng Yên",
    "Thái Bình",
    "xúc tiến đầu tư",
    "FDI",
    "industrial park",
    "industrial land for lease",
    "ready-built factory",
    "Vietnam",
  ],
} as const;

type PageMetaInput = {
  title: string;
  description?: string;
  /** Đường dẫn canonical, vd "/about". Dùng path tương đối, metadataBase sẽ ghép domain. */
  path?: string;
  /** OG type — bài viết tin tức dùng "article". */
  type?: "website" | "article";
};

/* Helper sinh Metadata nhất quán cho mỗi màn: title + description + canonical + OpenGraph + Twitter.
   Ảnh OG mặc định lấy theo convention app/opengraph-image.tsx (không cần khai báo images ở đây). */
export function pageMeta({ title, description, path = "/", type = "website" }: PageMetaInput): Metadata {
  const desc = description ?? SITE.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${SITE.name}`,
      description: desc,
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE.name}`,
      description: desc,
    },
  };
}
