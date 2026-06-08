import { pageMeta } from "@/lib/seo";
import { CcnListView } from "@/components/views/ccn-list-view";

export const metadata = pageMeta({
  title: "Đất công nghiệp cho thuê",
  description: "Danh sách cụm công nghiệp đang cho thuê.",
  path: "/products/industrial-land",
});

export default function Page() {
  return <CcnListView />;
}
