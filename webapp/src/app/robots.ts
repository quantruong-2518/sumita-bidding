import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/* robots.txt động (Next phục vụ tại /robots.txt). Cho index toàn site, chặn /search (tiện ích). */
export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/search" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
