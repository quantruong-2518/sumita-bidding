import { pageMeta } from "@/lib/seo";
import { DownloadsView } from "@/components/views/downloads-view";

export const metadata = pageMeta({
  title: "Tài liệu",
  description: "Tải brochure, quy hoạch và chính sách của cụm công nghiệp Sumita.",
  path: "/downloads",
});

export default function Page() {
  return <DownloadsView />;
}
