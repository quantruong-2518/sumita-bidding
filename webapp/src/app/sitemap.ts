import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { getCcnSlugs, getNewsSlugs, getJobSlugs } from "@/lib/api";

/* Sitemap động: gộp các route tĩnh + slug nội dung (CCN / tin tức / tuyển dụng).
   Next tự phục vụ tại /sitemap.xml. Bỏ /search (trang tiện ích, không index). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "/",
    "/about",
    "/products/industrial-land",
    "/products/ready-built-factory",
    "/infrastructure",
    "/investment-services",
    "/news",
    "/careers",
    "/contact",
    "/book-visit",
    "/downloads",
    "/legal/chinh-sach-bao-mat",
    "/legal/dieu-khoan",
  ];

  const dynamicPaths = [
    ...getCcnSlugs().map((s) => `/products/industrial-land/${s}`),
    ...getNewsSlugs().map((s) => `/news/${s}`),
    ...getJobSlugs().map((s) => `/careers/${s}`),
  ];

  const priorityOf = (p: string) =>
    p === "/" ? 1 : p.startsWith("/products") ? 0.9 : p.startsWith("/legal") ? 0.3 : 0.7;

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/news") ? "weekly" : "monthly",
    priority: priorityOf(path),
  }));
}
