import type { Metadata } from "next";

/* Domain đang PHỤC VỤ trang — quyết định canonical + URL tuyệt đối của ảnh OG.
   Thứ tự ưu tiên:
     1) NEXT_PUBLIC_SITE_URL          — đặt tay khi domain thật đã trỏ DNS (vd https://sumita.vn)
     2) VERCEL_PROJECT_PRODUCTION_URL — domain production ổn định trên Vercel (vd sumita-bidding.vercel.app)
     3) VERCEL_URL                    — URL của mỗi deploy preview
     4) https://sumita.vn             — fallback cuối (build/dev cục bộ)
   ⚠️ Vì sumita.vn CHƯA live: nếu hard-code domain này, og:image trỏ tới domain chết
      → Facebook/Zalo/LinkedIn/X không tải được thumbnail. Auto-detect khắc phục ngay trên Vercel.
      Khi domain thật lên: chỉ cần đặt NEXT_PUBLIC_SITE_URL=https://sumita.vn trên Vercel. */
function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "https://sumita.vn";
  return raw.replace(/\/+$/, "");
}

/* Nguồn cấu hình SEO dùng chung. metadataBase ở layout dùng SITE.url để sinh canonical/OG tuyệt đối. */
export const SITE = {
  name: "Sumita",
  legalName: "Công ty Cổ phần Đầu tư Hạ tầng Sumita",
  url: resolveSiteUrl(),
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
  /** Ảnh OG riêng cho trang (path gốc "/images/..." hoặc URL). Bỏ trống → dùng ảnh brand mặc định
   *  theo convention app/opengraph-image.tsx. metadataBase tự ghép domain cho path tương đối. */
  image?: string;
};

/* Helper sinh Metadata nhất quán cho mỗi màn: title + description + canonical + OpenGraph + Twitter.
   Có `image` → ảnh thật của bài/CCN làm thumbnail share; không có → rơi về ảnh brand mặc định. */
export function pageMeta({ title, description, path = "/", type = "website", image }: PageMetaInput): Metadata {
  const desc = description ?? SITE.description;
  const ogTitle = `${title} · ${SITE.name}`;
  const images = image ? [{ url: image, alt: title }] : undefined;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: desc,
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      ...(images ? { images } : {}),
    },
  };
}
