import { pageMeta } from "@/lib/seo";
import { FactoryListView } from "@/components/views/factory-list-view";

export const metadata = pageMeta({
  title: "Nhà xưởng xây sẵn",
  description: "Nhà xưởng tiêu chuẩn, bàn giao nhanh.",
  path: "/products/ready-built-factory",
});

export default function Page() {
  return <FactoryListView />;
}
