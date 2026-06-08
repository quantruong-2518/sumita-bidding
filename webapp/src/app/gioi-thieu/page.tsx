import type { Metadata } from "next";
import { AboutView } from "@/components/views/about-view";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Giới thiệu Sumita — đơn vị phát triển và vận hành chuỗi cụm công nghiệp tại khu vực Hưng Yên (Thái Bình cũ), phục vụ nhà đầu tư trong nước và FDI.",
};

export default function Page() {
  return <AboutView />;
}
