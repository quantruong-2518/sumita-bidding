import type { Metadata } from "next";
import { DownloadsView } from "@/components/views/downloads-view";

export const metadata: Metadata = {
  title: "Tài liệu",
  description: "Tải brochure, quy hoạch và chính sách của cụm công nghiệp Sumita.",
};

export default function Page() {
  return <DownloadsView />;
}
