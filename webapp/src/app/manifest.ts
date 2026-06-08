import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/* Web App Manifest (Next phục vụ tại /manifest.webmanifest, tự gắn <link rel="manifest">).
   theme_color = navy thương hiệu; icon SVG scalable dùng chung favicon. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.titleDefault,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16223A",
    lang: "vi",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" }],
  };
}
